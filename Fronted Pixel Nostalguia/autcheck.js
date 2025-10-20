// authCheck.js

function checkAuthentication() {
    const token = localStorage.getItem('userToken');

    if (!token) {
        alert("Alto ahí! Jugador! Debes iniciar sesión para poder acceder a los juegos. Redirigiendo a Iniciar Sesión."); 
        
        // 🚨 PRUEBA ESTA RUTA NUEVA 🚨
        // Si el juego está en una subcarpeta (ej: /Catalogo/Juegos/pacman.html)
        window.location.href = '../../Login/login.html'; // Sube dos niveles

        // 🚨 Si falla, prueba a usar la ruta ABSOLUTA (si usas Live Server)
        // window.location.href = '/Login/login.html'; 
    }
}

checkAuthentication();
// El resto del código del juego puede ir aquí.
