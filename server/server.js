require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

/* ════════════════════════════════════════════════
   MIDDLEWARE
════════════════════════════════════════════════ */

app.use(
    helmet({
        crossOriginResourcePolicy: false,
        contentSecurityPolicy: false
    })
);

// CORS — allow specific origins in production
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",").map(o => o.trim())
    : true; // Allow all in development

app.use(
    cors({
        origin: allowedOrigins,
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"]
    })
);

app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));

// Serve static frontend assets from ShopEase root
app.use(express.static(path.join(__dirname, "..")));

/* ════════════════════════════════════════════════
   SIMPLE RATE LIMITING
════════════════════════════════════════════════ */

const requestCounts = new Map();
const RATE_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT = 100; // requests per window

function rateLimiter(req, res, next) {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();

    if (!requestCounts.has(ip)) {
        requestCounts.set(ip, { count: 1, start: now });
        return next();
    }

    const record = requestCounts.get(ip);

    if (now - record.start > RATE_WINDOW) {
        record.count = 1;
        record.start = now;
        return next();
    }

    record.count++;

    if (record.count > RATE_LIMIT) {
        return res.status(429).json({
            success: false,
            message: "Too many requests. Please try again shortly."
        });
    }

    next();
}

app.use(rateLimiter);

// Clean up old entries every 5 minutes
const cleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of requestCounts) {
        if (now - record.start > RATE_WINDOW * 5) {
            requestCounts.delete(ip);
        }
    }
}, 5 * 60 * 1000);
if (cleanupInterval.unref) cleanupInterval.unref();

/* ════════════════════════════════════════════════
   API ROUTES
════════════════════════════════════════════════ */

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/auth", authRoutes);

/* ════════════════════════════════════════════════
   BASIC ROUTES
════════════════════════════════════════════════ */

app.get("/api", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to ShopEase API",
        version: "2.0.0"
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        status: "OK",
        message: "ShopEase backend is running",
        timestamp: new Date().toISOString()
    });
});

/* ════════════════════════════════════════════════
   404 HANDLER
════════════════════════════════════════════════ */

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found."
    });
});

/* ════════════════════════════════════════════════
   ERROR HANDLER
════════════════════════════════════════════════ */

app.use((err, req, res, next) => {
    console.error("Server error:", err);
    res.status(500).json({
        success: false,
        message: "An internal server error occurred."
    });
});

/* ════════════════════════════════════════════════
   START SERVER & EXPORT
════════════════════════════════════════════════ */

if (require.main === module) {
    app.listen(PORT, "0.0.0.0", () => {
        console.log("");
        console.log("════════════════════════════════════════");
        console.log("        SHOPEASE API v2.0");
        console.log("════════════════════════════════════════");
        console.log(`  Server:   http://localhost:${PORT}`);
        console.log(`  Health:   http://localhost:${PORT}/api/health`);
        console.log(`  Products: http://localhost:${PORT}/api/products`);
        console.log("════════════════════════════════════════");
        console.log("");
    });
}

module.exports = app;