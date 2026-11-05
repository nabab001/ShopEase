/**
 * ShopEase — Newsletter Routes
 */

const express = require("express");
const router = express.Router();

// In-memory store (replace with database/email provider in production)
const subscribers = [];

/* ═══════════════════════════════════════════════════════
   POST /api/newsletter — Subscribe to newsletter
═══════════════════════════════════════════════════════ */

router.post("/", (req, res) => {
    try {
        const { email } = req.body;

        if (!email || typeof email !== "string") {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address."
            });
        }

        const cleanEmail = email.trim().toLowerCase();

        // Basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(cleanEmail)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address."
            });
        }

        // Check duplicate
        if (subscribers.includes(cleanEmail)) {
            return res.json({
                success: true,
                message: "You're already subscribed. Thank you!"
            });
        }

        subscribers.push(cleanEmail);

        console.log(`Newsletter subscription: ${cleanEmail}`);

        res.status(201).json({
            success: true,
            message: "Thank you for subscribing! You'll receive our latest updates."
        });

    } catch (error) {
        console.error("Newsletter error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to process subscription. Please try again."
        });
    }
});

module.exports = router;
