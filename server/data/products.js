/**
 * ShopEase — Product Catalogue (Sample Data)
 * 
 * These are sample products for development and demonstration.
 * In production, this data should come from a database.
 * All ratings, reviews, and stock values are illustrative.
 */

const products = [

    /* ═══════════════════════════════════════════════
       FASHION — WOMEN
    ═══════════════════════════════════════════════ */
    {
        id: "FAS-W001",
        category: "Fashion",
        gender: "Women",
        subcategory: "Dresses",
        brand: "ShopEase",
        name: "Floral Midi Dress",
        description: "A lightweight floral midi dress with a flattering A-line silhouette. Features a V-neckline, short flutter sleeves, and a self-tie waist. Made from breathable viscose fabric, ideal for warm-weather outings.",
        highlights: ["Viscose fabric", "A-line silhouette", "Flutter sleeves", "Self-tie waist", "Machine washable"],
        price: 1299,
        originalPrice: 1999,
        discount: 35,
        rating: 4.3,
        reviews: 128,
        stock: 25,
        deliveryDays: 3,
        freeDelivery: true,
        sizes: ["XS", "S", "M", "L", "XL"],
        images: [
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: "FAS-W002",
        category: "Fashion",
        gender: "Women",
        subcategory: "Tops",
        brand: "Urban Style",
        name: "Relaxed Fit Cotton Top",
        description: "A comfortable cotton top with a relaxed fit. Round neckline, short sleeves, and a subtle textured weave. Pairs well with jeans or casual trousers.",
        highlights: ["100% cotton", "Relaxed fit", "Textured weave", "Round neck", "Easy care"],
        price: 599,
        originalPrice: 999,
        discount: 40,
        rating: 4.1,
        reviews: 94,
        stock: 40,
        deliveryDays: 4,
        freeDelivery: true,
        sizes: ["XS", "S", "M", "L", "XL"],
        images: [
            "https://images.unsplash.com/photo-1564257577054-3e2c9c4b0f7a?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1564257577054-3e2c9c4b0f7a?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: "FAS-W003",
        category: "Fashion",
        gender: "Women",
        subcategory: "Kurtis",
        brand: "DailyDrape",
        name: "Embroidered Cotton Kurti",
        description: "Straight-cut cotton kurti with delicate thread embroidery at the yoke. Three-quarter sleeves, side slits, and a mandarin collar. Comfortable for daily wear and office settings.",
        highlights: ["Cotton fabric", "Thread embroidery", "Mandarin collar", "Side slits", "Regular fit"],
        price: 799,
        originalPrice: 1299,
        discount: 38,
        rating: 4.4,
        reviews: 203,
        stock: 35,
        deliveryDays: 3,
        freeDelivery: true,
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: [
            "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: "FAS-W004",
        category: "Fashion",
        gender: "Women",
        subcategory: "Jeans",
        brand: "TrendLine",
        name: "High-Rise Slim Jeans",
        description: "Classic high-rise slim-fit jeans in dark indigo. Stretch denim for comfortable movement. Five-pocket styling with a zip fly and button closure.",
        highlights: ["Stretch denim", "High-rise waist", "Slim fit", "Five-pocket styling", "Dark indigo wash"],
        price: 1499,
        originalPrice: 2199,
        discount: 32,
        rating: 4.2,
        reviews: 167,
        stock: 30,
        deliveryDays: 3,
        freeDelivery: true,
        sizes: ["26", "28", "30", "32", "34"],
        images: [
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80"
    },

    /* ═══════════════════════════════════════════════
       FASHION — MEN
    ═══════════════════════════════════════════════ */
    {
        id: "FAS-M001",
        category: "Fashion",
        gender: "Men",
        subcategory: "Shirts",
        brand: "StyleHub",
        name: "Oxford Button-Down Shirt",
        description: "A classic Oxford cotton shirt with a button-down collar. Regular fit with a chest pocket. Versatile enough for office wear or casual weekends.",
        highlights: ["Oxford cotton", "Button-down collar", "Regular fit", "Chest pocket", "Machine washable"],
        price: 999,
        originalPrice: 1599,
        discount: 37,
        rating: 4.4,
        reviews: 156,
        stock: 30,
        deliveryDays: 3,
        freeDelivery: true,
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: [
            "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: "FAS-M002",
        category: "Fashion",
        gender: "Men",
        subcategory: "T-Shirts",
        brand: "VibeWear",
        name: "Crew Neck Essential Tee",
        description: "A wardrobe staple crew neck t-shirt in premium combed cotton. Pre-shrunk fabric with ribbed collar and a slightly tapered fit.",
        highlights: ["Combed cotton", "Pre-shrunk", "Ribbed collar", "Slightly tapered", "Multiple colours available"],
        price: 499,
        originalPrice: 799,
        discount: 37,
        rating: 4.3,
        reviews: 289,
        stock: 60,
        deliveryDays: 3,
        freeDelivery: true,
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: "FAS-M003",
        category: "Fashion",
        gender: "Men",
        subcategory: "Trousers",
        brand: "ModaCraft",
        name: "Slim Fit Chinos",
        description: "Versatile slim-fit chinos in a comfortable cotton-elastane blend. Flat front styling with a zip fly. Suitable for both work and casual occasions.",
        highlights: ["Cotton-elastane blend", "Slim fit", "Flat front", "Belt loops", "Side and back pockets"],
        price: 1199,
        originalPrice: 1799,
        discount: 33,
        rating: 4.2,
        reviews: 134,
        stock: 28,
        deliveryDays: 4,
        freeDelivery: true,
        sizes: ["28", "30", "32", "34", "36"],
        images: [
            "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: "FAS-M004",
        category: "Fashion",
        gender: "Men",
        subcategory: "Jackets",
        brand: "EliteThreads",
        name: "Lightweight Bomber Jacket",
        description: "A lightweight bomber jacket with ribbed collar, cuffs, and hem. Zip-front closure with two side pockets. Water-resistant outer shell with a breathable lining.",
        highlights: ["Water-resistant", "Ribbed detailing", "Zip-front", "Two side pockets", "Lightweight"],
        price: 2499,
        originalPrice: 3999,
        discount: 37,
        rating: 4.5,
        reviews: 98,
        stock: 15,
        deliveryDays: 3,
        freeDelivery: true,
        sizes: ["S", "M", "L", "XL"],
        images: [
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80"
    },

    /* ═══════════════════════════════════════════════
       FASHION — KIDS
    ═══════════════════════════════════════════════ */
    {
        id: "FAS-K001",
        category: "Fashion",
        gender: "Kids",
        subcategory: "T-Shirts",
        brand: "Little Style",
        name: "Graphic Print T-Shirt",
        description: "Fun graphic print t-shirt for kids made from soft cotton jersey. Round neck, short sleeves, and a comfortable relaxed fit. Easy-care fabric suitable for active play.",
        highlights: ["Soft cotton jersey", "Graphic print", "Relaxed fit", "Machine washable", "Colourfast"],
        price: 399,
        originalPrice: 699,
        discount: 43,
        rating: 4.5,
        reviews: 87,
        stock: 45,
        deliveryDays: 4,
        freeDelivery: true,
        sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-12Y"],
        images: [
            "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: "FAS-K002",
        category: "Fashion",
        gender: "Kids",
        subcategory: "Dresses",
        brand: "Little Style",
        name: "Cotton Frock with Bow",
        description: "Charming cotton frock with a bow detail at the waist. A-line cut, puff sleeves, and a back zip closure. Perfect for parties and special occasions.",
        highlights: ["Pure cotton", "Bow detail", "Puff sleeves", "Back zip", "A-line cut"],
        price: 699,
        originalPrice: 1199,
        discount: 42,
        rating: 4.6,
        reviews: 112,
        stock: 20,
        deliveryDays: 4,
        freeDelivery: true,
        sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
        images: [
            "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80"
    },

    /* ═══════════════════════════════════════════════
       ELECTRONICS
    ═══════════════════════════════════════════════ */
    {
        id: "ELE-001",
        category: "Electronics",
        subcategory: "Headphones",
        brand: "SoundMax",
        name: "Wireless Over-Ear Headphones",
        description: "Over-ear wireless headphones with active noise cancellation. 40mm drivers deliver balanced sound with deep bass. Bluetooth 5.3, up to 30 hours battery life, and foldable design for portability.",
        highlights: ["Active noise cancellation", "40mm drivers", "Bluetooth 5.3", "30-hour battery", "Foldable design"],
        price: 2499,
        originalPrice: 3999,
        discount: 37,
        rating: 4.5,
        reviews: 342,
        stock: 50,
        deliveryDays: 2,
        freeDelivery: true,
        sizes: [],
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: "ELE-002",
        category: "Electronics",
        subcategory: "Smart Watches",
        brand: "TechFit",
        name: "Fitness Smart Watch",
        description: "A feature-packed fitness smart watch with heart rate monitoring, SpO2 tracking, sleep analysis, and 100+ workout modes. 1.4-inch AMOLED display with always-on mode. IP68 water resistant.",
        highlights: ["AMOLED display", "Heart rate monitor", "SpO2 sensor", "100+ workout modes", "IP68 water resistant"],
        price: 2999,
        originalPrice: 4999,
        discount: 40,
        rating: 4.4,
        reviews: 217,
        stock: 35,
        deliveryDays: 2,
        freeDelivery: true,
        sizes: [],
        images: [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1546868871-af0de0ae72be?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: "ELE-003",
        category: "Electronics",
        subcategory: "Earbuds",
        brand: "SoundMax",
        name: "True Wireless Earbuds",
        description: "Compact true wireless earbuds with 10mm drivers and hybrid ANC. Touch controls, transparency mode, and IPX5 sweat resistance. Charging case provides a total of 28 hours playback.",
        highlights: ["Hybrid ANC", "10mm drivers", "IPX5 rated", "28-hour total battery", "Touch controls"],
        price: 1799,
        originalPrice: 2999,
        discount: 40,
        rating: 4.3,
        reviews: 445,
        stock: 55,
        deliveryDays: 2,
        freeDelivery: true,
        sizes: [],
        images: [
            "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: "ELE-004",
        category: "Electronics",
        subcategory: "Speakers",
        brand: "SoundMax",
        name: "Portable Bluetooth Speaker",
        description: "Rugged portable Bluetooth speaker with 360-degree sound. IPX7 waterproof rating, 20-hour battery, and built-in microphone for hands-free calls. Pairs with a second speaker for stereo mode.",
        highlights: ["360° sound", "IPX7 waterproof", "20-hour battery", "Built-in mic", "Stereo pairing"],
        price: 1999,
        originalPrice: 3499,
        discount: 43,
        rating: 4.4,
        reviews: 278,
        stock: 30,
        deliveryDays: 2,
        freeDelivery: true,
        sizes: [],
        images: [
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: "ELE-005",
        category: "Electronics",
        subcategory: "Mobile Accessories",
        brand: "TechFit",
        name: "65W GaN Fast Charger",
        description: "Compact 65W GaN (Gallium Nitride) charger with dual USB-C and one USB-A port. Smart power distribution charges laptop, phone, and tablet simultaneously. BIS certified for Indian power standards.",
        highlights: ["65W output", "GaN technology", "3 ports", "BIS certified", "Universal compatibility"],
        price: 1499,
        originalPrice: 2499,
        discount: 40,
        rating: 4.6,
        reviews: 189,
        stock: 42,
        deliveryDays: 2,
        freeDelivery: true,
        sizes: [],
        images: [
            "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: "ELE-006",
        category: "Electronics",
        subcategory: "Laptops",
        brand: "ByteCore",
        name: "14-inch Ultrabook Laptop",
        description: "Thin and light 14-inch laptop with a Full HD IPS display. Powered by a latest-gen processor, 16GB RAM, and 512GB SSD. All-day battery life with USB-C charging. Ideal for work and study.",
        highlights: ["14-inch Full HD IPS", "16GB RAM", "512GB SSD", "All-day battery", "USB-C charging"],
        price: 42999,
        originalPrice: 54999,
        discount: 22,
        rating: 4.3,
        reviews: 134,
        stock: 12,
        deliveryDays: 3,
        freeDelivery: true,
        sizes: [],
        images: [
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: "ELE-007",
        category: "Electronics",
        subcategory: "Cameras",
        brand: "PixelPro",
        name: "Mirrorless Camera Body",
        description: "Compact mirrorless camera with a 24.2MP APS-C sensor. 4K video recording, advanced autofocus with 425 detection points, and 5-axis in-body stabilization. Weather-sealed body.",
        highlights: ["24.2MP APS-C sensor", "4K video", "425-point AF", "5-axis stabilization", "Weather-sealed"],
        price: 54999,
        originalPrice: 69999,
        discount: 21,
        rating: 4.7,
        reviews: 67,
        stock: 8,
        deliveryDays: 3,
        freeDelivery: true,
        sizes: [],
        images: [
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: "ELE-008",
        category: "Electronics",
        subcategory: "Tablets",
        brand: "ByteCore",
        name: "10.4-inch Android Tablet",
        description: "Versatile 10.4-inch tablet with a 2K display. Octa-core processor, 6GB RAM, and 128GB storage. Quad speakers with Dolby Atmos. Supports stylus input and keyboard accessories.",
        highlights: ["10.4-inch 2K display", "6GB RAM", "128GB storage", "Quad speakers", "Stylus support"],
        price: 18999,
        originalPrice: 24999,
        discount: 24,
        rating: 4.2,
        reviews: 156,
        stock: 18,
        deliveryDays: 2,
        freeDelivery: true,
        sizes: [],
        images: [
            "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80"
    },

    /* ═══════════════════════════════════════════════
       SHOES — WOMEN
    ═══════════════════════════════════════════════ */
    {
        id: "SHO-W001",
        category: "Shoes",
        gender: "Women",
        subcategory: "Sneakers",
        brand: "StepUp",
        name: "Classic Canvas Sneakers",
        description: "Timeless canvas sneakers with a vulcanized rubber sole. Lace-up closure, padded collar for comfort, and a reinforced toe cap. Lightweight and suitable for all-day wear.",
        highlights: ["Canvas upper", "Vulcanized sole", "Padded collar", "Reinforced toe", "Lightweight"],
        price: 1299,
        originalPrice: 1999,
        discount: 35,
        rating: 4.3,
        reviews: 187,
        stock: 28,
        deliveryDays: 3,
        freeDelivery: true,
        sizes: ["UK 3", "UK 4", "UK 5", "UK 6", "UK 7", "UK 8"],
        images: [
            "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: "SHO-W002",
        category: "Shoes",
        gender: "Women",
        subcategory: "Heels",
        brand: "StepUp",
        name: "Block Heel Sandals",
        description: "Elegant block heel sandals with an ankle strap buckle closure. Cushioned footbed for comfort, 3-inch block heel for stability. Suitable for formal events and evening outings.",
        highlights: ["Block heel (3 inch)", "Ankle strap", "Cushioned footbed", "Faux leather", "Non-slip sole"],
        price: 1599,
        originalPrice: 2499,
        discount: 36,
        rating: 4.1,
        reviews: 93,
        stock: 22,
        deliveryDays: 4,
        freeDelivery: true,
        sizes: ["UK 3", "UK 4", "UK 5", "UK 6", "UK 7"],
        images: [
            "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80"
    },

    /* ═══════════════════════════════════════════════
       SHOES — MEN
    ═══════════════════════════════════════════════ */
    {
        id: "SHO-M001",
        category: "Shoes",
        gender: "Men",
        subcategory: "Sports Shoes",
        brand: "RunPro",
        name: "Lightweight Running Shoes",
        description: "Engineered mesh upper for breathability with a responsive foam midsole for energy return. Rubber outsole with multi-directional traction pattern. Ideal for road running and gym workouts.",
        highlights: ["Engineered mesh", "Responsive foam", "Multi-directional traction", "Lightweight build", "Reflective accents"],
        price: 2499,
        originalPrice: 3999,
        discount: 37,
        rating: 4.5,
        reviews: 231,
        stock: 32,
        deliveryDays: 3,
        freeDelivery: true,
        sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: "SHO-M002",
        category: "Shoes",
        gender: "Men",
        subcategory: "Casual Shoes",
        brand: "UrbanStep",
        name: "Leather Loafers",
        description: "Classic leather loafers with a clean, minimal design. Cushioned insole and flexible outsole for all-day comfort. Slip-on style suitable for both formal and smart-casual settings.",
        highlights: ["Genuine leather upper", "Cushioned insole", "Flexible outsole", "Slip-on design", "Stitched detailing"],
        price: 2199,
        originalPrice: 3499,
        discount: 37,
        rating: 4.3,
        reviews: 145,
        stock: 24,
        deliveryDays: 3,
        freeDelivery: true,
        sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
        images: [
            "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: "SHO-M003",
        category: "Shoes",
        gender: "Men",
        subcategory: "Sneakers",
        brand: "StreetSole",
        name: "Retro High-Top Sneakers",
        description: "Retro-inspired high-top sneakers with a leather and suede combination upper. Padded ankle collar, flat cotton laces, and a durable rubber cup sole. A statement piece for streetwear looks.",
        highlights: ["Leather & suede", "High-top design", "Padded ankle", "Rubber cup sole", "Retro styling"],
        price: 2799,
        originalPrice: 4499,
        discount: 38,
        rating: 4.4,
        reviews: 76,
        stock: 18,
        deliveryDays: 4,
        freeDelivery: true,
        sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"],
        images: [
            "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=80"
    },

    /* ═══════════════════════════════════════════════
       SHOES — KIDS
    ═══════════════════════════════════════════════ */
    {
        id: "SHO-K001",
        category: "Shoes",
        gender: "Kids",
        subcategory: "Sneakers",
        brand: "KidStep",
        name: "Velcro Strap Sneakers",
        description: "Easy-wear sneakers for kids with a secure velcro strap closure. Lightweight mesh upper for breathability, cushioned insole, and a non-marking outsole safe for indoor play.",
        highlights: ["Velcro closure", "Mesh upper", "Cushioned insole", "Non-marking sole", "Easy on/off"],
        price: 799,
        originalPrice: 1299,
        discount: 38,
        rating: 4.4,
        reviews: 113,
        stock: 36,
        deliveryDays: 4,
        freeDelivery: true,
        sizes: ["UK 8C", "UK 9C", "UK 10C", "UK 11C", "UK 12C", "UK 13C"],
        images: [
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80"
    },

    /* ═══════════════════════════════════════════════
       HOME & KITCHEN
    ═══════════════════════════════════════════════ */
    {
        id: "HOM-001",
        category: "Home & Kitchen",
        subcategory: "Cookware",
        brand: "HomeChef",
        name: "Non-Stick Cookware Set (5 Pcs)",
        description: "Complete 5-piece non-stick cookware set including a frying pan, saucepan, kadhai, tawa, and a glass lid. PFOA-free coating, compatible with gas and induction cooktops. Bakelite handles stay cool during cooking.",
        highlights: ["5-piece set", "PFOA-free coating", "Gas & induction compatible", "Cool-touch handles", "Dishwasher safe"],
        price: 2499,
        originalPrice: 4999,
        discount: 50,
        rating: 4.6,
        reviews: 421,
        stock: 20,
        deliveryDays: 3,
        freeDelivery: true,
        sizes: [],
        images: [
            "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: "HOM-002",
        category: "Home & Kitchen",
        subcategory: "Lighting",
        brand: "HomeGlow",
        name: "Minimalist Desk Lamp",
        description: "A sleek minimalist desk lamp with adjustable arm and 3 colour temperature settings (warm, neutral, cool). Touch-sensitive controls, USB charging port on the base, and a weighted base for stability.",
        highlights: ["3 colour temperatures", "Adjustable arm", "Touch controls", "USB charging port", "Weighted base"],
        price: 1299,
        originalPrice: 1999,
        discount: 35,
        rating: 4.3,
        reviews: 165,
        stock: 27,
        deliveryDays: 4,
        freeDelivery: true,
        sizes: [],
        images: [
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: "HOM-003",
        category: "Home & Kitchen",
        subcategory: "Kitchen Appliances",
        brand: "KitchenPro",
        name: "Mixer Grinder (750W)",
        description: "Powerful 750W mixer grinder with 3 stainless steel jars (liquidizing, dry grinding, chutney). Copper motor winding for durability, overload protection, and multi-speed control with pulse function.",
        highlights: ["750W motor", "3 stainless steel jars", "Copper winding", "Overload protection", "2-year warranty"],
        price: 2999,
        originalPrice: 4499,
        discount: 33,
        rating: 4.4,
        reviews: 312,
        stock: 25,
        deliveryDays: 3,
        freeDelivery: true,
        sizes: [],
        images: [
            "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: "HOM-004",
        category: "Home & Kitchen",
        subcategory: "Home Decor",
        brand: "CasaLiving",
        name: "Woven Cotton Throw Blanket",
        description: "Handwoven cotton throw blanket with tasselled edges. Lightweight and breathable, suitable for all seasons. Adds texture and warmth to sofas, chairs, and beds. 130 x 170 cm.",
        highlights: ["Handwoven cotton", "Tasselled edges", "130 x 170 cm", "All-season", "Machine washable"],
        price: 1499,
        originalPrice: 2299,
        discount: 35,
        rating: 4.5,
        reviews: 89,
        stock: 33,
        deliveryDays: 4,
        freeDelivery: true,
        sizes: [],
        images: [
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: "HOM-005",
        category: "Home & Kitchen",
        subcategory: "Storage",
        brand: "UrbanHome",
        name: "Airtight Container Set (6 Pcs)",
        description: "Set of 6 airtight food storage containers in graduated sizes. BPA-free borosilicate glass with bamboo lids. Stackable design saves space. Suitable for pantry staples, leftovers, and meal prep.",
        highlights: ["Borosilicate glass", "BPA-free", "Bamboo lids", "Stackable", "6 graduated sizes"],
        price: 1799,
        originalPrice: 2999,
        discount: 40,
        rating: 4.4,
        reviews: 198,
        stock: 30,
        deliveryDays: 3,
        freeDelivery: true,
        sizes: [],
        images: [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: "HOM-006",
        category: "Home & Kitchen",
        subcategory: "Bedding",
        brand: "ComfortNest",
        name: "Cotton Bedsheet Set (King)",
        description: "Premium 300 thread count cotton bedsheet set for king-size beds. Includes one flat sheet and two pillow covers. Soft, breathable weave with a subtle satin finish. Colourfast and shrink-resistant.",
        highlights: ["300 TC cotton", "King size", "1 sheet + 2 pillowcovers", "Colourfast", "Shrink-resistant"],
        price: 1999,
        originalPrice: 3499,
        discount: 43,
        rating: 4.5,
        reviews: 267,
        stock: 22,
        deliveryDays: 3,
        freeDelivery: true,
        sizes: [],
        images: [
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: "HOM-007",
        category: "Home & Kitchen",
        subcategory: "Dining",
        brand: "CasaLiving",
        name: "Ceramic Dinner Set (21 Pcs)",
        description: "Elegant 21-piece ceramic dinner set with a matte finish. Includes 6 dinner plates, 6 side plates, 6 bowls, 2 serving bowls, and 1 serving platter. Microwave and dishwasher safe.",
        highlights: ["21 pieces", "Ceramic with matte finish", "Microwave safe", "Dishwasher safe", "Lead-free glaze"],
        price: 3499,
        originalPrice: 5999,
        discount: 42,
        rating: 4.3,
        reviews: 145,
        stock: 14,
        deliveryDays: 4,
        freeDelivery: true,
        sizes: [],
        images: [
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: "HOM-008",
        category: "Home & Kitchen",
        subcategory: "Bath",
        brand: "ComfortNest",
        name: "Luxury Turkish Towel Set",
        description: "Set of 4 premium Turkish cotton towels — 2 bath towels and 2 hand towels. 600 GSM for superior absorbency. Double-stitched hems for durability. Gets softer with every wash.",
        highlights: ["Turkish cotton", "600 GSM", "4-piece set", "Double-stitched hems", "Gets softer over time"],
        price: 1999,
        originalPrice: 2999,
        discount: 33,
        rating: 4.6,
        reviews: 178,
        stock: 28,
        deliveryDays: 3,
        freeDelivery: true,
        sizes: [],
        images: [
            "https://images.unsplash.com/photo-1616627561839-074385245ff6?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1616627561839-074385245ff6?auto=format&fit=crop&w=900&q=80"
    },

    /* ═══════════════════════════════════════════════
       ADDITIONAL FASHION
    ═══════════════════════════════════════════════ */
    {
        id: "FAS-W005",
        category: "Fashion",
        gender: "Women",
        subcategory: "Sarees",
        brand: "DailyDrape",
        name: "Chanderi Silk Saree",
        description: "Lightweight Chanderi silk saree with a subtle gold zari border. Comes with an unstitched blouse piece. Elegant drape suitable for festive occasions, ceremonies, and formal events.",
        highlights: ["Chanderi silk", "Gold zari border", "Includes blouse piece", "Lightweight drape", "Dry clean recommended"],
        price: 2999,
        originalPrice: 4999,
        discount: 40,
        rating: 4.6,
        reviews: 89,
        stock: 12,
        deliveryDays: 4,
        freeDelivery: true,
        sizes: ["Free Size"],
        images: [
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: "FAS-M005",
        category: "Fashion",
        gender: "Men",
        subcategory: "Kurtas",
        brand: "ModaCraft",
        name: "Cotton Kurta Pyjama Set",
        description: "Classic cotton kurta pyjama set in a solid colour. Straight-cut kurta with a mandarin collar and three-quarter placket. Comes with a matching drawstring pyjama. Comfortable for festive and everyday wear.",
        highlights: ["Pure cotton", "Mandarin collar", "Matching pyjama", "Drawstring waist", "Machine washable"],
        price: 1299,
        originalPrice: 2199,
        discount: 41,
        rating: 4.3,
        reviews: 176,
        stock: 24,
        deliveryDays: 3,
        freeDelivery: true,
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: [
            "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80"
    },

    /* ═══════════════════════════════════════════════
       ADDITIONAL ELECTRONICS
    ═══════════════════════════════════════════════ */
    {
        id: "ELE-009",
        category: "Electronics",
        subcategory: "Gaming",
        brand: "NovaTech",
        name: "Wireless Gaming Mouse",
        description: "High-performance wireless gaming mouse with a 25,600 DPI optical sensor. Sub-1ms wireless latency, 70-hour battery life, and programmable buttons. Lightweight ambidextrous design at 63 grams.",
        highlights: ["25,600 DPI sensor", "Sub-1ms latency", "70-hour battery", "Programmable buttons", "63g lightweight"],
        price: 3499,
        originalPrice: 4999,
        discount: 30,
        rating: 4.5,
        reviews: 203,
        stock: 22,
        deliveryDays: 2,
        freeDelivery: true,
        sizes: [],
        images: [
            "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: "ELE-010",
        category: "Electronics",
        subcategory: "Smart Home",
        brand: "SmartSphere",
        name: "Smart LED Bulb (Pack of 2)",
        description: "Wi-Fi enabled smart LED bulbs with 16 million colour options and tuneable white. Voice control compatible with Alexa and Google Assistant. Schedule timers and create lighting scenes via app. 9W, B22 base.",
        highlights: ["16M colours", "Voice control", "App scheduling", "9W B22 base", "No hub required"],
        price: 999,
        originalPrice: 1499,
        discount: 33,
        rating: 4.2,
        reviews: 334,
        stock: 48,
        deliveryDays: 2,
        freeDelivery: true,
        sizes: [],
        images: [
            "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=900&q=80"
    },

    /* ═══════════════════════════════════════════════
       ADDITIONAL HOME
    ═══════════════════════════════════════════════ */
    {
        id: "HOM-009",
        category: "Home & Kitchen",
        subcategory: "Kitchen Tools",
        brand: "KitchenPro",
        name: "Stainless Steel Knife Set (6 Pcs)",
        description: "Professional-grade 6-piece knife set with high-carbon stainless steel blades. Includes chef's knife, bread knife, utility knife, paring knife, scissors, and a wooden block. Ergonomic handles with full tang construction.",
        highlights: ["High-carbon steel", "6 pieces + block", "Full tang", "Ergonomic handles", "Rust-resistant"],
        price: 2499,
        originalPrice: 3999,
        discount: 37,
        rating: 4.4,
        reviews: 156,
        stock: 19,
        deliveryDays: 3,
        freeDelivery: true,
        sizes: [],
        images: [
            "https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: "HOM-010",
        category: "Home & Kitchen",
        subcategory: "Furniture",
        brand: "UrbanHome",
        name: "Compact Study Desk",
        description: "Space-efficient study desk with a clean, modern design. Engineered wood with a matte laminate finish. Built-in cable management, one pull-out drawer, and a side shelf for books. Easy self-assembly.",
        highlights: ["Engineered wood", "Cable management", "1 drawer + shelf", "Matte finish", "Easy assembly"],
        price: 4999,
        originalPrice: 7499,
        discount: 33,
        rating: 4.1,
        reviews: 87,
        stock: 10,
        deliveryDays: 5,
        freeDelivery: true,
        sizes: [],
        images: [
            "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=900&q=80"
    },

    /* ═══════════════════════════════════════════════
       MORE SHOES
    ═══════════════════════════════════════════════ */
    {
        id: "SHO-W003",
        category: "Shoes",
        gender: "Women",
        subcategory: "Flats",
        brand: "SoleCraft",
        name: "Pointed Toe Ballet Flats",
        description: "Chic pointed-toe ballet flats with a soft faux-leather upper. Cushioned memory foam insole and flexible TPR outsole. A polished, minimalist option for work and everyday styling.",
        highlights: ["Faux leather", "Memory foam insole", "Pointed toe", "Flexible TPR sole", "Lightweight"],
        price: 999,
        originalPrice: 1599,
        discount: 37,
        rating: 4.2,
        reviews: 134,
        stock: 30,
        deliveryDays: 3,
        freeDelivery: true,
        sizes: ["UK 3", "UK 4", "UK 5", "UK 6", "UK 7"],
        images: [
            "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: "SHO-M004",
        category: "Shoes",
        gender: "Men",
        subcategory: "Formal Shoes",
        brand: "WalkPro",
        name: "Oxford Formal Shoes",
        description: "Classic lace-up Oxford shoes in polished genuine leather. Blake-stitched construction for a sleek profile. Leather-lined interior and a durable rubber-tipped sole. A wardrobe essential for formal occasions.",
        highlights: ["Genuine leather", "Blake stitched", "Leather lined", "Rubber-tipped sole", "Classic Oxford"],
        price: 3499,
        originalPrice: 5499,
        discount: 36,
        rating: 4.5,
        reviews: 98,
        stock: 16,
        deliveryDays: 4,
        freeDelivery: true,
        sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
        images: [
            "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=80"
        ],
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=80"
    }
];

module.exports = products;