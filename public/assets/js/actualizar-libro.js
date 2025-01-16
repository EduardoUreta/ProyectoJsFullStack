const tituloModal = document.getElementById('modalUpdateBookLabel');
const formUpdate = document.getElementById("updateBookForm");

const updateBook = (book) => {
    tituloModal.innerHTML = `Editando a ${book.nombre}`;

    formUpdate.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(formUpdate);

        formData.append('nombre', e.target.nombre.value || book.nombre);
        formData.append('descripcion', e.target.descripcion.value || book.descripcion);
        formData.delete("CategoriaId");
        formData.append('CategoriaId', e.target.CategoriaId.value || book.CategoriaId);
        formData.delete("AutorId");
        formData.append('AutorId', e.target.AutorId.value || book.AutorId);

        if (imagen.files[0]) {
            formData.append("imagen", imagen.files[0]);
        }

        try {
            const response = await fetch(`/books/${book.id}`, {
                method: "PUT",
                body: formData
            });
        
            const data = await response.json();
            if (response.ok) {
                Swal.fire({
                    title: 'Libro actualizado correctamente!',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
                setTimeout(() => {
                    window.location.replace("/listado-libro"); 
                }, 2500);
            } else {
                console.log('Error:', data); 
                Swal.fire({
                    title: 'No fue posible actualizar el libro!',
                    text: 'Intentalo más tarde',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
                setTimeout(() => {
                    window.location.replace("/listado-libro"); 
                }, 2500);
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error al actualizar el libro!',
                text: 'Intentalo más tarde',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            setTimeout(() => {
                window.location.replace("/listado-libro"); 
            }, 2500);
        }
    });
}
