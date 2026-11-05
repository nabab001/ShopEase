/**
 * ShopEase — Order Routes
 * 
 * Server-side order creation with inventory and price validation.
 * Orders are stored in memory for this version.
 * Production should use a database.
 */

const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const products = require("../data/products");

/* ═══════════════════════════════════════════════════════
   IN-MEMORY ORDER STORE
   In production, replace with database persistence.
═══════════════════════════════════════════════════════ */

const orders = [];

/* ═══════════════════════════════════════════════════════
   HELPER: Generate order ID
═══════════════════════════════════════════════════════ */

function generateOrderId() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `SE-${timestamp}-${random}`;
}

/* ═══════════════════════════════════════════════════════
   HELPER: Validate and calculate order
═══════════════════════════════════════════════════════ */

function validateAndCalculateOrder(items, couponCode) {
    const errors = [];
    const validatedItems = [];
    let bagTotal = 0;
    let originalTotal = 0;

    if (!Array.isArray(items) || items.length === 0) {
        return { errors: ["Cart is empty."], validatedItems: [], totals: null };
    }

    if (items.length > 50) {
        return { errors: ["Too many items in cart."], validatedItems: [], totals: null };
    }

    for (const item of items) {
        if (!item.id || !item.quantity) {
            errors.push(`Invalid cart item: missing id or quantity.`);
            continue;
        }

        const product = products.find(p => p.id === item.id);

        if (!product) {
            errors.push(`Product "${item.id}" not found.`);
            continue;
        }

        const quantity = Math.max(1, Math.min(parseInt(item.quantity) || 1, 10));

        if (product.stock < quantity) {
            errors.push(`"${product.name}" has only ${product.stock} units available (requested ${quantity}).`);
            continue;
        }

        // Validate size if product has sizes
        let size = item.size || "";
        if (product.sizes && product.sizes.length > 0 && size) {
            if (!product.sizes.includes(size)) {
                errors.push(`Size "${size}" is not available for "${product.name}".`);
                continue;
            }
        }

        const itemTotal = product.price * quantity;
        const itemOriginalTotal = (product.originalPrice || product.price) * quantity;

        bagTotal += itemTotal;
        originalTotal += itemOriginalTotal;

        validatedItems.push({
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            originalPrice: product.originalPrice || product.price,
            quantity,
            size,
            image: product.image,
            itemTotal
        });
    }

    if (validatedItems.length === 0 && errors.length === 0) {
        errors.push("No valid items in cart.");
    }

    // Calculate fees and discounts
    let couponDiscount = 0;
    let couponApplied = null;

    // Only validate real coupon codes
    if (couponCode && typeof couponCode === "string") {
        const code = couponCode.trim().toUpperCase();
        // SHOP10: 10% off, max ₹500, min order ₹1000
        if (code === "SHOP10" && bagTotal >= 1000) {
            couponDiscount = Math.min(Math.round(bagTotal * 0.10), 500);
            couponApplied = "SHOP10";
        }
    }

    const delivery = bagTotal >= 2500 ? 0 : 79;
    const platformFee = 22;
    const totalPayable = bagTotal - couponDiscount + delivery + platformFee;
    const totalSavings = originalTotal - bagTotal + couponDiscount;

    return {
        errors,
        validatedItems,
        totals: {
            bagTotal,
            originalTotal,
            couponDiscount,
            couponApplied,
            delivery,
            platformFee,
            totalPayable,
            totalSavings
        }
    };
}

/* ═══════════════════════════════════════════════════════
   POST /api/orders — Create a new order
═══════════════════════════════════════════════════════ */

router.post("/", (req, res) => {
    try {
        const {
            items,
            couponCode,
            paymentMethod,
            deliveryAddress
        } = req.body;

        // Validate payment method
        const validPaymentMethods = ["cod", "upi", "card", "netbanking"];
        const method = (paymentMethod || "").toLowerCase();

        if (!validPaymentMethods.includes(method)) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment method."
            });
        }

        // Online payments can proceed via Razorpay order flow or test checkout
        const paymentGatewayRequired = ["upi", "card", "netbanking"].includes(method);
        const hasRazorpayKeys = process.env.RAZORPAY_KEY_ID && !process.env.RAZORPAY_KEY_ID.includes("xxxxxxxx");

        if (paymentGatewayRequired && !hasRazorpayKeys && !req.body.isTestPayment) {
            return res.status(400).json({
                success: false,
                message: "Online payments gateway is in test mode. Please choose Cash on Delivery or use Test Mode.",
                paymentSetupRequired: true
            });
        }

        // Validate delivery address
        if (!deliveryAddress || !deliveryAddress.name || !deliveryAddress.phone || !deliveryAddress.pincode) {
            return res.status(400).json({
                success: false,
                message: "Please provide a complete delivery address."
            });
        }

        // Validate phone
        const phoneClean = String(deliveryAddress.phone).replace(/\D/g, "");
        if (phoneClean.length < 10) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid phone number."
            });
        }

        // Validate pincode
        const pincodeClean = String(deliveryAddress.pincode).replace(/\D/g, "");
        if (pincodeClean.length !== 6) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid 6-digit PIN code."
            });
        }

        // Validate and calculate
        const result = validateAndCalculateOrder(items, couponCode);

        if (result.errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: result.errors[0],
                errors: result.errors
            });
        }

        // Create order
        const orderId = generateOrderId();
        const now = new Date();

        const order = {
            orderId,
            items: result.validatedItems,
            totals: result.totals,
            paymentMethod: method,
            paymentStatus: method === "cod" ? "pending" : "unpaid",
            orderStatus: "confirmed",
            deliveryAddress: {
                name: String(deliveryAddress.name).trim().substring(0, 100),
                phone: phoneClean,
                addressLine: String(deliveryAddress.addressLine || "").trim().substring(0, 200),
                city: String(deliveryAddress.city || "").trim().substring(0, 50),
                state: String(deliveryAddress.state || "").trim().substring(0, 50),
                pincode: pincodeClean
            },
            createdAt: now.toISOString(),
            estimatedDelivery: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString()
        };

        // Reduce stock (in-memory only)
        for (const item of result.validatedItems) {
            const product = products.find(p => p.id === item.id);
            if (product) {
                product.stock = Math.max(0, product.stock - item.quantity);
            }
        }

        // Store order
        orders.push(order);

        // Response
        res.status(201).json({
            success: true,
            message: "Order placed successfully.",
            data: {
                orderId: order.orderId,
                orderStatus: order.orderStatus,
                paymentMethod: order.paymentMethod,
                paymentStatus: order.paymentStatus,
                items: order.items,
                totals: order.totals,
                deliveryAddress: order.deliveryAddress,
                estimatedDelivery: order.estimatedDelivery,
                createdAt: order.createdAt
            }
        });

    } catch (error) {
        console.error("Order creation error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to process your order. Please try again."
        });
    }
});

/* ═══════════════════════════════════════════════════════
   GET /api/orders/:orderId — Retrieve an order
═══════════════════════════════════════════════════════ */

router.get("/:orderId", (req, res) => {
    try {
        const { orderId } = req.params;

        const order = orders.find(
            o => o.orderId === orderId
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found."
            });
        }

        res.json({
            success: true,
            data: order
        });

    } catch (error) {
        console.error("Order retrieval error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to retrieve order details."
        });
    }
});

/* ═══════════════════════════════════════════════════════
   POST /api/orders/validate — Validate cart before checkout
═══════════════════════════════════════════════════════ */

router.post("/validate", (req, res) => {
    try {
        const { items, couponCode } = req.body;

        const result = validateAndCalculateOrder(items, couponCode);

        res.json({
            success: result.errors.length === 0,
            errors: result.errors,
            items: result.validatedItems,
            totals: result.totals
        });

    } catch (error) {
        console.error("Cart validation error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to validate cart."
        });
    }
});

/* ═══════════════════════════════════════════════════════
   POST /api/orders/razorpay/create — Create Razorpay order
═══════════════════════════════════════════════════════ */

router.post("/razorpay/create", async (req, res) => {
    try {
        const { items, couponCode, deliveryAddress } = req.body;

        const result = validateAndCalculateOrder(items, couponCode);

        if (result.errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: result.errors[0],
                errors: result.errors
            });
        }

        const orderId = generateOrderId();
        const amountInPaise = Math.round(result.totals.totalPayable * 100);
        const keyId = process.env.RAZORPAY_KEY_ID;
        const keySecret = process.env.RAZORPAY_KEY_SECRET;
        const hasLiveKeys = keyId && keySecret && !keyId.includes("xxxxxxxx");

        if (hasLiveKeys) {
            try {
                const authHeader = "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64");
                const response = await fetch("https://api.razorpay.com/v1/orders", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": authHeader
                    },
                    body: JSON.stringify({
                        amount: amountInPaise,
                        currency: "INR",
                        receipt: orderId,
                        notes: {
                            orderId,
                            customerName: deliveryAddress?.name || "Customer"
                        }
                    })
                });

                const rzpData = await response.json();

                if (!response.ok) {
                    throw new Error(rzpData.error?.description || "Failed to create Razorpay order");
                }

                return res.json({
                    success: true,
                    razorpayOrderId: rzpData.id,
                    amount: rzpData.amount,
                    currency: rzpData.currency,
                    keyId: keyId,
                    localOrderId: orderId,
                    totals: result.totals,
                    isTestMode: false
                });
            } catch (err) {
                console.warn("Razorpay API request failed, falling back to test simulation:", err.message);
            }
        }

        // Test simulation mode (allows checkout testing without live credentials)
        const mockRzpOrderId = "order_mock_" + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
        res.json({
            success: true,
            razorpayOrderId: mockRzpOrderId,
            amount: amountInPaise,
            currency: "INR",
            keyId: keyId || "rzp_test_simulated",
            localOrderId: orderId,
            totals: result.totals,
            isTestMode: true,
            message: "Simulated test payment mode active."
        });

    } catch (error) {
        console.error("Razorpay order creation error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to initiate payment session."
        });
    }
});

/* ═══════════════════════════════════════════════════════
   POST /api/orders/razorpay/verify — Verify Razorpay payment
═══════════════════════════════════════════════════════ */

router.post("/razorpay/verify", (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            items,
            couponCode,
            paymentMethod,
            deliveryAddress
        } = req.body;

        const keySecret = process.env.RAZORPAY_KEY_SECRET;
        const hasLiveKeys = keySecret && !keySecret.includes("xxxxxxxx");

        // Verify signature if live keys exist
        if (hasLiveKeys) {
            const body = razorpay_order_id + "|" + razorpay_payment_id;
            const expectedSignature = crypto
                .createHmac("sha256", keySecret)
                .update(body.toString())
                .digest("hex");

            if (expectedSignature !== razorpay_signature) {
                return res.status(400).json({
                    success: false,
                    message: "Payment signature verification failed."
                });
            }
        }

        // Validate items and recalculate
        const result = validateAndCalculateOrder(items, couponCode);

        if (result.errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: result.errors[0]
            });
        }

        // Validate address
        const phoneClean = String(deliveryAddress?.phone || "").replace(/\D/g, "");
        const pincodeClean = String(deliveryAddress?.pincode || "").replace(/\D/g, "");

        const orderId = generateOrderId();
        const now = new Date();

        const order = {
            orderId,
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            items: result.validatedItems,
            totals: result.totals,
            paymentMethod: paymentMethod || "online",
            paymentStatus: "paid",
            orderStatus: "confirmed",
            deliveryAddress: {
                name: String(deliveryAddress?.name || "Customer").trim().substring(0, 100),
                phone: phoneClean || "9999999999",
                addressLine: String(deliveryAddress?.addressLine || "").trim().substring(0, 200),
                city: String(deliveryAddress?.city || "").trim().substring(0, 50),
                state: String(deliveryAddress?.state || "").trim().substring(0, 50),
                pincode: pincodeClean || "700001"
            },
            createdAt: now.toISOString(),
            estimatedDelivery: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString()
        };

        // Reduce stock
        for (const item of result.validatedItems) {
            const product = products.find(p => p.id === item.id);
            if (product) {
                product.stock = Math.max(0, product.stock - item.quantity);
            }
        }

        orders.push(order);

        res.status(201).json({
            success: true,
            message: "Payment verified and order confirmed.",
            data: {
                orderId: order.orderId,
                orderStatus: order.orderStatus,
                paymentMethod: order.paymentMethod,
                paymentStatus: order.paymentStatus,
                items: order.items,
                totals: order.totals,
                deliveryAddress: order.deliveryAddress,
                estimatedDelivery: order.estimatedDelivery,
                createdAt: order.createdAt
            }
        });

    } catch (error) {
        console.error("Payment verification error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to verify payment."
        });
    }
});

module.exports = router;
