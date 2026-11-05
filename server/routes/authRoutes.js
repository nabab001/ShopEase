/**
 * ShopEase — Authentication Routes
 * 
 * Provides Sign Up, Sign In, Profile Retrieval, and Logout APIs
 * with secure password hashing and session tokens.
 */

const express = require("express");
const router = express.Router();
const crypto = require("crypto");

/* ═══════════════════════════════════════════════════════
   IN-MEMORY USER STORE (With Pre-seeded Demo User)
═══════════════════════════════════════════════════════ */

function hashPassword(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
}

function generateToken() {
    return "se_tok_" + crypto.randomBytes(24).toString("hex");
}

const initialSalt = crypto.randomBytes(16).toString("hex");
const users = [
    {
        id: "usr_demo",
        name: "Rahul Sharma",
        email: "demo@shopease.in",
        phone: "9876543210",
        salt: initialSalt,
        passwordHash: hashPassword("demo123", initialSalt),
        superCash: 500,
        tier: "VIP Gold",
        createdAt: new Date().toISOString()
    }
];

const sessions = new Map(); // token -> userId

/* ═══════════════════════════════════════════════════════
   POST /api/auth/register (or /signup)
═══════════════════════════════════════════════════════ */

function handleRegister(req, res) {
    try {
        const { name, email, password, phone } = req.body;

        if (!name || typeof name !== "string" || name.trim().length < 2) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid full name (minimum 2 characters)."
            });
        }

        if (!email || typeof email !== "string") {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address."
            });
        }

        const cleanEmail = email.trim().toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(cleanEmail)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address."
            });
        }

        if (!password || typeof password !== "string" || password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long."
            });
        }

        const existingUser = users.find(u => u.email === cleanEmail);
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "An account with this email address already exists. Please Sign In."
            });
        }

        const cleanPhone = phone ? String(phone).replace(/\D/g, "") : "";
        const salt = crypto.randomBytes(16).toString("hex");
        const passwordHash = hashPassword(password, salt);

        const newUser = {
            id: "usr_" + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
            name: name.trim(),
            email: cleanEmail,
            phone: cleanPhone || "9876543210",
            salt,
            passwordHash,
            superCash: 500,
            tier: "VIP Silver",
            createdAt: new Date().toISOString()
        };

        users.push(newUser);

        const token = generateToken();
        sessions.set(token, newUser.id);

        console.log(`New user registered: ${newUser.email} (${newUser.name})`);

        res.status(201).json({
            success: true,
            message: "Account created successfully! ₹500 Welcome SuperCash credited.",
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                superCash: newUser.superCash,
                tier: newUser.tier
            }
        });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to complete registration. Please try again."
        });
    }
}

router.post("/register", handleRegister);
router.post("/signup", handleRegister);

/* ═══════════════════════════════════════════════════════
   POST /api/auth/login (or /signin)
═══════════════════════════════════════════════════════ */

function handleLogin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide both email and password."
            });
        }

        const cleanEmail = email.trim().toLowerCase();
        const user = users.find(u => u.email === cleanEmail);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        const calculatedHash = hashPassword(password, user.salt);
        if (calculatedHash !== user.passwordHash) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        const token = generateToken();
        sessions.set(token, user.id);

        console.log(`User logged in: ${user.email}`);

        res.json({
            success: true,
            message: `Welcome back, ${user.name}!`,
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                superCash: user.superCash,
                tier: user.tier
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to sign in. Please try again."
        });
    }
}

router.post("/login", handleLogin);
router.post("/signin", handleLogin);

/* ═══════════════════════════════════════════════════════
   GET /api/auth/me — Retrieve Current Session User
═══════════════════════════════════════════════════════ */

router.get("/me", (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.startsWith("Bearer ")
            ? authHeader.slice(7)
            : req.query.token;

        if (!token || !sessions.has(token)) {
            return res.status(401).json({
                success: false,
                message: "Not authenticated."
            });
        }

        const userId = sessions.get(token);
        const user = users.find(u => u.id === userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        res.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                superCash: user.superCash,
                tier: user.tier
            }
        });

    } catch (error) {
        console.error("Auth me error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to verify session."
        });
    }
});

/* ═══════════════════════════════════════════════════════
   POST /api/auth/logout — Invalidate Current Session
═══════════════════════════════════════════════════════ */

router.post("/logout", (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : req.body.token;

    if (token) {
        sessions.delete(token);
    }

    res.json({
        success: true,
        message: "Logged out successfully."
    });
});

module.exports = router;

