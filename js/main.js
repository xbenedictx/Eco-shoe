// ================== PRODUCTS (Shared with Admin) ==================
let products = JSON.parse(localStorage.getItem('products')) || [
    { 
        id: 1, 
        name: "Manila Runner", 
        price: 1299, 
        image: "images/shoe1.png",    
        category: "sneakers" 
    },
    { 
        id: 2, 
        name: "Baguio Trail Boot", 
        price: 2499, 
        image: "images/shoe2.png",    
        category: "boots" 
    },
    { 
        id: 3, 
        name: "Commonwealth Canvas", 
        price: 899, 
        image: "images/shoe3.png" 
    },
    { 
        id: 4, 
        name: "Fiesta Flats", 
        price: 799, 
        image: "images/shoe4.png",    
        category: "casual" 
    },
    { 
        id: 5, 
        name: "Cebu Slide", 
        price: 649, 
        image: "images/shoe5.png",    
        category: "sandals" 
    },
    { 
        id: 6, 
        name: "Palawan Trekker", 
        price: 2899, 
        image: "images/shoe6.png",    
        category: "boots" 
    },
];

let cart = [];

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const cartCountEl = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');

// ================== RENDER PRODUCTS ==================
function renderProducts() {
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card bg-white border rounded-3xl overflow-hidden transition-all hover:shadow-xl';
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" 
                 class="w-full h-64 object-cover">
            <div class="p-5">
                <h4 class="font-semibold text-lg leading-tight">${product.name}</h4>
                <p class="text-yellow-600 font-bold mt-2 text-xl">₱${product.price.toLocaleString()}</p>
                
                <button onclick="addToCart(${product.id})" 
                        class="mt-5 w-full bg-yellow-400 hover:bg-yellow-300 py-3.5 rounded-2xl font-medium transition-colors">
                    Add to Cart
                </button>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// ================== CART FUNCTIONS ==================
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    cart.push({ ...product });
    updateCartCount();
    
    // Optional: Show a nice toast instead of alert
    showToast(`${product.name} added to cart!`);
}

function updateCartCount() {
    if (cartCountEl) {
        cartCountEl.textContent = cart.length;
    }
}

function toggleCart() {
    if (!cartModal) return;
    
    if (cartModal.classList.contains('hidden')) {
        cartModal.classList.remove('hidden');
        cartModal.classList.add('flex');
        renderCartItems();
    } else {
        cartModal.classList.add('hidden');
        cartModal.classList.remove('flex');
    }
}

function renderCartItems() {
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <p class="text-center py-12 text-zinc-400 text-lg">
                Your cart is empty
            </p>`;
        return;
    }
    
    let total = 0;
    
    cart.forEach((item, index) => {
        total += item.price;
        
        const div = document.createElement('div');
        div.className = 'flex gap-4 mb-6 items-center border-b pb-6 last:border-none last:pb-0';
        div.innerHTML = `
            <img src="${item.image}" class="w-20 h-20 object-cover rounded-2xl flex-shrink-0">
            <div class="flex-1 min-w-0">
                <p class="font-medium truncate">${item.name}</p>
                <p class="text-yellow-600 font-semibold">₱${item.price.toLocaleString()}</p>
            </div>
            <button onclick="removeFromCart(${index})" 
                    class="text-red-500 hover:text-red-700 p-2">
                <i class="fa-solid fa-trash-can text-xl"></i>
            </button>
        `;
        cartItemsContainer.appendChild(div);
    });
    
    // Total
    const totalDiv = document.createElement('div');
    totalDiv.className = 'pt-4 border-t font-bold text-lg flex justify-between';
    totalDiv.innerHTML = `
        <span>Total:</span>
        <span class="text-yellow-600">₱${total.toLocaleString()}</span>
    `;
    cartItemsContainer.appendChild(totalDiv);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    renderCartItems();
}

function checkout() {
    if (cart.length === 0) return;
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    alert(`✅ Thank you for your order!\n\nTotal Amount: ₱${total.toLocaleString()}\n\n(This is a demo website - no real payment was processed)`);
    
    cart = [];
    updateCartCount();
    toggleCart();
}

// ================== MOBILE MENU ==================
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// ================== AUTHENTICATION & USER UI ==================
function updateUserUI() {
    const userSection = document.getElementById('user-section');
    if (!userSection) return;

    const role = localStorage.getItem('userRole');
    const username = localStorage.getItem('username') || 'Guest';

    if (role) {
        let adminButton = '';
        if (role === 'admin') {
            adminButton = `
                <a href="admin.html" 
                   class="bg-zinc-800 hover:bg-black text-white px-5 py-2.5 rounded-3xl text-sm font-medium transition-all">
                    ⚙️ Admin Panel
                </a>`;
        }

        userSection.innerHTML = `
            <div class="flex items-center gap-x-3">
                ${adminButton}
                <div class="hidden sm:block text-right">
                    <p class="text-sm font-medium">${username}</p>
                    <p class="text-[10px] uppercase tracking-widest text-zinc-500">${role}</p>
                </div>
                <button onclick="logout()" 
                        class="flex items-center gap-2 bg-zinc-100 hover:bg-red-50 hover:text-red-600 text-zinc-700 px-5 py-2.5 rounded-3xl text-sm font-medium transition-all">
                    <i class="fa-solid fa-right-from-bracket"></i>
                    <span class="hidden sm:inline">Logout</span>
                </button>
            </div>
        `;
    } else {
        userSection.innerHTML = `
            <a href="login.html" 
               class="bg-yellow-500 hover:bg-yellow-400 text-zinc-900 font-semibold px-7 py-3 rounded-3xl text-sm transition-all">
                Login
            </a>
        `;
    }
}

function logout() {
    if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem('userRole');
        localStorage.removeItem('username');
        window.location.href = 'login.html';
    }
}

// Simple Toast Notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 bg-zinc-800 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 z-[9999]';
    toast.innerHTML = `
        <i class="fa-solid fa-check-circle text-yellow-400"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.transition = 'all 0.3s';
        toast.style.opacity = '0';
        toast.style.transform = 'translate(-50%, 20px)';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// ================== INITIALIZATION ==================
function init() {
    renderProducts();
    
    // Mobile menu button
    const mobileBtn = document.getElementById('mobile-menu-btn');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', toggleMobileMenu);
    }

    // Update user UI (Login / Logout / Admin button)
    updateUserUI();
}

// Run when page loads
window.addEventListener('load', init);