/**
 * ShopEase — Vercel Serverless Function Entry Point
 * 
 * Bridges all incoming requests under /api/* to the Express application.
 */

const app = require("../server/server");

module.exports = app;

