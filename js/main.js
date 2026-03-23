const products = [
    { 
        id: 1, 
        name: "Manila Runner", 
        price: 1299, 
        image: "images/shoe1.jpg",    
        category: "sneakers" 
    },
    { 
        id: 2, 
        name: "Baguio Trail Boot", 
        price: 2499, 
        image: "images/shoe2.jpg",    
        category: "boots" 
    },
    { 
        id: 3, 
        name: "Commonwealth Canvas", 
        price: 899, 
        image: "images/shoe3.jpg",    
    },
    { 
        id: 4, 
        name: "Fiesta Flats", 
        price: 799, 
        image: "images/shoe4.jpg",    
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
        image: "images/shoe6.jpg",    
        category: "boots" 
    },
];

let cart = [];

// DOM elements
const productsGrid = document.getElementById('products-grid');
const cartCountEl = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');

// Render products
function renderProducts() {
    productsGrid.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card bg-white border rounded-3xl overflow-hidden';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover">
            <div class="p-5">
                <h4 class="font-semibold text-lg">${product.name}</h4>
                <p class="text-yellow-600 font-bold mt-1">₱${product.price.toLocaleString()}</p>
                <button onclick="addToCart(${product.id})" 
                        class="mt-4 w-full bg-yellow-400 hover:bg-yellow-300 py-3 rounded-2xl font-medium transition">
                    Add to Cart
                </button>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// Cart functions
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        cart.push({ ...product });
        updateCartCount();
        alert(`${product.name} added to cart!`);
    }
}

function updateCartCount() {
    cartCountEl.textContent = cart.length;
}

function toggleCart() {
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
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-center py-10 text-gray-500">Your cart is empty</p>';
        return;
    }
    
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const div = document.createElement('div');
        div.className = 'flex gap-4 mb-6 items-center';
        div.innerHTML = `
            <img src="${item.image}" class="w-20 h-20 object-cover rounded-xl">
            <div class="flex-1">
                <p class="font-medium">${item.name}</p>
                <p class="text-sm text-gray-600">₱${item.price.toLocaleString()}</p>
            </div>
            <button onclick="removeFromCart(${index})" class="text-red-500 hover:text-red-700">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        `;
        cartItemsContainer.appendChild(div);
    });
    
    const totalDiv = document.createElement('div');
    totalDiv.className = 'border-t pt-4 mt-4 font-bold text-lg flex justify-between';
    totalDiv.innerHTML = `
        <span>Total:</span>
        <span>₱${total.toLocaleString()}</span>
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
    const total = cart.reduce((sum, i) => sum + i.price, 0);
    alert(`Thank you for your order!\n\nTotal: ₱${total.toLocaleString()}\n\n(This is a demo — no real payment processed)`);
    cart = [];
    updateCartCount();
    toggleCart();
}

// Mobile 
function toggleMobileMenu() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
}

// Init
function init() {
    renderProducts();
    
    document.getElementById('mobile-menu-btn').addEventListener('click', toggleMobileMenu);
    
    
}

window.addEventListener('load', init);