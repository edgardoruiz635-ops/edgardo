// función del menu de hamburguesa
const menu = document.querySelector('#menu-open');
const menuLinks = document.querySelector('.list-cat');
menu.addEventListener('click',() =>{
  const panelCarrito = document.getElementById('panel-carrito');
  if (panelCarrito.classList.remove('active')) {
    panelCarrito.classList.remove('active');
  }
  
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
});
//función del carrito
document.addEventListener('DOMContentLoaded', () => {
    const btnAbrir = document.getElementById('abrir-carrito');
    const btnCerrar = document.getElementById('cerrar-carrito');
    const panelCarrito = document.getElementById('panel-carrito');
    const overlay = document.getElementById('overlay');
    const listaCarrito = document.getElementById('lista-productos-carrito');
    const totalElemento = document.getElementById('total-precio');
    const badge = document.querySelector('.badge');

    // Funciones para abrir/cerrar
    btnAbrir.addEventListener('click', () => {
      menu.classList.remove('is-active');
      menuLinks.classList.remove('active');
      
        panelCarrito.classList.add('active');
        actualizarCarritoUI();
    });

    [btnCerrar].forEach(el => {
        el.addEventListener('click', () => {
            panelCarrito.classList.remove('active');
        });
    });

    // Función principal para renderizar
    

    // Funciones globales para que los botones de los items funcionen
    window.modificarCantidad = (id, valor) => {
        const item = carrito.find(p => p.id === id);
        if(item) {
            item.cantidad = parseInt(valor);
            actualizarCarritoUI();
        }
    };

    window.quitarDelCarrito = (id) => {
        carrito = carrito.filter(p => p.id !== id);
        actualizarCarritoUI();
    };
});
// ------------------------------------------------
const container = document.querySelector(".container");
const btnSignIn = document.getElementById("btn-sign-in");
const btnSignUp = document.getElementById("btn-sign-up");

btnSignIn.addEventListener("click",()=>{
  container.classList.remove("toggle");
});
btnSignUp.addEventListener("click",()=>{
  container.classList.add("toggle");
});
// –------ user del cel 
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const btnSignIn = document.getElementById('btn-sign-in');
    const btnSignUp = document.getElementById('btn-sign-up');

    // Al hacer clic en el botón de "Registrarse"
    btnSignUp.addEventListener('click', () => {
        container.classList.add('toggle');
    });

    // Al hacer clic en el botón de "Iniciar Sesión"
    btnSignIn.addEventListener('click', () => {
        container.classList.remove('toggle');
    });
});
// ----------------------------------------------

const btnUser = document.getElementById('abrir-user');

const seccion = document.getElementById('seccion-login'); 

btnUser.addEventListener('click', () => {
  seccion.classList.toggle('hidden');
});

// tienda 
const producto = {
  id: 1,
  nombre:"ryzen 5 5000",
  precio:500000
  imagen:"Img2/rayzen 5 1.jpg",
  descripcion:"8 núcleos 12 hilos."
};
// crear tarjeta del producto
function crearTarjetaProducto(item) {
  // contenedor principal
  const card = document.createElement('div');
  card.classList.add('producto-card');
  
// definir el contenido interno 
  card.innerHTML = `
    <img src="${item.imagen}" alt="${item.nombre}">
    <h3>${item.nombre}</h3>
    <p class="descripcion">${item.descripcion}</p>
    <p class="precio">$${item.precio.toFixed(2)}</p>
    <button onclick="agregarAlCarrito(${item.id})">Añadir</button>
 `;

  return card;
}
const estante = document.getElementById('contenedor-tienda');
estante.appendChild(crearTarjetaProducto(producto));

function crearTarjetaProducto(id) {
  console.log(`producto ${id} añadido`);
}



















