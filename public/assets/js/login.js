const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    let { correo, contrasena } = e.target;

    correo = correo.value;
    contrasena = contrasena.value;

    try {
        const response = await fetch("./auth/login", {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({correo, contrasena}),
            redirect: "follow",
        });4     

        const data = await response.json();
        
        if (data.message === "Usuario logueado") {
            const token = document.cookie.split('; ').find(row => row.startsWith('Bearer=')).split('=')[1];
            const user = parseJwt(token);

            Swal.fire({
                title: '¡Haz iniciado sesión!',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
        
            setTimeout(() => {
                (user.role === "admin") ? window.location.replace("/agregar-libro") : window.location.replace(`/perfil/${user._id}`);
            }, 2500);
        };

    } catch (error) {
        console.error(error, "Credenciales Inválidas");
        Swal.fire({
            title: '¡Error al iniciar sesión!',
            icon: 'error',
            text: 'Credenciales Inválidas',
            confirmButtonText: 'Aceptar'
        });
        setTimeout(() => {
            window.location.href = "/login";
        }, 2500);
    };


    
});

function parseJwt(token) {
    if (!token) {
        return;
    }
    const base64Url = token.split(".")[1]; // Obtiene la segunda parte del token (payload)
    const base64 = base64Url.replace("-", "+").replace("_", "/"); // Decodifica el base64Url para que tenga el formato estándar
    return JSON.parse(window.atob(base64)); // Convierte el base64 a JSON y lo parsea
}
  