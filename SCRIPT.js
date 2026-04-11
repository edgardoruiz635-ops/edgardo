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