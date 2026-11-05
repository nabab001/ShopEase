# ShopEase — Production E-Commerce Platform

ShopEase is a modern, responsive, high-performance e-commerce marketplace featuring curated fashion, electronics, footwear, and home essentials.

---

## 🚀 Features

- **Curated Multi-Category Marketplace**: Fashion (Women & Men), Footwear, Electronics, and Home & Kitchen.
- **Single-Page Application Architecture**: Instant hash-based URL routing (`#product/:id`, `#category/:name`, `#orders`, `#cart`).
- **Interactive Product Details**: Multi-angle image galleries, size selectors, real inventory counter, and dynamic Schema.org JSON-LD structured data for SEO.
- **Cart & Wishlist**: Client-side storage synchronized with server validation.
- **Server-Side Order Processing**:
  - Full server price recalculation and inventory deduction.
  - Delivery address validation (10-digit mobile, 6-digit PIN code).
  - Multi-method checkout: Cash on Delivery (COD), UPI, Cards, and Net Banking.
  - Razorpay payment gateway integration (Test mode simulation & Live key ready).
- **Persistent Order Tracking**: Track verified orders with real-time status badges, item summaries, and delivery estimates.
- **Newsletter Subscription**: Server-validated endpoint with email deduplication.
- **Modern Design System**: Inter typography, elevation tokens, responsive navigation (mobile hamburger drawer), animated skeleton loaders, and zero external icon font dependencies (crisp inline SVGs).

---

## 📁 Project Structure

```
ShopEase/
├── index.html              # Main single-page storefront
├── css/
│   └── style.css           # Design tokens, responsive grid & animations
├── js/
│   └── script.js           # Client business logic, cart, hash router & API client
├── server/
│   ├── server.js           # Express v2.0 API gateway with rate-limiting & CORS
│   ├── package.json        # Server dependencies
│   ├── .env.example        # Environment variable configuration template
│   ├── data/
│   │   └── products.js     # Curated catalog dataset with galleries & specs
│   └── routes/
│       ├── productRoutes.js    # Product search, filter, pagination & detail APIs
│       ├── orderRoutes.js      # Order creation, validation & Razorpay endpoints
│       └── newsletterRoutes.js # Newsletter subscription & deduplication
├── robots.txt              # Search engine crawler instructions
├── sitemap.xml             # XML sitemap for SEO discovery
└── README.md               # Documentation
```

---

## 🛠️ Quick Start & Local Setup

### 1. Prerequisites
- **Node.js** v18+ or v20+

### 2. Start the Backend API
```bash
cd ShopEase/server
npm install
node server.js
```
The server will boot on port `5000`:
- **API Health**: `http://localhost:5000/api/health`
- **Product Catalog**: `http://localhost:5000/api/products`

### 3. Open the Frontend
Simply open `ShopEase/index.html` in any browser, or serve it via a local dev server:
```bash
# Using Python
py -m http.server 3000

# Or using npx serve
npx serve ShopEase
```

---

## 💳 Payment Gateway Configuration

ShopEase supports **Cash on Delivery (COD)** out-of-the-box with 0 configuration.

To enable live **Razorpay** payments:
1. Obtain your API keys from [Razorpay Dashboard](https://dashboard.razorpay.com/app/keys).
2. Create `ShopEase/server/.env` based on `.env.example`:
   ```env
   PORT=5000
   RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
   ```
3. Restart the server. Without live keys, ShopEase automatically runs in **Test Payment Mode**, allowing simulated checkout verification.

---

## 📡 API Reference

| Endpoint | Method | Description |
|---|---|---|
| `/api/products` | `GET` | Retrieve paginated products with category, price, and search filters |
| `/api/products/:id` | `GET` | Retrieve single product details |
| `/api/orders` | `POST` | Create a validated order (inventory validated & stock reduced) |
| `/api/orders/validate` | `POST` | Pre-validate cart items, stock, and calculate fees/discounts |
| `/api/orders/razorpay/create` | `POST` | Initiate Razorpay order session |
| `/api/orders/razorpay/verify` | `POST` | Verify Razorpay payment signature & confirm order |
| `/api/orders/:orderId` | `GET` | Retrieve order status and tracking details |
| `/api/newsletter` | `POST` | Subscribe email address to newsletters |
| `/api/health` | `GET` | Health check probe |

---

## 📄 License
ISC © ShopEase Retail

