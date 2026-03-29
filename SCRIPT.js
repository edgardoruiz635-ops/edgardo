Const inventory = [
    { id: 1, cat: 'PLACAS MADRE', name: 'MSI B4060', price: 500000, img:'Img/placa madre.jpg'},
    { id: 2, cat: 'PROCESADORES', name: 'RAYZEN 7 9800X3D', price: 2500000, img:'Img/rayzen.jpg' },
    { id: 3, cat: 'RAM', name: 'vangeance DDR5 (2X16)', price: 1100000, img:'Img/ram.jpg' },
    { id: 4, cat: 'CHIPS SSD', name: 'MCSD 250GB', price: 500000, img: 'Img/ssd.jpg' },
    { id: 5, cat: 'FUENTES', name: 'fuente 1000w', price: 800000, img: 'Img/fuente.jpg' },
    { id: 6, cat: 'GRAFICAS', name: 'rtx 3090 ti', price: 14000000, img: 'Img/grafica.jpg'},
    { id: 7, cat: 'REFRIGERACION', name: 'Rfrigeracin liquida', price: 1200000, img: 'Img/refrigeracion.jpg'},
    { id: 8, cat: 'GABINETES', name: 'Corsair 4000D airflow', price: 600000, img: 'Img/gabinete.png'},
    { id: 9, cat: 'PERIFERICOS', name: 'combo de perifericos', price: 120000, img: 'Img/perifericos.jpg'},
];

let cart = JSON.parse(localStorage.getItem('tech_ejr_v3')) || [];

function toggleCart(show) {
    document.getElementById('sidebar-cart').classList.toggle('active', show);
    document.getElementById('cart-overlay').classList.toggle('active', show);
}

document.getElementById('btn-carrito').onclick = () => toggleCart(true);

function addToCart(id) {
    const item = inventory.find(i => i.id === id);
    const uniqueId = Date.now().toString() + Math.random().toString().slice(2, 6);
    cart.push({...item, cartUniqueId: uniqueId});
    updateUI();
    toggleCart(true); // Abrir carrito al comprar
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
function filterItems(category) {
    const list = document.getElementById('product-list');
    const title = document.getElementById('cat-title');
    // Buscamos la sección por su clase, ya que en tu HTML no tiene ID
    const zigzag = document.querySelector('.inicio-personalizado'); 

    // Usamos mayúsculas para que coincida con tu HTML
    if (category === 'INICIO') {
        zigzag.style.display = 'block';   
        list.style.display = 'none';     
        title.style.display = 'none'; // Ocultamos también el título "Catálogo" en el inicio
    } 
    else {
        zigzag.style.display = 'none';    
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
const categorias = document.querySelector('.categories-nav');
let isPressed = false;
let startX;
let scrollLeft;

// Al presionar el mouse
categorias.addEventListener('mousedown', (e) => {
    isPressed = true;
    categorias.classList.add('active');
    // Guardamos la posición inicial
    startX = e.pageX - categorias.offsetLeft;
    scrollLeft = categorias.scrollLeft;

    // Cambiamos el cursor manualmente para dar feedback
    categorias.style.cursor = 'grabbing';
});

// Al salir del área
categorias.addEventListener('mouseleave', () => {
    isPressed = false;
    categorias.style.cursor = 'grab';
});

// Al soltar el clic
categorias.addEventListener('mouseup', () => {
    isPressed = false;
    categorias.style.cursor = 'grab';
});

// El movimiento
categorias.addEventListener('mousemove', (e) => {
    if (!isPressed) return; // Si no hay clic, no hace nada

    e.preventDefault(); // Evita seleccionar texto o arrastrar imágenes
    const x = e.pageX - categorias.offsetLeft;
    const walk = (x - startX) * 2; // Multiplica por 2 para que sea más fluido
    categorias.scrollLeft = scrollLeft - walk;
});

function toggleMenu() {
    const nav = document.getElementById('nav-menu');
    const btn = document.getElementById('menu-btn');

    // Alternamos las clases para mostrar/ocultar
    nav.classList.toggle('active');
    btn.classList.toggle('open');
}

// Opcional: Cerrar el menú al hacer clic en una categoría (mejor UX)
const originalFilterItems = filterItems; 
filterItems = function(category) {
    // Llamamos a tu función original de filtrado
    originalFilterItems(category);

    // Si estamos en móvil, cerramos el menú tras elegir
    if (window.innerWidth <= 768) {
        document.getElementById('nav-menu').classList.remove('active');
        document.getElementById('menu-btn').classList.remove('open');
    }
};


filterItems('INICIO');
updateUI();
