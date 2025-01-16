const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {
    logoutButton.addEventListener("click", async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch("/auth/logout", {
                method: "DELETE",
            });
    
            const data = await response.json();
    
            if (data.message === "Sesión Cerrada") {
                Swal.fire({
                    title: '¡Haz cerrado sesión!',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
                setTimeout(() => {
                    window.location.replace("/"); 
                }, 2000);
            } else if (data.message === "No estás logueado para cerrar sesión") {
                Swal.fire({
                    title: 'No estás logueado',
                    icon: 'warning',
                    text: 'No puedes cerrar sesión porque no has iniciado sesión',
                    confirmButtonText: 'Aceptar'
                });
            } else {
                Swal.fire({
                    title: '¡Error!',
                    icon: 'error',
                    text: 'Algo salió mal. Intenta nuevamente.',
                    confirmButtonText: 'Aceptar'
                });
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: '¡Error al cerrar sesión!',
                icon: 'error',
                text: 'Por favor, intenta más tarde',
                confirmButtonText: 'Aceptar'
            });
        }
    });
};
