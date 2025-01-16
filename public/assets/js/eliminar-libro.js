
const deleteBook = async(bookId) => {
    try {
        
        const response = await fetch(`/books/${bookId}`, {
            method: "DELETE",
        });

        if(response.ok) {
            Swal.fire({
                title: '¡Haz eliminado el libro!',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            setTimeout(() => {
                window.location.replace("/listado-libro"); 
            }, 2500);
        } else {
            Swal.fire({
                title: '¡Error al eliminar el libro!',
                icon: 'error',
                text: 'Intenta más tarde',
                confirmButtonText: 'Aceptar'
            });
            setTimeout(() => {
                window.location.replace("/listado-libro"); 
            }, 2500);
        }
    } catch (error) {
        Swal.fire({
            title: 'Error en el servidor',
            icon: 'error',
            text: 'Intenta más tarde',
            confirmButtonText: 'Aceptar'
        });
        setTimeout(() => {
            window.location.href = "/listado-libro";
        }, 2500);
    }
}