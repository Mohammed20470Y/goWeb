// Sample menu items for each category
const menuCategories = {
    breakfast: [
        { id: 'b1', name: 'English Breakfast', price: 15.99 },
        { id: 'b2', name: 'Pancakes Stack', price: 12.99 },
        { id: 'b3', name: 'Eggs Benedict', price: 14.50 },
        { id: 'b4', name: 'Avocado Toast', price: 11.99 },
        { id: 'b5', name: 'Breakfast Burrito', price: 13.50 }
    ],
    soups: [
        { id: 's1', name: 'Tomato Basil', price: 8.99 },
        { id: 's2', name: 'Chicken Noodle', price: 9.99 },
        { id: 's3', name: 'French Onion', price: 10.50 },
        { id: 's4', name: 'Clam Chowder', price: 11.99 }
    ],
    pasta: [
        { id: 'p1', name: 'Spaghetti Carbonara', price: 16.99 },
        { id: 'p2', name: 'Fettuccine Alfredo', price: 15.99 },
        { id: 'p3', name: 'Penne Arrabbiata', price: 14.50 },
        { id: 'p4', name: 'Lasagna', price: 17.99 }
    ],
    sushi: [
        { id: 'su1', name: 'California Roll', price: 12.99 },
        { id: 'su2', name: 'Spicy Tuna Roll', price: 14.99 },
        { id: 'su3', name: 'Rainbow Roll', price: 16.99 },
        { id: 'su4', name: 'Dragon Roll', price: 18.99 }
    ],
    main: [
        { id: 'm1', name: 'Roast chicken', price: 12.75 },
        { id: 'm2', name: 'Red caviar', price: 12.30 },
        { id: 'm3', name: 'German sausage', price: 5.60 },
        { id: 'm4', name: 'Grilled Salmon', price: 24.99 }
    ],
    desserts: [
        { id: 'd1', name: 'Chocolate Cake', price: 8.99 },
        { id: 'd2', name: 'Cheesecake', price: 9.99 },
        { id: 'd3', name: 'Apple Pie', price: 7.99 },
        { id: 'd4', name: 'Ice Cream Sundae', price: 6.99 }
    ],
    drinks: [
        { id: 'dr1', name: 'Irish cream coffee', price: 4.20 },
        { id: 'dr2', name: 'Fresh Orange Juice', price: 4.99 },
        { id: 'dr3', name: 'Iced Latte', price: 5.50 },
        { id: 'dr4', name: 'Smoothie', price: 6.99 }
    ],
    alcohol: [
        { id: 'a1', name: 'House Wine', price: 8.99 },
        { id: 'a2', name: 'Draft Beer', price: 6.99 },
        { id: 'a3', name: 'Mojito', price: 12.99 },
        { id: 'a4', name: 'Margarita', price: 11.99 }
    ]
};

function setCustomerInfo() {
    const customerName = document.getElementById('customerName').value;
    if (customerName.trim() !== '') {
        document.getElementById('customerDisplayName').innerText = customerName;
        document.getElementById('orderSection').style.display = 'block';
        document.querySelector('.customer-info').style.display = 'none';
    } else {
        alert('Please enter a customer name.');
    }
}

// Track order quantities
let orderQuantities = {};

function showMenuItems(category) {
    // Remove active class from all cards
    document.querySelectorAll('.menu-card').forEach(card => {
        card.classList.remove('active');
    });

    // Add active class to clicked card
    document.querySelector(`.menu-card.${category}`).classList.add('active');

    const container = document.getElementById('menuItemsContainer');
    container.classList.add('active');

    // Generate menu items HTML
    const items = menuCategories[category];
    container.innerHTML = `
        <h3 style="margin-bottom: 15px;">${category.charAt(0).toUpperCase() + category.slice(1)} Menu</h3>
        ${items.map(item => `
            <div class="menu-item" onclick="addToOrder('${item.id}', '${item.name}', ${item.price})">
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
            </div>
        `).join('')}
    `;
}

function addToOrder(itemId, itemName, itemPrice) {
    if (!orderQuantities[itemId]) {
        orderQuantities[itemId] = {
            name: itemName,
            price: itemPrice,
            quantity: 0
        };
    }
    updateQuantity(itemId, 1);
}

function updateOrderDisplay() {
    const orderItemsDiv = document.getElementById('orderItems');
    const orderSummaryDiv = document.getElementById('orderSummary');
    const totalAmountDiv = document.getElementById('totalAmount');

    // Clear current display
    orderItemsDiv.innerHTML = '';
    orderSummaryDiv.innerHTML = '';

    let subtotal = 0;

    // Update order items
    Object.entries(orderQuantities).forEach(([itemId, item]) => {
        if (item.quantity > 0) {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            orderItemsDiv.innerHTML += `
                <div class="item-card">
                    <div>
                        <div>${item.name}</div>
                        <div>$${item.price.toFixed(2)}</div>
                    </div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity('${itemId}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${itemId}', 1)">+</button>
                    </div>
                </div>
            `;

            orderSummaryDiv.innerHTML += `
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span>${item.name} x${item.quantity}</span>
                    <span>$${itemTotal.toFixed(2)}</span>
                </div>
            `;
        }
    });

    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    totalAmountDiv.innerHTML = `
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <span>Subtotal</span>
            <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <span>Tax 10%</span>
            <span>$${tax.toFixed(2)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-weight: bold;">
            <span>Total</span>
            <span>$${total.toFixed(2)}</span>
        </div>
    `;
}

function updateQuantity(itemId, change) {
    if (orderQuantities[itemId]) {
        const newQuantity = orderQuantities[itemId].quantity + change;
        if (newQuantity >= 0) {
            orderQuantities[itemId].quantity = newQuantity;
            updateOrderDisplay();
        }
    }
}

// Initial display
updateOrderDisplay();