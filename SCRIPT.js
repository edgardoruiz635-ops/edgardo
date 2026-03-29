const inventory = [
    { id: 1, cat: 'PLACAS MADRE', name: 'MSI B460M', price: 500000, img:'Img/placa madre.jpg'},
    { id: 2, cat: 'PROCESADORES', name: 'Ryzen 7 9800X3D', price: 2500000, img:'Img/rayzen.jpg' },
    { id: 3, cat: 'RAM', name: 'DDR5 32GB', price: 1100000, img:'Img/ram.jpg' },
    { id: 6, cat: 'GRAFICAS', name: 'RTX 3090 Ti', price: 14000000, img:'Img/grafica.jpg'}
];

let cart = JSON.parse(localStorage.getItem('tech_ejr_v3')) || [];

function toggleCart(show) {
    document.getElementById('sidebar-cart').classList.toggle('active', show);
    document.getElementById('cart-overlay').classList.toggle('active', show);
}

document.getElementById('btn-carrito').onclick = () => toggleCart(true);

function updateUI() {
    localStorage.setItem('tech_ejr_v3', JSON.stringify(cart));
    const list = document.getElementById('cart-list');
    list.innerHTML = cart.map(i => `
        <div class="cart-item">
            <div class="item-info">
                <span class="item-name">${i.name}</span>
                <span class="item-price">$${i.price.toLocaleString()}</span>
            </div>
            <button class="remove-btn-small" onclick="removeFromCart('${i.cartUniqueId}')">&times;</button>
        </div>
    `).join('');

    document.getElementById('contador').innerText = cart.length;
    const total = cart.reduce((acc, curr) => acc + curr.price, 0);
    document.getElementById('total-price').innerText = '$' + total.toLocaleString();
}

function addToCart(id) {
    const item = inventory.find(i => i.id === id);
    const uniqueId = Date.now().toString();
    cart.push({...item, cartUniqueId: uniqueId});
    updateUI();
    toggleCart(true);
}

function removeFromCart(uId) {
    cart = cart.filter(i => i.cartUniqueId !== uId);
    updateUI();
}

function filterItems(category) {
    const list = document.getElementById('product-list');
    const title = document.getElementById('cat-title');
    const zigzag = document.querySelector('.inicio-personalizado'); 

    if (category === 'INICIO') {
        zigzag.style.display = 'block'; list.style.display = 'none'; title.style.display = 'none';
    } else {
        zigzag.style.display = 'none'; list.style.display = 'grid'; title.style.display = 'block';
        title.innerText = category;
        const filtered = category === 'Todos' ? inventory : inventory.filter(i => i.cat === category);
        list.innerHTML = filtered.map(p => `
            <div class="card">
                <img src="${p.img}" class="product-img">
                <h3>${p.name}</h3>
                <span class="price">$${p.price.toLocaleString()}</span>
                <button class="add-btn" onclick="addToCart(${p.id})">Añadir</button>
            </div>
        `).join('');
    }
}

updateUI();
filterItems('INICIO');
