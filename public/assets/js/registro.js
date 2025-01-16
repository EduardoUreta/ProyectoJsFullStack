const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const { nombre, apellido, correo, contrasena, avatar } = e.target;

    const formData = new FormData();
    formData.append("nombre", nombre.value);
    formData.append("apellido", apellido.value);
    formData.append("correo", correo.value);
    formData.append("contrasena", contrasena.value);

    if (avatar.files[0]) {
        formData.append("avatar", avatar.files[0]);
    }

    try {
        const response = await fetch("/users", {
            method: "POST",
            body: formData,  
        });
        const data = await response.json();
        
        if (response.ok) {
            Swal.fire({
                title: 'Te has registrado exitosamente!',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            setTimeout(() => {
                window.location.href = "/login";
            }, 2500);
        } else {
            Swal.fire({
                title: 'Error al registrarte!',
                text: 'Por favor, intenta nuevamente',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            setTimeout(() => {
                window.location.href = "/registro";
            }, 2500);
            console.log('Error:', data); // Muestra el error si lo hay
        }
        
    } catch (error) {
        console.log(error);
    }
});
