/* =========================================================
   SHOP EASE BACKEND API CONFIGURATION
   ========================================================= */

const LOCAL_API_URL = "http://localhost:5000/api";

const API_BASE_URL = (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.protocol === "file:"
) ? LOCAL_API_URL : (
    window.location.origin + "/api"
);

let backendProducts = [];
let backendConnected = false;
let isInitialLoading = true;

/* =========================================================
   BACKEND PAGINATION STATE
   ========================================================= */

let backendCurrentPage = 1;
let backendTotalPages = 1;
let backendTotalProducts = 0;

const BACKEND_PRODUCTS_PER_PAGE = 24;

/* =========================================================
   LOAD PRODUCTS FROM BACKEND
   ========================================================= */

async function loadProductsFromBackend() {
    isInitialLoading = true;
    renderSkeletons();

    try {
        console.log(`Connecting to ShopEase backend at: ${API_BASE_URL}...`);

        let response = null;
        try {
            response = await fetch(`${API_BASE_URL}/products?limit=100`, { cache: "no-cache" });
        } catch (fetchErr) {
            // If primary failed and we're local, try fallback once
            if (API_BASE_URL === LOCAL_API_URL) {
                console.warn("Local API connection failed, checking remote backup...");
                response = await fetch(`${PROD_API_URL}/products?limit=100`, { cache: "no-cache" });
            } else {
                throw fetchErr;
            }
        }

        if (!response || !response.ok) {
            throw new Error(`Backend returned status ${response ? response.status : "offline"}`);
        }

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || "Unable to load products");
        }

        backendProducts = result.data || [];
        backendConnected = true;
        isInitialLoading = false;

        console.log(`ShopEase backend connected: ${backendProducts.length} verified products loaded.`);
        return backendProducts;

    } catch (error) {
        backendConnected = false;
        isInitialLoading = false;
        console.error("ShopEase backend connection failed:", error);
        return [];
    }
}

async function retryLoadProducts() {
    showToast("Reconnecting to ShopEase server...");
    const apiProducts = await loadProductsFromBackend();
    if (apiProducts.length > 0) {
        products = apiProducts;
        filteredProducts = [...products];
        showToast(`Connected! Loaded ${products.length} products.`);
    } else {
        products = [];
        filteredProducts = [];
        showToast("Still unable to reach server. Please start the backend.");
    }
    renderDeals();
    renderProducts();
}
/* =========================================================
   SHOEASE - COMPLETE JAVASCRIPT
   STEP 1 → STEP 4
========================================================= */


/* =========================================================
   SETTINGS
========================================================= */

const PRODUCTS_PER_PAGE = 24;


/* =========================================================
   CATEGORY DATA
========================================================= */

const categoryData = {

    Fashion: {

        Women: [
            "Dresses",
            "Tops",
            "T-Shirts",
            "Jeans",
            "Trousers",
            "Kurtis",
            "Sarees",
            "Lehengas",
            "Skirts",
            "Jumpsuits"
        ],

        Men: [
            "T-Shirts",
            "Shirts",
            "Jeans",
            "Trousers",
            "Chinos",
            "Kurtas",
            "Blazers",
            "Jackets",
            "Shorts",
            "Sweatshirts"
        ],

        Kids: [
            "Dresses",
            "Frocks",
            "T-Shirts",
            "Shirts",
            "Jeans",
            "Shorts",
            "Kurtas",
            "Lehengas",
            "Joggers",
            "Sweatshirts"
        ]

    },


    Shoes: {

        Women: [
            "Heels",
            "Flats",
            "Sneakers",
            "Sandals",
            "Boots",
            "Loafers",
            "Slides"
        ],

        Men: [
            "Sneakers",
            "Formal Shoes",
            "Casual Shoes",
            "Loafers",
            "Boots",
            "Sports Shoes",
            "Sandals"
        ],

        Kids: [
            "School Shoes",
            "Sneakers",
            "Sports Shoes",
            "Running Shoes",
            "Sandals",
            "Casual Shoes"
        ]

    },


    Electronics: [
        "Mobiles",
        "Tablets",
        "Laptops",
        "Monitors",
        "Headphones",
        "Earbuds",
        "Speakers",
        "Cameras",
        "Gaming",
        "Smart Watches",
        "Mobile Accessories",
        "Computer Accessories",
        "Storage",
        "Chargers",
        "Networking",
        "Smart Home"
    ],


    "Home & Kitchen": [
        "Cookware",
        "Kitchen Appliances",
        "Dining",
        "Storage",
        "Home Decor",
        "Lighting",
        "Furniture",
        "Bedding",
        "Bath",
        "Cleaning",
        "Organization",
        "Bakeware",
        "Kitchen Tools"
    ]

};


/* =========================================================
   BRANDS
========================================================= */

const brands = {

    Fashion: [
        "StyleNest",
        "UrbanAura",
        "TrendLine",
        "ModaCraft",
        "VibeWear",
        "Urban Vogue",
        "EliteThreads",
        "DailyDrape"
    ],

    Shoes: [
        "StepStyle",
        "WalkPro",
        "UrbanStep",
        "SoleCraft",
        "FootFlex",
        "StreetSole",
        "MoveMax"
    ],

    Electronics: [
        "TechNova",
        "ElectroMax",
        "ByteCore",
        "NovaTech",
        "PixelPro",
        "VoltEdge",
        "SmartSphere"
    ],

    "Home & Kitchen": [
        "HomeCraft",
        "CasaLiving",
        "KitchenPro",
        "UrbanHome",
        "ComfortNest",
        "DailyHome",
        "PureLiving"
    ]

};


/* =========================================================
   IMAGE POOLS
========================================================= */

const imagePools = {

    Fashion: [

        "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80",

        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80",

        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",

        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",

        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80"

    ],


    Electronics: [

        "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=900&q=80",

        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",

        "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?auto=format&fit=crop&w=900&q=80",

        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=900&q=80",

        "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=900&q=80"

    ],


    Shoes: [

        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",

        "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",

        "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=80",

        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=900&q=80",

        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80"

    ],


    "Home & Kitchen": [

        "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80",

        "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80",

        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80",

        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80",

        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80"

    ]

};


/* =========================================================
   WORDS
========================================================= */

const words = {

    Fashion: [
        "Classic",
        "Premium",
        "Elegant",
        "Modern",
        "Everyday",
        "Comfort",
        "Signature",
        "Essential"
    ],

    Shoes: [
        "Classic",
        "Comfort",
        "Street",
        "Urban",
        "Premium",
        "Active",
        "Sport",
        "Essential"
    ],

    Electronics: [
        "Smart",
        "Pro",
        "Ultra",
        "Max",
        "Plus",
        "Prime",
        "Advanced",
        "Power"
    ],

    "Home & Kitchen": [
        "Premium",
        "Classic",
        "Essential",
        "Modern",
        "Smart",
        "Elegant",
        "Comfort",
        "Daily"
    ]

};


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let products = [];

let filteredProducts = [];

let currentPage = 1;

let currentCategory = "All";

let currentAudience = "All";

let currentSearch = "";

let selectedRating = 0;

let selectedPrice = 0;

let detailProduct = null;

let detailQuantity = 1;

let detailSelectedSize = "";


/* =========================================================
   START
========================================================= */

/* =========================================================
   SKELETON LOADERS
========================================================= */

function renderSkeletons() {
    const grid = document.getElementById("productGrid");
    if (!grid) return;
    grid.innerHTML = Array.from({ length: 8 }).map(() => `
        <div class="product-skeleton-card">
            <div class="skeleton-image skeleton-shimmer"></div>
            <div class="skeleton-line skeleton-title skeleton-shimmer"></div>
            <div class="skeleton-line skeleton-subtitle skeleton-shimmer"></div>
            <div class="skeleton-line skeleton-price skeleton-shimmer"></div>
        </div>
    `).join("");
}

/* =========================================================
   DELIVERY LOCATION HELPER
========================================================= */

function initDeliveryLocation() {
    const savedPincode = localStorage.getItem("shopease_delivery_pincode") || "700001";
    const savedCity = localStorage.getItem("shopease_delivery_city") || "";
    const headerPin = document.getElementById("headerDeliveryPincode");
    if (headerPin) {
        headerPin.textContent = savedCity ? `${savedCity} ${savedPincode}` : `PIN ${savedPincode}`;
    }
}

function promptDeliveryLocation() {
    const modal = document.getElementById("locationModal");
    if (modal) {
        modal.classList.add("open");
        const input = document.getElementById("customPincodeInput");
        if (input) {
            const current = localStorage.getItem("shopease_delivery_pincode") || "700001";
            input.value = current;
            setTimeout(() => input.focus(), 120);
        }
    }
}

function selectCityPincode(pincode, cityName) {
    if (!pincode) return;
    localStorage.setItem("shopease_delivery_pincode", pincode);
    localStorage.setItem("shopease_delivery_city", cityName || "");
    initDeliveryLocation();
    closeModal("locationModal");
    showToast(`Delivery location set to ${cityName ? cityName + " · " : ""}PIN ${pincode}`);
}

function applyCustomPincode() {
    const input = document.getElementById("customPincodeInput");
    if (!input) return;
    const clean = input.value.replace(/\D/g, "");
    if (clean.length === 6) {
        localStorage.setItem("shopease_delivery_pincode", clean);
        localStorage.removeItem("shopease_delivery_city");
        initDeliveryLocation();
        closeModal("locationModal");
        showToast(`Delivery location set to PIN ${clean}`);
    } else {
        showToast("Please enter a valid 6-digit PIN code.");
    }
}

/* =========================================================
   USER AUTHENTICATION CONTROLLER (SIGN IN / SIGN UP)
========================================================= */

function getCurrentUser() {
    try {
        const raw = localStorage.getItem("shopease_user");
        return raw ? JSON.parse(raw) : null;
    } catch (e) {
        return null;
    }
}

function setCurrentUser(user, token) {
    if (user) {
        localStorage.setItem("shopease_user", JSON.stringify(user));
        if (token) {
            localStorage.setItem("shopease_auth_token", token);
        }
    } else {
        localStorage.removeItem("shopease_user");
        localStorage.removeItem("shopease_auth_token");
    }
    initAuthState();
}

function initAuthState() {
    const user = getCurrentUser();
    const greetingEl = document.getElementById("headerAuthGreeting");
    const nameEl = document.getElementById("headerAuthText");
    const navAuthBtn = document.getElementById("navAuthBtn");

    if (user && user.name) {
        const firstName = user.name.split(" ")[0];
        if (greetingEl) greetingEl.textContent = `Hello, ${firstName}`;
        if (nameEl) nameEl.textContent = "My Account";
        if (navAuthBtn) {
            navAuthBtn.textContent = `★ ${firstName}`;
            navAuthBtn.onclick = function () { showInfo("account"); return false; };
        }
    } else {
        if (greetingEl) greetingEl.textContent = "Welcome";
        if (nameEl) nameEl.textContent = "Sign In";
        if (navAuthBtn) {
            navAuthBtn.textContent = "Sign In / Join";
            navAuthBtn.onclick = function () { showAuthPage("signin"); return false; };
        }
    }
}

function handleAccountClick() {
    const user = getCurrentUser();
    if (user) {
        showInfo("account");
    } else {
        showAuthPage("signin");
    }
}

function showAuthPage(mode = "signin") {
    document.title = mode === "signup"
        ? "Create Your ShopEase Account — ₹500 Welcome SuperCash"
        : "Sign In to ShopEase — Welcome Back";

    const home = document.getElementById("homePage");
    const prod = document.getElementById("productPage");
    const auth = document.getElementById("authPage");

    if (home) home.style.display = "none";
    if (prod) prod.style.display = "none";
    if (auth) auth.style.display = "block";

    switchAuthTab(mode);
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function switchAuthTab(tab) {
    const signInForm = document.getElementById("signInForm");
    const signUpForm = document.getElementById("signUpForm");
    const tabSignIn = document.getElementById("tabSignIn");
    const tabSignUp = document.getElementById("tabSignUp");

    if (tab === "signup") {
        if (signInForm) signInForm.style.display = "none";
        if (signUpForm) signUpForm.style.display = "block";
        if (tabSignIn) tabSignIn.classList.remove("active");
        if (tabSignUp) tabSignUp.classList.add("active");
        window.location.hash = "#/signup";
    } else {
        if (signInForm) signInForm.style.display = "block";
        if (signUpForm) signUpForm.style.display = "none";
        if (tabSignIn) tabSignIn.classList.add("active");
        if (tabSignUp) tabSignUp.classList.remove("active");
        window.location.hash = "#/login";
    }
}

function togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;
    if (input.type === "password") {
        input.type = "text";
        if (btn) btn.textContent = "🙈";
    } else {
        input.type = "password";
        if (btn) btn.textContent = "👁️";
    }
}

function updatePasswordStrength(val) {
    const fill = document.getElementById("pwdStrengthFill");
    const text = document.getElementById("pwdStrengthText");
    if (!fill || !text) return;

    if (!val || val.length === 0) {
        fill.style.width = "0%";
        text.textContent = "Enter a secure password";
        text.style.color = "#64748b";
        return;
    }

    let score = 0;
    if (val.length >= 6) score++;
    if (val.length >= 10) score++;
    if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    if (score <= 2) {
        fill.style.width = "30%";
        fill.style.background = "#ef4444";
        text.textContent = "Weak password (add numbers or special characters)";
        text.style.color = "#ef4444";
    } else if (score <= 4) {
        fill.style.width = "65%";
        fill.style.background = "#f59e0b";
        text.textContent = "Medium password strength";
        text.style.color = "#f59e0b";
    } else {
        fill.style.width = "100%";
        fill.style.background = "#10b981";
        text.textContent = "Strong password! Excellent security.";
        text.style.color = "#10b981";
    }
}

function handleForgotPassword() {
    const email = document.getElementById("signInEmail")?.value.trim();
    if (email) {
        showToast(`Password reset link sent to ${email} (Demo simulation)`);
    } else {
        showToast("Please enter your registered email address above first.");
    }
}

async function submitSignIn(event) {
    if (event) event.preventDefault();

    const emailInput = document.getElementById("signInEmail");
    const passwordInput = document.getElementById("signInPassword");
    const submitBtn = document.getElementById("signInSubmitBtn");

    if (!emailInput || !passwordInput) return;

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        showToast("Please enter your email and password.");
        return;
    }

    const originalBtnText = submitBtn ? submitBtn.innerHTML : "";
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-inline"></span> Signing in...';
    }

    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            setCurrentUser(data.user, data.token);
            showToast(data.message || `Welcome back, ${data.user.name}!`);
            showHomePage();
        } else {
            showToast(data.message || "Invalid email or password.");
        }
    } catch (err) {
        console.warn("Backend auth call failed, checking local credentials:", err);
        // Fallback for offline or local preview
        if (email.toLowerCase() === "demo@shopease.in" && password === "demo123") {
            const demoUser = {
                id: "usr_demo",
                name: "Rahul Sharma",
                email: "demo@shopease.in",
                phone: "9876543210",
                superCash: 500,
                tier: "VIP Gold"
            };
            setCurrentUser(demoUser, "mock_token_123");
            showToast("Welcome back, Rahul Sharma!");
            showHomePage();
        } else {
            showToast("Unable to connect to authentication server. Check your credentials.");
        }
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    }
}

async function submitSignUp(event) {
    if (event) event.preventDefault();

    const nameInput = document.getElementById("signUpName");
    const emailInput = document.getElementById("signUpEmail");
    const phoneInput = document.getElementById("signUpPhone");
    const passwordInput = document.getElementById("signUpPassword");
    const submitBtn = document.getElementById("signUpSubmitBtn");

    if (!nameInput || !emailInput || !passwordInput) return;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const password = passwordInput.value;

    if (!name || !email || !password) {
        showToast("Please fill in all required fields.");
        return;
    }

    if (password.length < 6) {
        showToast("Password must be at least 6 characters.");
        return;
    }

    const originalBtnText = submitBtn ? submitBtn.innerHTML : "";
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-inline"></span> Creating account...';
    }

    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, phone, password })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            setCurrentUser(data.user, data.token);
            showToast(data.message || "Account created! ₹500 SuperCash credited.");
            showHomePage();
        } else {
            showToast(data.message || "Registration failed. Please try again.");
        }
    } catch (err) {
        console.warn("Backend auth call failed, creating local session:", err);
        const newUser = {
            id: "usr_" + Date.now(),
            name,
            email,
            phone: phone || "9876543210",
            superCash: 500,
            tier: "VIP Silver"
        };
        setCurrentUser(newUser, "mock_token_" + Date.now());
        showToast("Account created! ₹500 SuperCash credited.");
        showHomePage();
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    }
}

function quickDemoLogin() {
    const emailInput = document.getElementById("signInEmail");
    const passwordInput = document.getElementById("signInPassword");

    if (emailInput) emailInput.value = "demo@shopease.in";
    if (passwordInput) passwordInput.value = "demo123";

    switchAuthTab("signin");
    submitSignIn();
}

function simulateSocialAuth(provider) {
    showToast(`Connecting via ${provider} OAuth...`);
    setTimeout(() => {
        const user = {
            id: "usr_social_" + Date.now().toString(36),
            name: "Ananya Sen",
            email: "ananya.sen@gmail.com",
            phone: "9876543210",
            superCash: 500,
            tier: "VIP Gold"
        };
        setCurrentUser(user, "tok_social_" + Date.now());
        showToast(`Signed in successfully with ${provider}!`);
        showHomePage();
    }, 600);
}

function signOutUser() {
    setCurrentUser(null);
    closeModal("infoModal");
    showToast("You have been signed out successfully.");
    showHomePage();
}

/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function toggleMobileNav() {
    const categoryNav = document.querySelector(".category-nav");
    if (categoryNav) {
        categoryNav.classList.toggle("mobile-open");
    }
}

/* =========================================================
   HASH-BASED ROUTING
========================================================= */

function handleHashRouting() {
    const hash = window.location.hash || "";

    if (hash === "#login" || hash === "#/login" || hash === "#signin" || hash === "#/signin") {
        showAuthPage("signin");
        return;
    } else if (hash === "#signup" || hash === "#/signup" || hash === "#register" || hash === "#/register") {
        showAuthPage("signup");
        return;
    } else if (hash.startsWith("#product/")) {
        const productId = hash.replace("#product/", "").trim();
        if (productId) {
            openProductPage(productId);
            return;
        }
    } else if (hash.startsWith("#category/")) {
        const cat = decodeURIComponent(hash.replace("#category/", "").trim());
        if (cat) {
            filterByCategory(cat);
            return;
        }
    } else if (hash === "#orders") {
        showInfo("orders");
        return;
    } else if (hash === "#cart") {
        openCart();
        return;
    } else if (hash === "#wishlist") {
        showWishlist();
        return;
    }

    if (!hash || hash === "#" || hash === "#home") {
        closeProductPage();
    }
}

/* =========================================================
   START SHOP EASE
========================================================= */

document.addEventListener("DOMContentLoaded", async () => {
    initAuthState();
    initDeliveryLocation();
    renderSkeletons();

    const apiProducts = await loadProductsFromBackend();

    if (apiProducts.length > 0) {
        products = apiProducts;
        console.log(`ShopEase loaded ${products.length} verified products.`);
    } else {
        products = [];
        console.warn("Backend unavailable. No products loaded.");
    }

    filteredProducts = [...products];

    setupEvents();
    updateCartCount();
    renderDeals();
    renderProducts();

    window.addEventListener("hashchange", handleHashRouting);
    handleHashRouting();
});

/* =========================================================
   EVENTS
========================================================= */

function setupEvents() {

    const searchButton =
        document.getElementById(
            "searchButton"
        );


    const searchInput =
        document.getElementById(
            "searchInput"
        );


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            performSearch
        );

    }


    if (searchInput) {

    }


    document
        .getElementById(
            "sortSelect"
        )
        ?.addEventListener(
            "change",
            applyFilters
        );


    document
        .querySelectorAll(
            'input[name="categoryFilter"]'
        )
        .forEach(
            input => {

                input.addEventListener(
                    "change",
                    () => {

                        currentCategory =
                            input.value;

                        currentAudience =
                            "All";

                        applyFilters();

                    }
                );

            }
        );


    document
        .querySelectorAll(
            'input[name="ratingFilter"]'
        )
        .forEach(
            input => {

                input.addEventListener(
                    "change",
                    () => {

                        selectedRating =
                            Number(
                                input.value
                            );

                        applyFilters();

                    }
                );

            }
        );


    document
        .querySelectorAll(
            'input[name="priceFilter"]'
        )
        .forEach(
            input => {

                input.addEventListener(
                    "change",
                    () => {

                        selectedPrice =
                            Number(
                                input.value
                            );

                        applyFilters();

                    }
                );

            }
        );


    document.addEventListener(
        "click",
        event => {

            if (
                !event.target.closest(
                    ".nav-category-wrapper"
                )
            ) {

                closeNavMenus();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeCart();

                closeNavMenus();

                document
                    .querySelectorAll(
                        ".modal-overlay"
                    )
                    .forEach(
                        modal =>
                            modal.classList.remove(
                                "open"
                            )
                    );

            }

        }
    );

}


/* =========================================================
   PRODUCT PAGE
========================================================= */

function checkProductPage() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const id =
        params.get(
            "product"
        );


    if (!id) {

        showHomePage();

        return;

    }


    const product =
        products.find(
            item =>
                item.id === id
        );


    if (!product) {

        showHomePage();

        showToast(
            "Product not found."
        );

        return;

    }


    showProductPage(
        product
    );

}


function showHomePage() {
    document.title = "ShopEase — Modern Curated Marketplace | Fashion, Electronics, Shoes, Home";
    const home = document.getElementById("homePage");
    const prod = document.getElementById("productPage");
    const auth = document.getElementById("authPage");
    if (home) home.style.display = "block";
    if (prod) prod.style.display = "none";
    if (auth) auth.style.display = "none";
}

function updateProductJsonLd(product) {
    try {
        let scriptTag = document.getElementById("productSchemaJsonLd");
        if (!scriptTag) {
            scriptTag = document.createElement("script");
            scriptTag.id = "productSchemaJsonLd";
            scriptTag.type = "application/ld+json";
            document.head.appendChild(scriptTag);
        }
        scriptTag.textContent = JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.name,
            "image": product.images || [product.image],
            "description": product.description,
            "brand": {
                "@type": "Brand",
                "name": product.brand
            },
            "offers": {
                "@type": "Offer",
                "priceCurrency": "INR",
                "price": product.price,
                "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": product.rating,
                "reviewCount": product.reviews
            }
        });
    } catch (e) {
        console.warn("Could not inject Product JSON-LD:", e);
    }
}

function showProductPage(product) {
    detailProduct = product;
    detailQuantity = 1;
    detailSelectedSize = product.sizes?.[0] || "";

    document.title = `${product.name} — ShopEase`;
    document.getElementById("homePage").style.display = "none";
    document.getElementById("productPage").style.display = "block";
    const authPageEl = document.getElementById("authPage");
    if (authPageEl) authPageEl.style.display = "none";

    window.scrollTo({ top: 0, behavior: "instant" });

    populateProductDetails(product);
    renderRelatedProducts(product);
    updateProductJsonLd(product);
}

/* =========================================================
   PRODUCT DETAILS
========================================================= */

function populateProductDetails(
    product
) {

    setText(
        "detailProductBrand",
        product.brand
    );


    setText(
        "detailProductName",
        product.name
    );


    setText(
        "detailProductRating",
        `⭐ ${product.rating}`
    );


    setText(
        "detailProductReviews",
        `${product.reviews.toLocaleString()} ratings`
    );


    setText(
        "detailProductPrice",
        money(product.price)
    );


    setText(
        "detailProductOriginalPrice",
        money(product.originalPrice)
    );


    setText(
        "detailProductDiscount",
        `${product.discount}% OFF`
    );


    setText(
        "detailProductDescription",
        product.description
    );


    setText(
        "detailReviewScore",
        product.rating
    );


    setText(
        "detailReviewSummary",
        product.rating >= 4.5
            ? "Highly rated by customers"
            : "Popular with shoppers"
    );


    setText(
        "detailStock",

        product.stock <= 10

            ? `Only ${product.stock} left — order soon`

            : `✓ In Stock · ${product.stock} units available`
    );


    setText(
        "detailSellerName",
        `${product.brand} Verified Seller`
    );


    setText(
        "specBrand",
        product.brand
    );


    setText(
        "specCategory",
        product.category
    );


    setText(
        "specSubcategory",
        product.subcategory
    );


    setText(
        "specProductId",
        product.id
    );


    setText(
        "specAvailability",
        product.stock > 0
            ? "In Stock"
            : "Out of Stock"
    );


    const deliveryDate =
        new Date();


    deliveryDate.setDate(
        deliveryDate.getDate() +
        product.deliveryDays
    );


    setText(
        "detailDeliveryDate",
        `Available by ${formatDate(deliveryDate)}`
    );


    const image =
        document.getElementById(
            "detailProductImage"
        );


    image.src =
        product.image;


    image.alt =
        product.name;


    renderGallery(
        product
    );


    renderSizes(
        product
    );


    renderHighlights(
        product
    );


    updateDetailQuantity();

    updateDetailWishlistButton();

    updateBreadcrumb(
        product
    );

}


/* =========================================================
   GALLERY
========================================================= */

function renderGallery(
    product
) {

    const wrapper =
        document.getElementById(
            "productThumbnails"
        );


    if (!wrapper) {
        return;
    }


    const images = (product.images && product.images.length > 0)
        ? product.images
        : [product.image];


    wrapper.innerHTML = "";


    images.forEach(
        (src, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "product-thumb";


            if (
                index === 0
            ) {

                button.classList.add(
                    "active"
                );

            }


            button.innerHTML = `
                <img
                    src="${src}"
                    alt="Product view ${index + 1}"
                >
            `;


            button.onclick =
                () => {

                    document
                        .getElementById(
                            "detailProductImage"
                        )
                        .src = src;


                    wrapper
                        .querySelectorAll(
                            ".product-thumb"
                        )
                        .forEach(
                            item =>
                                item.classList.remove(
                                    "active"
                                )
                        );


                    button.classList.add(
                        "active"
                    );

                };


            wrapper.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   HIGHLIGHTS
========================================================= */

function renderHighlights(
    product
) {

    const list =
        document.getElementById(
            "detailProductHighlights"
        );


    const points = [

        `Premium ${product.subcategory.toLowerCase()} quality`,

        "Designed for everyday use",

        "Quality checked before dispatch",

        `Fast delivery in ${product.deliveryDays}–${product.deliveryDays + 2} days`,

        "Eligible for applicable return and exchange policy"

    ];


    list.innerHTML =
        points
            .map(
                point =>
                    `<li>${escapeHTML(point)}</li>`
            )
            .join("");

}


/* =========================================================
   BREADCRUMB
========================================================= */

function updateBreadcrumb(product) {
    const parts = [
        { label: "Home", action: "home" },
        { label: product.category, action: "category", value: product.category }
    ];

    if (product.gender && product.gender !== "All") {
        parts.push({ label: product.gender, action: "category", value: product.category });
    }

    if (product.subcategory) {
        parts.push({ label: product.subcategory, action: "category", value: product.category });
    }

    parts.push({ label: product.name, isCurrent: true });

    const breadcrumbEl = document.getElementById("productBreadcrumb");
    if (!breadcrumbEl) return;

    breadcrumbEl.innerHTML = parts.map((part, index) => {
        if (part.isCurrent || index === parts.length - 1) {
            return `<strong>${escapeHTML(part.label)}</strong>`;
        }

        if (part.action === "home") {
            return `<a href="#" class="breadcrumb-link" onclick="goBackToShop(); return false;">${escapeHTML(part.label)}</a> <b>›</b>`;
        }

        return `<a href="#category/${encodeURIComponent(part.value)}" class="breadcrumb-link" onclick="filterByCategory('${escapeHTML(part.value)}'); goBackToShop(); return false;">${escapeHTML(part.label)}</a> <b>›</b>`;
    }).join(" ");
}


/* =========================================================
   SIZES
========================================================= */

function renderSizes(
    product
) {

    const section =
        document.getElementById(
            "detailSizeSection"
        );


    const wrapper =
        document.getElementById(
            "detailSizeOptions"
        );


    const sizes =
        product.sizes || [];

    if (!sizes.length) {

        section.style.display =
            "none";

        return;

    }


    section.style.display =
        "block";


    wrapper.innerHTML = "";


    sizes.forEach(
        size => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "detail-size-option";


            if (
                size ===
                detailSelectedSize
            ) {

                button.classList.add(
                    "selected"
                );

            }


            button.textContent =
                size;


            button.onclick =
                () => {

                    detailSelectedSize =
                        size;

                    renderSizes(
                        product
                    );

                };


            wrapper.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   QUANTITY
========================================================= */

function changeDetailQuantity(
    change
) {

    if (!detailProduct) {
        return;
    }


    detailQuantity =
        Math.max(
            1,

            Math.min(
                detailProduct.stock,

                detailQuantity +
                change
            )
        );


    updateDetailQuantity();

}


function updateDetailQuantity() {

    setText(
        "detailQuantity",
        detailQuantity
    );

}


/* =========================================================
   PRODUCT ACTIONS
========================================================= */

function addDetailProductToCart() {

    if (
        (detailProduct.sizes || []).length &&
        !detailSelectedSize
    ) {

        showToast(
            "Please select a size."
        );

        return false;

    }


    addToCart(
        detailProduct,
        detailQuantity,
        detailSelectedSize
    );

}


function buyDetailProductNow() {
    const added = addDetailProductToCart();

    if (added) {
        openCart();
    }
}

function toggleDetailWishlist() {

    toggleWishlist(
        detailProduct.id,
        true
    );


    updateDetailWishlistButton();

}


function updateDetailWishlistButton() {

    const button =
        document.getElementById(
            "detailWishlistButton"
        );


    const active =
        getWishlist().includes(
            detailProduct?.id
        );


    button.classList.toggle(
        "active",
        active
    );


    button.textContent =
        active
            ? "♥"
            : "♡";

}


/* =========================================================
   DELIVERY CHECK
========================================================= */

function checkDelivery() {

    const input =
        document.getElementById(
            "pincodeInput"
        );


    const result =
        document.getElementById(
            "pincodeResult"
        );


    const pin =
        input.value.trim();


    if (
        !/^[1-9][0-9]{5}$/.test(
            pin
        )
    ) {

        result.textContent =
            "Please enter a valid 6-digit PIN code.";

        result.style.color =
            "#c33c3c";

        return;

    }


    const deliveryDate =
        new Date();


    deliveryDate.setDate(
        deliveryDate.getDate() +
        (
            detailProduct?.deliveryDays ||
            4
        )
    );


    result.textContent =
        `✓ Delivery available. Estimated delivery by ${formatDate(deliveryDate)}.`;

    result.style.color =
        "#138a55";

}


/* =========================================================
   RELATED PRODUCTS
========================================================= */

function renderRelatedProducts(
    product
) {

    const wrapper =
        document.getElementById(
            "relatedProductsGrid"
        );


    let related =
        products
            .filter(
                item =>
                    item.id !== product.id &&
                    item.category === product.category &&
                    (
                        item.subcategory ===
                        product.subcategory ||

                        item.gender ===
                        product.gender
                    )
            )
            .slice(
                0,
                4
            );


    if (
        related.length < 4
    ) {

        related =
            products
                .filter(
                    item =>
                        item.id !== product.id &&
                        item.category === product.category
                )
                .slice(
                    0,
                    4
                );

    }


    wrapper.innerHTML =
        related
            .map(
                product => `

                    <article
                        class="related-product-card"
                        onclick="openProductPage('${product.id}')"
                    >

                        <div class="related-product-image">

                            <img
                                src="${product.image}"
                                alt="${escapeHTML(product.name)}"
                            >

                        </div>


                        <div class="related-product-info">

                            <div class="related-product-brand">
                                ${escapeHTML(product.brand)}
                            </div>

                            <div class="related-product-name">
                                ${escapeHTML(product.name)}
                            </div>

                            <div class="related-product-rating">
                                ⭐ ${product.rating}
                                ·
                                ${product.reviews.toLocaleString()}
                                reviews
                            </div>

                            <div class="related-product-price">
                                ${money(product.price)}
                            </div>

                        </div>

                    </article>

                `
            )
            .join("");

}


function openProductPage(id) {
    if (!id) return;
    if (window.location.hash !== `#product/${encodeURIComponent(id)}`) {
        window.location.hash = `#product/${encodeURIComponent(id)}`;
    }
    const product = products.find(item => item.id === id);
    if (product) {
        showProductPage(product);
    } else {
        showToast("Product not found.");
    }
}

function goBackToShop() {
    window.location.hash = "#";
    showHomePage();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* =========================================================
   PRODUCT LISTING
========================================================= */

function renderProducts() {
    const grid = document.getElementById("productGrid");
    if (!grid) return;

    if (isInitialLoading) {
        renderSkeletons();
        return;
    }

    if (!filteredProducts || filteredProducts.length === 0) {
        if (!backendConnected) {
            grid.innerHTML = `
                <div class="empty-state-box error-state-box">
                    <div class="empty-state-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c40000" stroke-width="1.8"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    </div>
                    <h3>Backend Server Not Reachable</h3>
                    <p>Could not connect to the ShopEase catalog service. Please ensure the backend is running at <code>${API_BASE_URL}</code>.</p>
                    <button class="empty-state-btn" onclick="retryLoadProducts()">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6"></path><path d="M1 20v-6h6"></path><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                        Retry Connection
                    </button>
                </div>
            `;
        } else {
            grid.innerHTML = `
                <div class="empty-state-box">
                    <div class="empty-state-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </div>
                    <h3>No products found</h3>
                    <p>No products match your selected filters or search keyword. Try clearing filters.</p>
                    <button class="empty-state-btn" onclick="resetFilters()">Reset All Filters</button>
                </div>
            `;
        }
        renderPagination();
        updateResultsSummary();
        return;
    }

    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const pageProducts = filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);

    grid.innerHTML = pageProducts.map(product => productCardHTML(product)).join("");
    renderPagination();
    updateResultsSummary();
}

function productCardHTML(product) {
    const wishlist = getWishlist().includes(product.id);

    return `
        <article class="product-card" onclick="openProductPage('${product.id}')">
            <div class="product-image-wrap">
                <img
                    class="product-image"
                    loading="lazy"
                    src="${product.image}"
                    alt="${escapeHTML(product.name)}"
                >

                <button
                    class="product-wishlist ${wishlist ? "active" : ""}"
                    onclick="event.stopPropagation();toggleWishlist('${product.id}')"
                    aria-label="Add to wishlist"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="${wishlist ? "#c40000" : "none"}" stroke="${wishlist ? "#c40000" : "currentColor"}" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </button>

                <span class="discount-badge">
                    ${product.discount}% OFF
                </span>
            </div>

            <div class="product-card-content">
                <div class="product-brand">
                    ${escapeHTML(product.brand)}
                </div>

                <h3 class="product-name">
                    ${escapeHTML(product.name)}
                </h3>

                <div class="product-rating">
                    <span class="product-rating-star">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="#ffb703" stroke="#ffb703" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        ${product.rating}
                    </span>
                    <small>(${product.reviews.toLocaleString()})</small>
                </div>

                <div class="product-price-row">
                    <strong>${money(product.price)}</strong>
                    <span>${money(product.originalPrice || product.price)}</span>
                </div>

                <div class="product-delivery">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                    Free delivery
                </div>

                ${product.stock <= 10
            ? `<div class="product-stock-warning">Hurry! Only ${product.stock} left</div>`
            : ""
        }

                <button
                    class="view-product-btn"
                    onclick="event.stopPropagation();openProductPage('${product.id}')"
                >
                    View Details
                </button>
            </div>
        </article>
    `;
}


/* =========================================================
   PAGINATION
========================================================= */

function renderPagination() {

    const wrapper =
        document.getElementById(
            "pagination"
        );


    const totalPages =
        Math.ceil(
            filteredProducts.length /
            PRODUCTS_PER_PAGE
        );


    wrapper.innerHTML = "";


    if (
        totalPages <= 1
    ) {

        return;

    }


    function addButton(
        text,
        page,
        disabled = false,
        active = false
    ) {

        const button =
            document.createElement(
                "button"
            );


        button.textContent =
            text;


        button.disabled =
            disabled;


        if (active) {

            button.classList.add(
                "active"
            );

        }


        button.onclick =
            () => {

                currentPage =
                    page;

                renderProducts();

                scrollToProducts();

            };


        wrapper.appendChild(
            button
        );

    }


    addButton(
        "←",
        Math.max(
            1,
            currentPage - 1
        ),
        currentPage === 1
    );


    let start =
        Math.max(
            1,
            currentPage - 2
        );


    let end =
        Math.min(
            totalPages,
            start + 4
        );


    if (
        end - start < 4
    ) {

        start =
            Math.max(
                1,
                end - 4
            );

    }


    for (
        let page = start;
        page <= end;
        page++
    ) {

        addButton(
            page,
            page,
            false,
            page === currentPage
        );

    }


    addButton(
        "→",
        Math.min(
            totalPages,
            currentPage + 1
        ),
        currentPage === totalPages
    );

}


/* =========================================================
   FILTERS
========================================================= */

function applyFilters() {

    const sort =
        document.getElementById(
            "sortSelect"
        ).value;


    filteredProducts =
        products.filter(
            product => {

                const categoryMatch =
                    currentCategory === "All" ||
                    product.category ===
                    currentCategory;


                const audienceMatch =
                    currentAudience === "All" ||
                    product.gender ===
                    currentAudience;


                const searchMatch =
                    !currentSearch ||

                    [
                        product.name,
                        product.brand,
                        product.category,
                        product.subcategory,
                        product.gender,
                        product.description
                    ]
                        .join(" ")
                        .toLowerCase()
                        .includes(
                            currentSearch
                        );


                const ratingMatch =
                    product.rating >=
                    selectedRating;


                const priceMatch =
                    selectedPrice === 0 ||
                    product.price <=
                    selectedPrice;


                return (
                    categoryMatch &&
                    audienceMatch &&
                    searchMatch &&
                    ratingMatch &&
                    priceMatch
                );

            }
        );


    if (
        sort === "price-low"
    ) {

        filteredProducts.sort(
            (a, b) =>
                a.price -
                b.price
        );

    }


    if (
        sort === "price-high"
    ) {

        filteredProducts.sort(
            (a, b) =>
                b.price -
                a.price
        );

    }


    if (
        sort === "rating"
    ) {

        filteredProducts.sort(
            (a, b) =>
                b.rating -
                a.rating
        );

    }


    if (
        sort === "discount"
    ) {

        filteredProducts.sort(
            (a, b) =>
                b.discount -
                a.discount
        );

    }


    currentPage = 1;


    renderProducts();

}


/* =========================================================
   CATEGORY FILTER
========================================================= */

function filterByCategory(
    category
) {

    currentCategory =
        category;


    currentAudience =
        "All";


    currentSearch =
        "";


    document.getElementById(
        "searchInput"
    ).value = "";


    document
        .querySelectorAll(
            'input[name="categoryFilter"]'
        )
        .forEach(
            input => {

                input.checked =
                    input.value ===
                    category;

            }
        );


    closeNavMenus();

    closeCategoryPanels();

    applyFilters();

    scrollToProducts();

}


/* =========================================================
   AUDIENCE FILTER
========================================================= */

function filterByAudience(
    category,
    audience
) {

    currentCategory =
        category;


    currentAudience =
        audience;


    currentSearch =
        "";


    document.getElementById(
        "searchInput"
    ).value = "";


    document
        .querySelectorAll(
            'input[name="categoryFilter"]'
        )
        .forEach(
            input => {

                input.checked =
                    input.value ===
                    category;

            }
        );


    closeNavMenus();

    closeCategoryPanels();

    applyFilters();

    scrollToProducts();

}


/* =========================================================
   SEARCH
========================================================= */

function performSearch() {

    currentSearch =
        document
            .getElementById(
                "searchInput"
            )
            .value
            .trim()
            .toLowerCase();


    currentCategory =
        "All";


    currentAudience =
        "All";


    document
        .querySelectorAll(
            'input[name="categoryFilter"]'
        )
        .forEach(
            input => {

                input.checked =
                    input.value ===
                    "All";

            }
        );


    applyFilters();

    scrollToProducts();

}


/* =========================================================
   CLEAR FILTERS
========================================================= */

function clearFilters() {

    currentCategory =
        "All";


    currentAudience =
        "All";


    currentSearch =
        "";


    selectedRating =
        0;


    selectedPrice =
        0;


    document.getElementById(
        "searchInput"
    ).value = "";


    document
        .querySelectorAll(
            'input[name="categoryFilter"]'
        )
        .forEach(
            input => {

                input.checked =
                    input.value ===
                    "All";

            }
        );


    document
        .querySelectorAll(
            'input[name="ratingFilter"]'
        )
        .forEach(
            input => {

                input.checked =
                    input.value ===
                    "0";

            }
        );


    document
        .querySelectorAll(
            'input[name="priceFilter"]'
        )
        .forEach(
            input => {

                input.checked =
                    input.value ===
                    "0";

            }
        );


    applyFilters();

}


/* =========================================================
   RESULT SUMMARY
========================================================= */

function updateResultsSummary() {

    let text =
        `${filteredProducts.length.toLocaleString()} products available`;


    if (currentSearch) {

        text =
            `${filteredProducts.length.toLocaleString()} products found for "${currentSearch}"`;

    }


    else if (
        currentAudience !== "All"
    ) {

        text =
            `${filteredProducts.length.toLocaleString()} ${currentAudience} products in ${currentCategory}`;

    }


    else if (
        currentCategory !== "All"
    ) {

        text =
            `${filteredProducts.length.toLocaleString()} products in ${currentCategory}`;

    }


    document.getElementById(
        "resultsSummary"
    ).textContent =
        text;

}


/* =========================================================
   DEALS
========================================================= */

function renderDeals() {

    const deals =
        products
            .filter(
                product =>
                    product.discount >= 55
            )
            .slice(
                0,
                4
            );


    document.getElementById(
        "dealGrid"
    ).innerHTML =

        deals
            .map(
                product => `

                    <article
                        class="deal-card"
                        onclick="openProductPage('${product.id}')"
                    >

                        <div class="deal-image">

                            <img
                                src="${product.image}"
                                alt="${escapeHTML(product.name)}"
                            >

                        </div>


                        <div class="deal-content">

                            <span class="deal-discount">
                                ${product.discount}% OFF
                            </span>

                            <h3>
                                ${escapeHTML(product.name)}
                            </h3>

                            <strong>
                                ${money(product.price)}
                            </strong>

                            <button class="deal-button">
                                View Deal →
                            </button>

                        </div>

                    </article>

                `
            )
            .join("");

}


/* =========================================================
   NAV MENUS
========================================================= */

function toggleNavMenu(
    id
) {

    const menu =
        document.getElementById(
            id
        );


    const alreadyOpen =
        menu.classList.contains(
            "open"
        );


    closeNavMenus();


    if (!alreadyOpen) {

        menu.classList.add(
            "open"
        );

    }

}


function closeNavMenus() {

    document
        .querySelectorAll(
            ".category-dropdown"
        )
        .forEach(
            menu =>
                menu.classList.remove(
                    "open"
                )
        );

}


/* =========================================================
   CATEGORY PANELS
========================================================= */

function toggleCategoryPanel(
    id
) {

    const panel =
        document.getElementById(
            id
        );


    const alreadyOpen =
        panel.classList.contains(
            "open"
        );


    closeCategoryPanels();


    if (!alreadyOpen) {

        panel.classList.add(
            "open"
        );

    }

}


function closeCategoryPanels() {

    document
        .querySelectorAll(
            ".category-panel"
        )
        .forEach(
            panel =>
                panel.classList.remove(
                    "open"
                )
        );

}


/* =========================================================
   CART
========================================================= */

function getCart() {

    try {

        return (
            JSON.parse(
                localStorage.getItem(
                    "shopEaseCart"
                )
            ) || []
        );

    }

    catch {

        return [];

    }

}


function saveCart(
    cart
) {

    localStorage.setItem(
        "shopEaseCart",
        JSON.stringify(cart)
    );


    updateCartCount();

}


function addToCart(
    product,
    quantity = 1,
    size = ""
) {

    const cart =
        getCart();


    const existing =
        cart.find(
            item =>
                item.id ===
                product.id &&
                item.size ===
                size
        );


    if (existing) {

        existing.product =
            product;

        existing.quantity +=
            quantity;

    } else {

        cart.push({
            id:
                product.id,

            quantity,

            size,

            product
        });

    }



    saveCart(
        cart
    );


    showToast(
        "Product added to cart."
    );
    return true;

}


function updateCartCount() {

    const count =
        getCart()
            .reduce(
                (
                    total,
                    item
                ) =>
                    total +
                    item.quantity,
                0
            );


    const element =
        document.getElementById(
            "cartCount"
        );


    if (element) {

        element.textContent =
            count;

    }

}


function openCart() {

    document
        .getElementById(
            "cartDrawer"
        )
        .classList.add(
            "open"
        );


    document
        .getElementById(
            "cartOverlay"
        )
        .classList.add(
            "open"
        );


    renderCart();

}


function closeCart() {

    document
        .getElementById(
            "cartDrawer"
        )
        .classList.remove(
            "open"
        );


    document
        .getElementById(
            "cartOverlay"
        )
        .classList.remove(
            "open"
        );

}


/* =========================================================
   CART RENDER
========================================================= */

function renderCart() {

    const wrapper =
        document.getElementById("cartContent");

    const cart =
        getCart();

    /*
        Update cart item count in drawer header
    */

    const cartItemCount =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    const cartCountLabel =
        document.getElementById(
            "cartItemCountLabel"
        );

    if (cartCountLabel) {

        cartCountLabel.textContent =
            `(${cartItemCount} ${cartItemCount === 1
                ? "item"
                : "items"
            })`;

    }


    /* =========================================
       EMPTY CART
    ========================================= */

    if (!cart.length) {

        wrapper.innerHTML = `

            <div class="se-cart-empty">

                <div class="se-cart-empty-icon">
                    🛒
                </div>

                <h3>
                    Your ShopEase cart is empty
                </h3>

                <p>
                    Discover products you'll love
                    and add them to your cart.
                </p>

                <button
                    class="se-cart-shop-btn"
                    onclick="
                        closeCart();
                        scrollToProducts();
                    "
                >
                    Start Shopping
                </button>

            </div>

    `;




    }

    /* =========================================
       TOTALS
    ========================================= */

    let bagTotal = 0;

    let originalTotal = 0;


    /* =========================================
       CART ITEMS
    ========================================= */

    const items = cart
        .map(
            (item, index) => {

                const product =
                    item.product ||
                    products.find(
                        p =>
                            p.id === item.id
                    );

                if (!product) {
                    return "";
                }


                bagTotal +=
                    product.price *
                    item.quantity;


                originalTotal +=
                    (
                        product.originalPrice ||
                        product.price
                    ) *
                    item.quantity;


                const itemOriginalPrice =
                    product.originalPrice ||
                    product.price;


                const discountPercent =
                    itemOriginalPrice > product.price
                        ? Math.round(
                            (
                                (
                                    itemOriginalPrice -
                                    product.price
                                ) /
                                itemOriginalPrice
                            ) * 100
                        )
                        : 0;


                return `

                    <article
                        class="se-cart-item"
                    >

                        <div
                            class="se-cart-product-image"
                        >

                            <img
                                src="${product.image}"
                                alt="${escapeHTML(
                    product.name
                )}"
                            >

                        </div>


                        <div
                            class="se-cart-product-content"
                        >

                            <div
                                class="se-cart-brand"
                            >
                                ${escapeHTML(
                    product.brand
                )}
                            </div>


                            <h3
                                class="se-cart-product-name"
                            >
                                ${escapeHTML(
                    product.name
                )}
                            </h3>


                            <div
                                class="se-cart-price-line"
                            >

                                <strong>
                                    ${money(
                    product.price
                )}
                                </strong>

                                ${itemOriginalPrice >
                        product.price
                        ? `
                                            <span
                                                class="se-cart-original-price"
                                            >
                                                ${money(
                            itemOriginalPrice
                        )}
                                            </span>

                                            <span
                                                class="se-cart-discount"
                                            >
                                                ${discountPercent}% OFF
                                            </span>
                                        `
                        : ""
                    }

                            </div>


                            <div
                                class="se-cart-stock"
                            >
                                ✓ In stock
                            </div>


                            <div
                                class="se-cart-delivery"
                            >
                                ✓ Eligible for FREE delivery
                            </div>


                            <div
                                class="se-cart-seller"
                            >
                                Sold by
                                <strong>
                                    ShopEase
                                </strong>
                            </div>


                            ${item.size
                        ? `
                                        <div
                                            class="se-cart-meta"
                                        >
                                            <span>
                                                Size:
                                                ${escapeHTML(
                            item.size
                        )}
                                            </span>
                                        </div>
                                    `
                        : ""
                    }


                            <div
                                class="se-cart-actions"
                            >

                                <div
                                    class="se-quantity-control"
                                >

                                    <button
                                        type="button"
                                        aria-label="Decrease quantity"
                                        onclick="
                                            changeCartQuantity(
                                                ${index},
                                                -1
                                            )
                                        "
                                    >
                                        −
                                    </button>

                                    <span>
                                        ${item.quantity}
                                    </span>

                                    <button
                                        type="button"
                                        aria-label="Increase quantity"
                                        onclick="
                                            changeCartQuantity(
                                                ${index},
                                                1
                                            )
                                        "
                                    >
                                        +
                                    </button>

                                </div>


                                <span
                                    class="se-action-divider"
                                >
                                    |
                                </span>


                                <button
                                    type="button"
                                    class="se-cart-text-action"
                                    onclick="
                                        removeCartItem(
                                            ${index}
                                        )
                                    "
                                >
                                    Delete
                                </button>


                                <span
                                    class="se-action-divider"
                                >
                                    |
                                </span>


                                <button
                                    type="button"
                                    class="se-cart-text-action"
                                    onclick="
                                        showToast(
                                            'Save for later will be available soon.'
                                        )
                                    "
                                >
                                    Save for later
                                </button>

                            </div>

                        </div>

                    </article>

                `;

            }
        )
        .join("");


    /* =========================================
       SHOP EASE CART CALCULATIONS
    ========================================= */

    const coupon =
        cartItemCount > 0 && bagTotal >= 1000
            ? Math.min(
                Math.round(
                    bagTotal * 0.10
                ),
                500
            )
            : 0;


    const delivery =
        cartItemCount > 0
            ? (bagTotal >= 2500 ? 0 : 79)
            : 0;


    const convenienceFee =
        cartItemCount > 0 ? 29 : 0;


    const platformFee =
        cartItemCount > 0 ? 22 : 0;


    const payable =
        bagTotal -
        coupon +
        delivery +
        convenienceFee +
        platformFee;


    const savings =
        Math.max(
            0,
            originalTotal -
            bagTotal +
            coupon
        );


    /* =========================================
       FREE DELIVERY MESSAGE
    ========================================= */

    const deliveryMessage =
        bagTotal >= 2500
            ? `
                <div class="se-free-delivery-message success">

                    <span>✓</span>

                    <div>
                        <strong>
                            You are eligible for FREE delivery!
                        </strong>
                    </div>

                </div>
            `
            : `
                <div class="se-free-delivery-message">

                    <span>🚚</span>

                    <div>

                        <strong>
                            Add ${money(
                2500 - bagTotal
            )} more
                        </strong>

                        <small>
                            to get FREE delivery
                        </small>

                    </div>

                </div>
            `;


    /* =========================================
       CART CONTENT
    ========================================= */

    wrapper.innerHTML = `

        ${deliveryMessage}

<!-- COUPON -->

        <div class="se-cart-expandable">

            <button
                type="button"
                class="se-cart-coupon"
                onclick="toggleCartSection('couponSection')"
            >

                <span class="se-coupon-left">

                    <span class="se-coupon-icon">
                        🏷️
                    </span>

                    <span>

                        <strong>
                            Apply Coupon
                        </strong>

                        <small>
                            Use SHOP10 for eligible orders
                        </small>

                    </span>

                </span>

                <span
                    class="se-chevron"
                    id="couponSectionArrow"
                >
                    ›
                </span>

            </button>


            <div
                id="couponSection"
                class="se-cart-expand-content"
            >

                <div class="se-coupon-input-row">

                    <input
                        type="text"
                        id="cartCouponInput"
                        placeholder="Enter coupon code"
                        maxlength="20"
                    >

                    <button
                        type="button"
                        onclick="applyCartCoupon()"
                    >
                        Apply
                    </button>

                </div>

                <div class="se-available-coupon">

                    <strong>
                        SHOP10
                    </strong>

                    <span>
                        Get 10% off on eligible orders
                    </span>

                </div>

            </div>

        </div>

        <!-- CART ITEMS -->

        <section class="se-cart-items-section">

            ${items}

        </section>


        

        <!-- SUPERCASH / LOYALTY / GST -->

        <div class="se-cart-benefits">

            <div class="se-benefit-expandable">

                <button
                    type="button"
                    class="se-benefit-toggle"
                    onclick="toggleCartSection('supercashSection')"
                >

                    <span class="se-benefit-icon">
                        💰
                    </span>

                    <span class="se-benefit-text">

                        <strong>
                            SuperCash
                        </strong>

                        <small>
                            Earn ₹10 SuperCash on this order
                        </small>

                    </span>

                    <span
                        class="se-benefit-arrow"
                        id="supercashSectionArrow"
                    >
                        ›
                    </span>

                </button>

                <div
                    id="supercashSection"
                    class="se-benefit-expand-content"
                >

                    <p>
                        You will earn
                        <strong>₹10 SuperCash</strong>
                        on this order.
                    </p>

                    <small>
                        SuperCash will be credited after
                        the applicable return window.
                    </small>

                </div>

            </div>


            <div class="se-benefit-expandable">

                <button
                    type="button"
                    class="se-benefit-toggle"
                    onclick="toggleCartSection('loyaltySection')"
                >

                    <span class="se-benefit-icon">
                        ⭐
                    </span>

                    <span class="se-benefit-text">

                        <strong>
                            Loyalty Points
                        </strong>

                        <small>
                            No loyalty points available yet
                        </small>

                    </span>

                    <span
                        class="se-benefit-arrow"
                        id="loyaltySectionArrow"
                    >
                        ›
                    </span>

                </button>

                <div
                    id="loyaltySection"
                    class="se-benefit-expand-content"
                >

                    <p>
                        You currently have
                        <strong>0 loyalty points</strong>.
                    </p>

                    <small>
                        Points can be earned on eligible
                        ShopEase purchases.
                    </small>

                </div>

            </div>


            <div class="se-benefit-expandable">

                <button
                    type="button"
                    class="se-benefit-toggle"
                    onclick="toggleCartSection('gstSection')"
                >

                    <span class="se-benefit-icon">
                        🧾
                    </span>

                    <span class="se-benefit-text">

                        <strong>
                            GST Invoice
                        </strong>

                        <small>
                            View GST invoice benefits
                        </small>

                    </span>

                    <span
                        class="se-benefit-arrow"
                        id="gstSectionArrow"
                    >
                        ›
                    </span>

                </button>

                <div
                    id="gstSection"
                    class="se-benefit-expand-content"
                >

                    <p>
                        Eligible business customers can
                        request a GST invoice.
                    </p>

                    <small>
                        GST details can be provided during
                        checkout.
                    </small>

                </div>

            </div>

        </div>


        <!-- PRICE DETAILS -->

        <section class="se-price-details">

            <div class="se-price-details-heading">

                <h3>
                    Price Details
                </h3>

                <span>
                    ${cartItemCount}
                    ${cartItemCount === 1
            ? "item"
            : "items"
        }
                </span>

            </div>


            <div class="se-price-row">

                <span>
                    Subtotal
                </span>

                <strong>
                    ${money(bagTotal)}
                </strong>

            </div>


            <div
                class="se-price-row se-discount-row"
            >

                <span>
                    Coupon Discount
                </span>

                <strong>
                    - ${money(coupon)}
                </strong>

            </div>


            ${cartItemCount > 0 ? `
            <div class="se-price-row">

                <span>
                    Convenience Fee

                    <button
                        type="button"
                        onclick="
                            showInfo(
                                'convenience'
                            )
                        "
                    >
                        ⓘ
                    </button>

                </span>

                <strong>
                    ${money(convenienceFee)}
                </strong>

            </div>


            <div class="se-price-row">

                <span>
                    Delivery Fee
                </span>

                <strong
                    class="${delivery === 0
            ? "free"
            : ""
        }"
                >
                    ${delivery === 0
            ? "FREE"
            : money(delivery)
        }
                </strong>

            </div>


            <div class="se-price-row">

                <span>
                    Platform Fee

                    <button
                        type="button"
                        onclick="
                            showInfo(
                                'platform'
                            )
                        "
                    >
                        ⓘ
                    </button>

                </span>

                <strong>
                    ${money(platformFee)}
                </strong>

            </div>
            ` : ''}


            <div class="se-price-divider"></div>


            <div class="se-total-row">

                <span>
                    Total Amount
                </span>

                <strong>
                    ${money(payable)}
                </strong>

            </div>


            <div class="se-savings-banner">

                <span>
                    ✓
                </span>

                <div>
                    You are saving
                    <strong>
                        ${money(savings)}
                    </strong>
                    on this order.
                </div>

            </div>

        </section>


        <!-- RETURN POLICY -->

        <div class="se-return-policy">

            <div>

                <span>
                    ↩️
                </span>

                <div>

                    <strong>
                        10-Day Return & Refund
                    </strong>

                    <small>
                        Eligible products can be returned
                        within the applicable return window.
                    </small>

                </div>

            </div>

            <button
                type="button"
                onclick="
                    showInfo('returns')
                "
            >
                View Policy
            </button>

        </div>


        <!-- CHECKOUT -->

        <div class="se-cart-checkout">

            <button
                type="button"
                class="se-proceed-btn"
                onclick="proceedToPayment()"
            >
                Proceed to Buy
                <span>
                    (${money(payable)})
                </span>
            </button>


            <button
                type="button"
                class="se-continue-btn"
                onclick="closeCart()"
            >
                Continue Shopping
            </button>

        </div>


        <!-- TRUST -->

        <div class="se-cart-trust">

            <div>
                <span>🚚</span>
                <strong>
                    Safe & Secure
                </strong>
                <small>
                    Payments
                </small>
            </div>

            <div>
                <span>🛡️</span>
                <strong>
                    Easy Returns
                </strong>
                <small>
                    & Refunds
                </small>
            </div>

            <div>
                <span>☎️</span>
                <strong>
                    24/7 Support
                </strong>
                <small>
                    Customer Care
                </small>
            </div>

        </div>

    `;
    const couponBox =
        Array.from(
            wrapper.querySelectorAll(
                ".se-cart-expandable"
            )
        ).find(
            element =>
                element.querySelector(
                    ".se-cart-coupon"
                )
        );

    const cartItemsSection =
        wrapper.querySelector(
            ".se-cart-items-section"
        );

    if (
        couponBox &&
        cartItemsSection
    ) {
        wrapper.insertBefore(
            couponBox,
            cartItemsSection
        );
    }
}

/* =========================================================
   CART QUANTITY
========================================================= */

function changeCartQuantity(
    index,
    change
) {

    const cart =
        getCart();


    if (!cart[index]) {
        return;
    }


    cart[index].quantity +=
        change;


    if (
        cart[index].quantity <= 0
    ) {

        cart.splice(
            index,
            1
        );

    }


    saveCart(
        cart
    );


    renderCart();

}


function removeCartItem(
    index
) {

    const cart =
        getCart();


    cart.splice(
        index,
        1
    );


    saveCart(
        cart
    );


    renderCart();


    showToast(
        "Product removed from cart."
    );

}


/* =========================================================
   WISHLIST
========================================================= */

function getWishlist() {

    try {

        return (
            JSON.parse(
                localStorage.getItem(
                    "shopEaseWishlist"
                )
            ) || []
        );

    }

    catch {

        return [];

    }

}


function saveWishlist(
    wishlist
) {

    localStorage.setItem(
        "shopEaseWishlist",
        JSON.stringify(
            wishlist
        )
    );

}


function toggleWishlist(
    id,
    silent = false
) {

    let wishlist =
        getWishlist();


    if (
        wishlist.includes(id)
    ) {

        wishlist =
            wishlist.filter(
                item =>
                    item !== id
            );


        if (!silent) {

            showToast(
                "Removed from wishlist."
            );

        }

    }

    else {

        wishlist.push(
            id
        );


        if (!silent) {

            showToast(
                "Added to wishlist."
            );

        }

    }


    saveWishlist(
        wishlist
    );


    if (
        !new URLSearchParams(
            window.location.search
        ).get("product")
    ) {

        renderProducts();

    }

}


function showWishlist() {
    renderWishlistItems();
    const modal = document.getElementById("wishlistModal");
    if (modal) {
        modal.classList.add("open");
    }
}

function renderWishlistItems() {
    const container = document.getElementById("wishlistItemsList");
    if (!container) return;
    const wishlistIds = getWishlist();

    if (!wishlistIds.length) {
        container.innerHTML = `
            <div class="wishlist-empty-state">
                <div class="wishlist-empty-icon">
                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </div>
                <h3>Your Wishlist is Empty</h3>
                <p>Save items you love here to easily review and move them to your bag later.</p>
                <button class="btn btn-primary" onclick="closeModal('wishlistModal'); scrollToProducts();">
                    Start Shopping
                </button>
            </div>
        `;
        return;
    }

    const items = wishlistIds.map(id => {
        return products.find(p => p.id === id);
    }).filter(Boolean);

    if (!items.length) {
        container.innerHTML = `<p class="empty-state-text">No saved products found.</p>`;
        return;
    }

    container.innerHTML = items.map(product => `
        <div class="wishlist-item-card">
            <img src="${product.image}" alt="${escapeHTML(product.name)}" class="wishlist-item-thumb" onclick="closeModal('wishlistModal'); openProductPage('${product.id}');">
            <div class="wishlist-item-info">
                <h4 class="wishlist-item-title" onclick="closeModal('wishlistModal'); openProductPage('${product.id}');">${escapeHTML(product.name)}</h4>
                <div class="wishlist-item-meta">
                    <span class="wishlist-item-category">${escapeHTML(product.category)}</span>
                    <span class="wishlist-item-rating">★ ${product.rating || '4.5'}</span>
                </div>
                <div class="wishlist-item-price">
                    <strong>${money(product.price)}</strong>
                    ${product.originalPrice ? `<span class="original-price">${money(product.originalPrice)}</span>` : ''}
                </div>
            </div>
            <div class="wishlist-item-actions">
                <button class="btn btn-primary btn-sm" onclick="moveWishlistToCart('${product.id}')" title="Move to Cart">
                    Move to Cart
                </button>
                <button class="btn btn-outline btn-sm btn-icon" onclick="removeFromWishlistAndRerender('${product.id}')" title="Remove from wishlist" aria-label="Remove">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
            </div>
        </div>
    `).join('');
}

function moveWishlistToCart(productId) {
    addToCart(productId);
    removeFromWishlistAndRerender(productId);
    showToast("Moved item to cart!");
}

function removeFromWishlistAndRerender(productId) {
    let wishlist = getWishlist();
    wishlist = wishlist.filter(id => id !== productId);
    saveWishlist(wishlist);
    renderWishlistItems();
    renderProducts();
    updateDetailWishlistButton();
    showToast("Item removed from wishlist.");
}

/* =========================================================
   SIZE GUIDE
========================================================= */

function showSizeGuide() {

    document
        .getElementById(
            "sizeGuideModal"
        )
        .classList.add(
            "open"
        );

}


/* =========================================================
   INFORMATION
========================================================= */

function submitSupportTicket(e) {
    if (e) e.preventDefault();
    const name = document.getElementById("supportTicketName")?.value.trim();
    const email = document.getElementById("supportTicketEmail")?.value.trim();
    const message = document.getElementById("supportTicketMsg")?.value.trim();
    if (!name || !email || !message) {
        showToast("Please fill in your name, email, and message.");
        return;
    }
    closeModal("infoModal");
    showToast("Thank you, " + name + "! Your ticket has been logged. Response ETA: < 2 hours.");
}

function showInfo(type) {
    if (type === "about") {
        closeModal("infoModal");
        scrollToAbout();
        return;
    }
    if (type === "faq") {
        closeModal("infoModal");
        scrollToFaq();
        return;
    }

    const information = {
        account: ["ACCOUNT", "Your ShopEase Account"],
        orders: ["ORDERS", "Track Your Orders"],
        contact: ["CUSTOMER SERVICE", "Contact & Support"],
        returns: ["RETURNS", "10-Day Return & Exchange Policy"],
        delivery: ["DELIVERY", "Shipping & Fulfillment Information"],
        privacy: ["PRIVACY", "Privacy & Security Policy"],
        terms: ["LEGAL", "Terms & Conditions of Service"],
        security: ["SECURITY", "Secure Shopping Guarantee"],
        supercash: ["SUPERCASH", "SuperCash Rewards Program"],
        loyalty: ["LOYALTY", "Loyalty Points & Benefits"],
        gst: ["GST", "GST Business Invoice"],
        gifts: ["FREE GIFTS", "Promotional Free Gifts"],
        convenience: ["ORDER FEE", "Standard Handling & Convenience Fee"]
    };

    const meta = information[type] || ["INFORMATION", "Information"];
    setText("infoModalKicker", meta[0]);
    setText("infoModalTitle", meta[1]);

    const infoModalBody = document.getElementById("infoModalBody");
    const infoModal = document.getElementById("infoModal");

    if (type === "account") {
        const user = getCurrentUser();
        if (!user) {
            infoModalBody.innerHTML = `
                <div class="account-guest-card">
                    <div class="account-guest-icon">🔐</div>
                    <h3>Sign In to Your ShopEase Account</h3>
                    <p>Access your orders, saved wishlist, ₹500 welcome SuperCash, and personalized delivery preferences.</p>
                    <div class="account-guest-buttons">
                        <button class="btn btn-primary" onclick="closeModal('infoModal'); showAuthPage('signin');">
                            Sign In / Create Account
                        </button>
                        <button class="btn btn-outline" onclick="closeModal('infoModal'); quickDemoLogin();">
                            ⚡ 1-Click Demo Login
                        </button>
                    </div>
                </div>
            `;
        } else {
            const savedPin = localStorage.getItem("shopease_delivery_pincode") || "700001";
            const savedCity = localStorage.getItem("shopease_delivery_city") || "Kolkata Hub";
            const cart = getCart();
            const wishlist = getWishlist();
            const orders = JSON.parse(localStorage.getItem("shopEaseOrders")) || [];
            const initials = user.name ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2) : "SE";

            infoModalBody.innerHTML = `
                <div class="account-dashboard">
                    <div class="account-profile-header">
                        <div class="account-avatar">${escapeHTML(initials)}</div>
                        <div class="account-profile-meta">
                            <h3>${escapeHTML(user.name)}</h3>
                            <p>${escapeHTML(user.email)}</p>
                            <span class="account-badge-gold">★ ${escapeHTML(user.tier || "VIP Gold Member")}</span>
                        </div>
                        <button class="btn btn-outline btn-xs btn-sign-out" onclick="signOutUser()" title="Sign out of account">
                            Sign Out
                        </button>
                    </div>

                    <div class="account-metrics-grid">
                        <div class="account-metric-card">
                            <span class="metric-label">SuperCash Balance</span>
                            <strong class="metric-value">₹${user.superCash || 500}.00</strong>
                            <small>Auto-redeemable at checkout</small>
                        </div>
                        <div class="account-metric-card">
                            <span class="metric-label">Saved Delivery Hub</span>
                            <strong class="metric-value">${escapeHTML(savedCity)} (${savedPin})</strong>
                            <button class="btn btn-outline btn-xs" onclick="closeModal('infoModal'); promptDeliveryLocation();">Change PIN</button>
                        </div>
                        <div class="account-metric-card">
                            <span class="metric-label">Shopping Activity</span>
                            <div class="metric-tags">
                                <span>${cart.length} in Cart</span>
                                <span>${wishlist.length} in Wishlist</span>
                                <span>${orders.length} Orders</span>
                            </div>
                        </div>
                    </div>

                    <div class="account-actions-list">
                        <button class="account-action-btn" onclick="showInfo('orders')">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                            <span>View Order History</span>
                            <small>→</small>
                        </button>
                        <button class="account-action-btn" onclick="closeModal('infoModal'); showWishlist();">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                            <span>Manage Saved Wishlist</span>
                            <small>→</small>
                        </button>
                        <button class="account-action-btn" onclick="closeModal('infoModal'); promptDeliveryLocation();">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            <span>Set Default Delivery Pincode</span>
                            <small>→</small>
                        </button>
                    </div>
                </div>
            `;
        }
    } else if (type === "orders") {
        const orders = JSON.parse(localStorage.getItem("shopEaseOrders")) || [];
        if (!orders.length) {
            infoModalBody.innerHTML = `
                <div class="orders-empty-state">
                    <div class="orders-empty-icon">📦</div>
                    <h3>No orders yet</h3>
                    <p>Your completed ShopEase orders will appear here.</p>
                    <button class="btn btn-primary" onclick="closeModal('infoModal'); scrollToProducts();" style="margin-top: 14px;">
                        Explore Products
                    </button>
                </div>
            `;
        } else {
            infoModalBody.innerHTML = `
                <div class="orders-list">
                    ${orders.map(order => {
                const orderDate = new Date(order.date);
                const formattedDate = orderDate.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                });
                const paymentMethod = order.paymentMethod === "upi"
                    ? "UPI"
                    : order.paymentMethod === "card"
                        ? "Credit / Debit Card"
                        : order.paymentMethod === "netbanking"
                            ? "Net Banking"
                            : "Cash on Delivery";
                const items = Array.isArray(order.items) ? order.items : [];

                return `
                            <article class="order-history-card">
                                <div class="order-history-header">
                                    <div>
                                        <span>ORDER ID</span>
                                        <strong>${escapeHTML(order.orderId)}</strong>
                                    </div>
                                    <span class="order-status">${escapeHTML(order.status || "Order Placed")}</span>
                                </div>
                                <div class="order-history-meta">
                                    <span>📅 ${formattedDate}</span>
                                    <span>💳 ${paymentMethod}</span>
                                    <strong>${escapeHTML(order.total || "₹0")}</strong>
                                </div>
                                <div class="order-history-items">
                                    ${items.map(item => {
                    const product = item.product || products.find(p => p.id === item.id);
                    if (!product) return "";
                    return `
                                            <div class="order-history-item">
                                                <img src="${product.image}" alt="${escapeHTML(product.name)}">
                                                <div>
                                                    <strong>${escapeHTML(product.name)}</strong>
                                                    <span>Qty: ${item.quantity}${item.size ? ` · Size: ${escapeHTML(item.size)}` : ""}</span>
                                                </div>
                                            </div>
                                        `;
                }).join("")}
                                </div>
                                <div class="order-history-footer">
                                    <span>✓ Verified order placed</span>
                                    <strong>Delivery: 3–5 business days</strong>
                                </div>
                            </article>
                        `;
            }).join("")}
                </div>
            `;
        }
    } else if (type === "contact") {
        infoModalBody.innerHTML = `
            <div class="contact-support-container">
                <div class="support-contact-cards">
                    <div class="support-card">
                        <div class="support-card-icon">📞</div>
                        <strong>Toll-Free Helpline</strong>
                        <p>1800-123-EASE</p>
                        <small>9:00 AM – 9:00 PM (All 7 Days)</small>
                    </div>
                    <div class="support-card">
                        <div class="support-card-icon">✉️</div>
                        <strong>Email Support</strong>
                        <p>support@shopease.in</p>
                        <small>Avg. response under 2 hours</small>
                    </div>
                    <div class="support-card">
                        <div class="support-card-icon">⚡</div>
                        <strong>Live WhatsApp</strong>
                        <p>+91 98765 43210</p>
                        <small>Instant automated bot & agent</small>
                    </div>
                </div>

                <div class="support-form-box">
                    <h4>Send Us a Direct Message</h4>
                    <form onsubmit="submitSupportTicket(event)">
                        <div class="form-row-2">
                            <input type="text" id="supportTicketName" placeholder="Your Name *" required>
                            <input type="email" id="supportTicketEmail" placeholder="Your Email Address *" required>
                        </div>
                        <input type="text" id="supportTicketSubject" placeholder="Order ID or Subject (Optional)">
                        <textarea id="supportTicketMsg" rows="3" placeholder="How can our support team assist you today? *" required></textarea>
                        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px;">Send Support Message</button>
                    </form>
                </div>
            </div>
        `;
    } else if (type === "returns") {
        infoModalBody.innerHTML = `
            <div class="policy-modal-content">
                <p class="policy-lead">Enjoy zero-risk shopping with ShopEase's hassle-free 10-day return and exchange policy.</p>
                <div class="return-steps-grid">
                    <div class="step-card">
                        <span class="step-num">01</span>
                        <strong>Request Return</strong>
                        <p>Click Track Orders and initiate return within 10 days of delivery.</p>
                    </div>
                    <div class="step-card">
                        <span class="step-num">02</span>
                        <strong>Doorstep Pickup</strong>
                        <p>Our courier picks up the original packaged item at zero cost.</p>
                    </div>
                    <div class="step-card">
                        <span class="step-num">03</span>
                        <strong>Instant Check</strong>
                        <p>Pickup executive verifies the tags and product condition.</p>
                    </div>
                    <div class="step-card">
                        <span class="step-num">04</span>
                        <strong>Fast Refund</strong>
                        <p>Refund is initiated immediately to original payment source or UPI.</p>
                    </div>
                </div>
                <div class="policy-highlights">
                    <p>✓ <strong>100% Free Pickups</strong>: No deduction or reverse logistics charge.</p>
                    <p>✓ <strong>Exchange Option</strong>: Instant size exchange available for fashion and footwear.</p>
                    <p>✓ <strong>Pre-authenticated</strong>: Electronics covered by standard brand warranty.</p>
                </div>
            </div>
        `;
    } else if (type === "delivery") {
        const savedPin = localStorage.getItem("shopease_delivery_pincode") || "700001";
        infoModalBody.innerHTML = `
            <div class="policy-modal-content">
                <p class="policy-lead">ShopEase operates direct fulfillment hubs across India for speedy, tamper-proof deliveries.</p>
                <div class="delivery-perks-list">
                    <div class="perk-row">
                        <strong>⚡ Free Standard Delivery</strong>
                        <span>Available on all orders of ₹2,500 and above (₹79 flat fee below ₹2,500).</span>
                    </div>
                    <div class="perk-row">
                        <strong>⏱ 3–5 Business Days</strong>
                        <span>Metro and Tier-1 city orders arrive within 72–96 hours from dispatch.</span>
                    </div>
                    <div class="perk-row">
                        <strong>📦 Trusted Logistics</strong>
                        <span>Shipped via BlueDart, Delhivery, Shadowfax, and Xpressbees with live SMS updates.</span>
                    </div>
                    <div class="perk-row">
                        <strong>📍 Current PIN: ${savedPin}</strong>
                        <span><button class="btn btn-outline btn-xs" onclick="closeModal('infoModal'); promptDeliveryLocation();">Change PIN</button></span>
                    </div>
                </div>
            </div>
        `;
    } else if (type === "privacy") {
        infoModalBody.innerHTML = `
            <div class="policy-modal-content">
                <h4>1. Data Protection Commitment</h4>
                <p>We respect your privacy. All user contact info, delivery addresses, and session tokens are strictly encrypted using 256-bit SSL encryption. We never sell or rent your personal information to third parties.</p>
                <h4>2. Payment Security</h4>
                <p>Card and UPI details are processed through PCI-DSS Level 1 certified gateways. ShopEase never stores your CVV or net banking credentials.</p>
                <h4>3. Your Rights</h4>
                <p>You can request data export or deletion of your profile history anytime by contacting support@shopease.in.</p>
            </div>
        `;
    } else if (type === "terms") {
        infoModalBody.innerHTML = `
            <div class="policy-modal-content">
                <h4>1. Orders & Pricing</h4>
                <p>All prices listed on ShopEase are inclusive of applicable GST taxes. Orders are confirmed upon successful checkout validation and stock allocation.</p>
                <h4>2. Promotions & Coupons</h4>
                <p>Promotions such as coupon SHOP10 apply to eligible baskets of ₹1,000+ with a maximum discount cap of ₹500. One coupon per order.</p>
                <h4>3. Delivery & Fulfillment</h4>
                <p>Delivery timelines are estimates subject to regional transport conditions and public holidays.</p>
            </div>
        `;
    } else {
        const fallbackText = {
            security: "ShopEase employs bank-grade 256-bit encryption, verified payment gateways, and end-to-end tokenization to ensure every rupee and data packet is fully protected.",
            supercash: "SuperCash is credited to your wallet upon successful delivery of qualifying products. Use it to discount up to 20% on subsequent shopping orders.",
            loyalty: "Earn 1 loyalty point for every ₹10 spent. Redeem points for exclusive discounts, priority dispatch, and limited-edition merchandise.",
            gst: "Enter your registered 15-digit GSTIN during checkout to generate an official tax invoice with input tax credit eligibility.",
            gifts: "Orders crossing ₹5,000 automatically receive complimentary lifestyle gifts worth up to ₹1,500.",
            convenience: "A nominal operational handling charge ensures secure packaging, doorstep delivery tracking, and tamper-evident sealing."
        }[type] || "ShopEase is designed for curated lifestyle shopping with honest pricing and premium customer care.";

        infoModalBody.innerHTML = `<p class="policy-lead">${escapeHTML(fallbackText)}</p>`;
    }

    infoModal.classList.toggle("orders-modal", type === "orders" || type === "account");
    infoModal.classList.add("open");
}

/* =========================================================
   MODAL
========================================================= */

function closeModal(
    id
) {

    document
        .getElementById(id)
        ?.classList.remove(
            "open"
        );

}


/* =========================================================
   NEWSLETTER
========================================================= */

async function subscribeNewsletter(event) {
    if (event && event.preventDefault) {
        event.preventDefault();
    }

    const emailInput = document.getElementById("newsletterEmail");
    const email = emailInput?.value?.trim() || "";

    if (!email) {
        showToast("Please enter your email address.");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/newsletter`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            showToast(data.message || "Thank you for subscribing to ShopEase updates!");
            if (event.target && event.target.reset) event.target.reset();
        } else {
            showToast(data.message || "Could not subscribe. Please try again.");
        }
    } catch (err) {
        // Fallback friendly response if offline
        console.warn("Newsletter request error:", err);
        showToast("Thank you for subscribing! Your email has been registered.");
        if (event.target && event.target.reset) event.target.reset();
    }
}


/* =========================================================
   COUPON
========================================================= */

function applyCoupon() {

    showToast(
        "Coupon SHOP10 can be applied at checkout."
    );

}

/* =========================================================
   CHECKOUT
========================================================= */

function openCheckout() {

    const overlay =
        document.getElementById(
            "checkoutOverlay"
        );

    if (!overlay) {
        showToast(
            "Checkout is not available."
        );
        return;
    }

    renderCheckout();
    prefillCheckoutAddress();

    closeCart();

    overlay.classList.add(
        "open"
    );

}


function closeCheckout() {

    const overlay =
        document.getElementById(
            "checkoutOverlay"
        );

    if (overlay) {

        overlay.classList.remove(
            "open"
        );

    }

}


function renderCheckout() {

    const cart =
        getCart();

    const itemsContainer =
        document.getElementById(
            "checkoutItems"
        );

    const itemCount =
        document.getElementById(
            "checkoutItemCount"
        );

    const totalElement =
        document.getElementById(
            "checkoutTotal"
        );


    if (!cart.length) {

        closeCheckout();

        showToast(
            "Your cart is empty."
        );

        return;

    }


    let bagTotal = 0;

    let coupon = 0;

    let delivery = 0;

    let convenienceFee = 0;

    let platformFee = 0;


    const checkoutItems =
        cart
            .map(
                item => {

                    const product =
                        item.product ||
                        products.find(
                            p =>
                                p.id ===
                                item.id
                        );


                    if (!product) {
                        return "";
                    }


                    const itemTotal =
                        product.price *
                        item.quantity;


                    bagTotal +=
                        itemTotal;


                    return `

                        <div
                            class="checkout-item"
                        >

                            <img
                                src="${product.image}"
                                alt="${escapeHTML(product.name)}"
                            >

                            <div
                                class="checkout-item-info"
                            >

                                <strong>
                                    ${escapeHTML(
                        product.name
                    )}
                                </strong>

                                <span>
                                    Qty: ${item.quantity}
                                </span>

                            </div>

                            <div
                                class="checkout-item-price"
                            >
                                ${money(itemTotal)}
                            </div>

                        </div>

                    `;

                }
            )
            .join("");


    /*
        Same coupon rule used by the cart
    */

    coupon =
        bagTotal >= 1000
            ? Math.min(
                Math.round(
                    bagTotal * 0.10
                ),
                500
            )
            : 0;


    /*
        Same delivery rule used by the cart
    */

    delivery =
        bagTotal >= 2500
            ? 0
            : 79;

    convenienceFee = 29;
    platformFee = 22;


    const payable =
        bagTotal -
        coupon +
        delivery +
        convenienceFee +
        platformFee;


    if (itemsContainer) {

        itemsContainer.innerHTML =
            checkoutItems;

    }


    if (itemCount) {

        const totalItems =
            cart.reduce(
                (
                    total,
                    item
                ) =>
                    total +
                    item.quantity,
                0
            );

        itemCount.textContent =
            `${totalItems} ${totalItems === 1
                ? "item"
                : "items"
            }`;

    }


    if (totalElement) {

        totalElement.textContent =
            money(payable);

    }

}


function proceedToPayment() {

    openCheckout();

}


function prefillCheckoutAddress() {
    try {
        const saved = JSON.parse(localStorage.getItem("shopease_shipping_address") || "{}");
        if (saved.name && document.getElementById("checkoutName")) document.getElementById("checkoutName").value = saved.name;
        if (saved.phone && document.getElementById("checkoutPhone")) document.getElementById("checkoutPhone").value = saved.phone;
        if (saved.addressLine && document.getElementById("checkoutAddress")) document.getElementById("checkoutAddress").value = saved.addressLine;
        if (saved.city && document.getElementById("checkoutCity")) document.getElementById("checkoutCity").value = saved.city;
        if (saved.state && document.getElementById("checkoutState")) document.getElementById("checkoutState").value = saved.state;
        if (saved.pincode && document.getElementById("checkoutPincode")) {
            document.getElementById("checkoutPincode").value = saved.pincode;
        } else if (document.getElementById("checkoutPincode")) {
            const headerPin = localStorage.getItem("shopease_delivery_pincode") || "700001";
            document.getElementById("checkoutPincode").value = headerPin;
        }
    } catch (e) {
        console.warn("Could not prefill address:", e);
    }
}

async function continueToPayment() {
    const cart = getCart();

    if (!cart.length) {
        showToast("Your cart is empty.");
        closeCheckout();
        return;
    }

    // 1. Validate Delivery Address
    const name = document.getElementById("checkoutName")?.value.trim() || "";
    const phone = document.getElementById("checkoutPhone")?.value.trim() || "";
    const addressLine = document.getElementById("checkoutAddress")?.value.trim() || "";
    const city = document.getElementById("checkoutCity")?.value.trim() || "";
    const state = document.getElementById("checkoutState")?.value.trim() || "";
    const pincode = document.getElementById("checkoutPincode")?.value.trim() || "";

    if (!name) {
        showToast("Please enter your full name.");
        document.getElementById("checkoutName")?.focus();
        return;
    }
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
        showToast("Please enter a valid 10-digit mobile number.");
        document.getElementById("checkoutPhone")?.focus();
        return;
    }
    if (!addressLine) {
        showToast("Please enter your street / building address.");
        document.getElementById("checkoutAddress")?.focus();
        return;
    }
    if (!city) {
        showToast("Please enter your city.");
        document.getElementById("checkoutCity")?.focus();
        return;
    }
    if (!state) {
        showToast("Please enter your state.");
        document.getElementById("checkoutState")?.focus();
        return;
    }
    const cleanPin = pincode.replace(/\D/g, "");
    if (cleanPin.length !== 6) {
        showToast("Please enter a valid 6-digit PIN code.");
        document.getElementById("checkoutPincode")?.focus();
        return;
    }

    const deliveryAddress = {
        name,
        phone: cleanPhone,
        addressLine,
        city,
        state,
        pincode: cleanPin
    };

    localStorage.setItem("shopease_shipping_address", JSON.stringify(deliveryAddress));
    localStorage.setItem("shopease_delivery_pincode", cleanPin);
    initDeliveryLocation();

    // 2. Payment Method
    const selectedMethodInput = document.querySelector('input[name="paymentMethod"]:checked');
    const paymentMethod = selectedMethodInput ? selectedMethodInput.value : "cod";

    const continueBtn = document.querySelector(".checkout-continue-btn");
    const originalBtnText = continueBtn ? continueBtn.textContent : "Place Order";
    if (continueBtn) {
        continueBtn.disabled = true;
        continueBtn.textContent = "Processing Order...";
    }

    try {
        const orderPayload = {
            items: cart.map(item => ({
                id: item.id,
                quantity: item.quantity,
                size: item.size || ""
            })),
            couponCode: "SHOP10",
            paymentMethod,
            deliveryAddress
        };

        if (paymentMethod === "cod") {
            const response = await fetch(`${API_BASE_URL}/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderPayload)
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || "Failed to process order.");
            }

            finalizeOrderSuccess(result.data);

        } else {
            // Online payment via Razorpay / Test simulation
            const rzpRes = await fetch(`${API_BASE_URL}/orders/razorpay/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderPayload)
            });

            const rzpInit = await rzpRes.json();

            if (!rzpRes.ok || !rzpInit.success) {
                throw new Error(rzpInit.message || "Payment initiation failed.");
            }

            if (!rzpInit.isTestMode && window.Razorpay && rzpInit.razorpayOrderId) {
                const rzp = new window.Razorpay({
                    key: rzpInit.keyId,
                    amount: rzpInit.amount,
                    currency: rzpInit.currency,
                    name: "ShopEase Retail",
                    description: `Order ${rzpInit.localOrderId}`,
                    order_id: rzpInit.razorpayOrderId,
                    prefill: {
                        name: deliveryAddress.name,
                        contact: deliveryAddress.phone
                    },
                    theme: { color: "#131921" },
                    handler: async function (paymentResponse) {
                        try {
                            const verifyRes = await fetch(`${API_BASE_URL}/orders/razorpay/verify`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    ...orderPayload,
                                    razorpay_order_id: paymentResponse.razorpay_order_id,
                                    razorpay_payment_id: paymentResponse.razorpay_payment_id,
                                    razorpay_signature: paymentResponse.razorpay_signature
                                })
                            });
                            const verifyResult = await verifyRes.json();
                            if (verifyResult.success) {
                                finalizeOrderSuccess(verifyResult.data);
                            } else {
                                showToast(verifyResult.message || "Payment verification failed.");
                            }
                        } catch (err) {
                            showToast("Verification failed. Please contact support.");
                        }
                    }
                });
                rzp.open();
                return;
            }

            // Simulated test payment verification
            const verifyRes = await fetch(`${API_BASE_URL}/orders/razorpay/verify`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...orderPayload,
                    razorpay_order_id: rzpInit.razorpayOrderId,
                    razorpay_payment_id: "pay_simulated_" + Date.now().toString(36),
                    razorpay_signature: "sig_simulated"
                })
            });

            const verifyResult = await verifyRes.json();
            if (!verifyRes.ok || !verifyResult.success) {
                throw new Error(verifyResult.message || "Payment verification failed.");
            }

            showToast("Test Payment Simulated Successfully!");
            finalizeOrderSuccess(verifyResult.data);
        }
    } catch (err) {
        console.error("Order processing error:", err);
        showToast(err.message || "Unable to place order. Please try again.");
    } finally {
        if (continueBtn) {
            continueBtn.disabled = false;
            continueBtn.textContent = originalBtnText;
        }
    }
}

function finalizeOrderSuccess(orderData) {
    localStorage.removeItem("shopEaseCart");
    updateCartCount();

    const orders = JSON.parse(localStorage.getItem("shopease_orders") || "[]");
    orders.unshift(orderData);
    localStorage.setItem("shopease_orders", JSON.stringify(orders));
    localStorage.setItem("shopEaseOrders", JSON.stringify(orders));

    closeCheckout();

    const orderIdElement = document.getElementById("confirmationOrderId");
    const orderTotalElement = document.getElementById("confirmationOrderTotal");

    if (orderIdElement) orderIdElement.textContent = orderData.orderId;
    if (orderTotalElement) orderTotalElement.textContent = money(orderData.totals?.totalPayable || 0);

    const confirmationOverlay = document.getElementById("orderConfirmationOverlay");
    if (confirmationOverlay) {
        confirmationOverlay.classList.add("open");
    }

    showToast(`Order ${orderData.orderId} placed successfully!`);
}


/* =========================================================
   SCROLL
========================================================= */

function scrollToProducts() {
    showHomePage();
    setTimeout(() => {
        const target = document.getElementById("productsSection");
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    }, 60);
}

function scrollToDeals() {
    showHomePage();
    setTimeout(() => {
        const target = document.getElementById("dealsSection");
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    }, 60);
}

function scrollToAbout() {
    showHomePage();
    setTimeout(() => {
        const target = document.getElementById("aboutSection");
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    }, 60);
}

function scrollToFaq() {
    showHomePage();
    setTimeout(() => {
        const target = document.getElementById("faqSection");
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    }, 60);
}

function toggleFaq(itemElement) {
    if (!itemElement) return;
    const wasOpen = itemElement.classList.contains("open");
    document.querySelectorAll(".faq-accordion-item").forEach(item => {
        item.classList.remove("open");
    });
    if (!wasOpen) {
        itemElement.classList.add("open");
    }
}

/* =========================================================
   TOAST
========================================================= */

function showToast(
    message
) {

    const toast =
        document.getElementById(
            "toast"
        );


    document.getElementById(
        "toastMessage"
    ).textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        window.toastTimer
    );


    window.toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2400
        );

}


/* =========================================================
   HELPERS
========================================================= */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(
            id
        );


    if (element) {

        element.textContent =
            value;

    }

}


function money(
    value
) {

    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }
    ).format(
        value
    );

}


function formatDate(
    date
) {

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}


function escapeHTML(
    value
) {

    return String(value)
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );

}
/* =========================================================
   PAYMENT METHOD SELECTION
========================================================= */

document.addEventListener(
    "change",
    function (event) {

        if (
            event.target.name !==
            "paymentMethod"
        ) {
            return;
        }


        const paymentMethods =
            document.querySelectorAll(
                ".payment-method"
            );


        paymentMethods.forEach(
            method => {

                const radio =
                    method.querySelector(
                        ("input[name='paymentMethod']")
                    );

                method.classList.toggle(
                    "active",
                    radio &&
                    radio.checked
                );

            }
        );

    }
);
/* =========================================================
   SHOP EASE — ORDER CONFIRMATION ACTIONS
========================================================= */

function closeOrderConfirmation() {

    const confirmationOverlay =
        document.getElementById(
            "orderConfirmationOverlay"
        );

    if (confirmationOverlay) {

        confirmationOverlay.classList.remove(
            "open"
        );

    }

}