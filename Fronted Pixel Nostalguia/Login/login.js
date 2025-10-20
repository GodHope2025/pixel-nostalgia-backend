const ENDPOINT_URL = "http://localhost:3000/api/auth/login";

// Funciones para mostrar y ocultar el error en el HTML
function displayError(message) {
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.color = 'red';
        errorElement.style.display = 'block'; 
    }
}

function hideError() {
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none'; 
    }
}

document.querySelector("form")
    .addEventListener("submit", async (e) => {
        e.preventDefault();
        hideError();
        await login(e.target);
    });

const login = async (formElement) => {
    const formData = new FormData(formElement);
    const email = formData.get("usuario");
    const password = formData.get("password");

    try {
        const response = await fetch(ENDPOINT_URL, {
            method: "POST",
            headers: {'content-type': "application/json"},
            body: JSON.stringify({ email, password }),
        });
        
        // PASO 1: Leer el cuerpo JSON SIEMPRE, sin importar el status code.
        const result = await response.json(); 
        
        console.log("Respuesta del Backend:", result);

        if (!response.ok) {
            // PASO 2: Si el status NO es 200 (ej. 401 o 400), mostramos el error.
            const errorMessage = result.message || "Credenciales inválidas o error desconocido.";
            displayError(errorMessage);
            console.error("Error del servidor (401/400):", errorMessage);
            return;
        }

        // ✅ LÓGICA DE ÉXITO (Status 200 OK)
        
        // PASO 3: Guardar el ID de usuario como token de sesión
        // Tu backend envía el ID en result.user.userId
        if (result.user && result.user.userId) {
            localStorage.setItem('userToken', result.user.userId);
            console.log("Sesión iniciada. Token guardado:", result.user.userId);
        } else if (result.token) {
            localStorage.setItem('userToken', result.token);
        } else {
            console.error("ADVERTENCIA: Login exitoso, pero no se encontró token/userId para guardar la sesión.");
        }
        
        // PASO 4: Redirigir al usuario al catálogo
        window.location.href = '../Catalogo/catalogo.html'; 
        
    } catch (error) {
        displayError("Fallo en la conexión. Asegúrate de que el servidor esté activo.");
        console.error("Error durante el login:", error);
    }
};
