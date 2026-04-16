// --- SCRIPT.JS ARREGLADO ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECTORES DE ELEMENTOS
    const menuBtn = document.querySelector('#menu-open');
    const menuLinks = document.querySelector('.list-cat');
    const btnAbrirCarrito = document.getElementById('abrir-carrito');
    const btnCerrarCarrito = document.getElementById('cerrar-carrito');
    const panelCarrito = document.getElementById('panel-carrito');
    const btnUser = document.getElementById('abrir-user');
    const seccionLogin = document.getElementById('seccion-login');
    const containerLogin = document.querySelector(".container");
    const btnSignIn = document.getElementById("btn-sign-in");
    const btnSignUp = document.getElementById("btn-sign-up");

    // 2. LÓGICA DEL MENÚ HAMBURGUESA
    menuBtn.addEventListener('click', () => {
        // Si el carrito está abierto, lo cerramos para no encimar paneles
        panelCarrito.classList.remove('active');
        
        menuBtn.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
    });

    // 3. LÓGICA DEL CARRITO
    btnAbrirCarrito.addEventListener('click', () => {
        // Si el menú está abierto, lo cerramos
        menuBtn.classList.remove('is-active');
        menuLinks.classList.remove('active');

        panelCarrito.classList.add('active');
    });

    btnCerrarCarrito.addEventListener('click', () => {
        panelCarrito.classList.remove('active');
    });

    // 4. LÓGICA DE LA SECCIÓN DE LOGIN (MOSTRAR/OCULTAR)
    btnUser.addEventListener('click', () => {
        seccionLogin.classList.toggle('hidden');
    });

    // 5. LÓGICA DE INTERCAMBIO (SIGN IN / SIGN UP)
    btnSignIn.addEventListener("click", () => {
        containerLogin.classList.remove("toggle");
    });

    btnSignUp.addEventListener("click", () => {
        containerLogin.classList.add("toggle");
    });

    // 6. FUNCIONES PARA EL CARRITO (EJEMPLO PARA EVITAR ERRORES)
    // Definimos el array de productos vacío para que el código no falle
    let carrito = [];

    window.modificarCantidad = (id, valor) => {
        const item = carrito.find(p => p.id === id);
        if(item) {
            item.cantidad = parseInt(valor);
            console.log("Cantidad actualizada");
        }
    };

    window.quitarDelCarrito = (id) => {
        carrito = carrito.filter(p => p.id !== id);
        console.log("Producto eliminado");
    };
});
