// catalogo.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener el estado de la sesión
    const estaLogueado = localStorage.getItem('usuarioLogueado') === 'true';

    // 2. Seleccionar todos los botones de juego (los que tienen la clase 'btn-ficha')
    const botonesJugar = document.querySelectorAll('.btn-ficha');

    // 3. Recorrer cada botón para añadir un escuchador de evento
    botonesJugar.forEach(boton => {
        boton.addEventListener('click', function(event) {
            // Verificar si el usuario NO está logueado
            if (!estaLogueado) {
                event.preventDefault(); // Evitar que el enlace vaya a la URL
                
                // Mostrar la alerta y redirigir a la página de login
                alert('🚫 ¡Alto ahí, Jugador! Debes iniciar sesión para poder acceder a los juegos. Redirigiendo a Iniciar Sesión.');
                window.location.href = '/Login/login.html'; // Cambia esta ruta si es diferente
            }
            // Si SÍ está logueado, el código no hace nada y el enlace funciona normalmente
        });
    });
    
    // (Opcional) Puedes añadir aquí lógica para mostrar el nombre del usuario o un botón de "Cerrar Sesión"
});