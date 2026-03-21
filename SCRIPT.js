/* --- CONFIGURACIÓN DE INVENTARIO --- */
const inventory = [
    { id: 1, cat: 'PLACAS MADRE', name: 'MSI B4060', price: 500000, img:'Img/placa madre.jpg'},
    { id: 2, cat: 'PROCESADORES', name: 'RYZEN 7 9800X3D', price: 2500000, img:'Img/rayzen.jpg' },
    { id: 3, cat: 'RAM', name: 'Vengeance DDR5 (2X16)', price: 1100000, img:'Img/ram.jpg' },
    { id: 4, cat: 'CHIPS SSD', name: 'MCSD 250GB', price: 500000, img: 'Img/ssd.jpg' },
    { id: 5, cat: 'FUENTES', name: 'Fuente 1000W', price: 800000, img: 'Img/fuente.jpg' },
    { id: 6, cat: 'GRAFICAS', name: 'RTX 3090 Ti', price: 14000000, img: 'Img/grafica.jpg'},
    { id: 7, cat: 'REFRIGERACION', name: 'Refrigeración Líquida', price: 1200000, img: 'Img/refrigeracion.jpg'},
    { id: 8, cat: 'GABINETES', name: 'Corsair 4000D Airflow', price: 600000, img: 'Img/gabinete.png'},
    { id: 9, cat: 'PERIFERICOS', name: 'Combo Periféricos', price: 120000, img: 'Img/perifericos.jpg'},
];

/* --- LÓGICA DEL CARRITO --- */
let cart = JSON.parse(localStorage.getItem('tech_ejr_v3')) || [];

function toggleCart(show) {
    document.getElementById('sidebar-cart').classList.toggle('active', show);
    document.getElementById('cart-overlay').classList.toggle('active', show);
}

// Evento para abrir carrito
document.getElementById('btn-carrito').onclick = () => toggleCart(true);

function addToCart(id) {
    const item = inventory.find(i => i.id === id);
    const uniqueId = Date.now().toString() + Math.random().toString().slice(2, 6);
    cart.push({...item, cartUniqueId: uniqueId});
    updateUI();
    toggleCart(true); // Abre el carrito automáticamente al añadir
}

function removeFromCart(uId) {
    cart = cart.filter(i => i.cartUniqueId !== uId);
    updateUI();
}

function updateUI() {
    localStorage.setItem('tech_ejr_v3', JSON.stringify(cart));
    const list = document.getElementById('cart-list');
    
    list.innerHTML = cart.map(i => `
        <div class="cart-item">
            <img src="${i.img}" alt="${i.name}">
            <div class="item-info">
                <span class="item-name">${i.name}</span>
                <span class="item-price">$${i.price.toLocaleString()}</span>
            </div>
            <button class="remove-btn-small" onclick="removeFromCart('${i.cartUniqueId}')">
                &times;
            </button>
        </div>
    `).join('');

    document.getElementById('contador').innerText = cart.length;
    const total = cart.reduce((acc, curr) => acc + curr.price, 0);
    document.getElementById('total-price').innerText = '$' + total.toLocaleString();
}

/* --- LÓGICA DE FILTRADO Y NAVEGACIÓN --- */
function filterItems(category) {
    const list = document.getElementById('product-list');
    const title = document.getElementById('cat-title');
    const zigzag = document.querySelector('.inicio-personalizado'); 

    if (category === 'INICIO') {
        if(zigzag) zigzag.style.display = 'block';   
        list.style.display = 'none';     
        title.style.display = 'none';
    } 
    else {
        if(zigzag) zigzag.style.display = 'none';    
        list.style.display = 'grid';     
        title.style.display = 'block';
        title.innerText = category === 'Todos' ? 'Catálogo Completo' : category;

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

    // CERRAR MENÚ MÓVIL AL SELECCIONAR (Muy importante para UX)
    if (window.innerWidth <= 768) {
        const nav = document.getElementById('nav-menu');
        const btn = document.getElementById('menu-btn');
        if(nav) nav.classList.remove('active');
        if(btn) btn.classList.remove('open');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* --- CONTROL DEL MENÚ HAMBURGUESA --- */
function toggleMenu() {
    const nav = document.getElementById('nav-menu');
    const btn = document.getElementById('menu-btn');

    nav.classList.toggle('active');
    btn.classList.toggle('open');
}

// Inicialización al cargar la página
updateUI();
filterItems('INICIO');