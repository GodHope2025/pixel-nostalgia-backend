const ENDPOINT_URL = "http://localhost:3000/api/auth/register";

document.querySelector("form")
    .addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        await register(data);
        console.log(data);
    })

const register = async (formElement) => {
    const name = formElement.name;
    const email = formElement.email;
    const password = formElement.password;
    const confirmPassword = formElement.confirmPassword;
    try {
        const response = await fetch(ENDPOINT_URL, {
            method: "POST",
            headers: {'content-type': "application/json"},
            body: JSON.stringify({
                name,
                email,
                password,
                confirmPassword
            }),
        });
        if (!response.ok) {
            throw new Error("Error en la solicitud");
        }
        const result = await response.json();
        console.log("Registro exitoso:", result);
    } catch (error) {
        console.error("Error durante el registro:", error);
    }
}
