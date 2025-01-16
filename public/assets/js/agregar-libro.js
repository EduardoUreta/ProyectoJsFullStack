const autores = document.querySelector(".cargarAutores");
const categorias = document.querySelector(".cargarCategorias");

document.addEventListener("DOMContentLoaded", async(e) => {

    try {
        const responseAutor = await fetch("/authors", {
            method: "GET",
            headers: {'Content-Type':'application/json'}
        });

        const dataAuthor = await responseAutor.json();

        const responseCategoria = await fetch("/categories", {
            method: "GET",
            headers: {'Content-Type':'application/json'}
        });

        const dataCategories = await responseCategoria.json();

        autores.innerHTML = dataAuthor.map((autor) => `
            <option value="${autor.id}">${autor.nombre + ' ' + autor.apellido}</option>
        `).join(' ');

        categorias.innerHTML = dataCategories.map((categoria) => `
            <option value="${categoria.id}">${categoria.nombre}</option>
        `).join(' ');
        
    } catch (error) {
        console.error("Error al obtener los autores o categorias:", error);
    };
});


const agregarLibro = document.getElementById("addBookForm");

agregarLibro.addEventListener("submit", async(e) => {

    e.preventDefault();

    const { nombre, descripcion, CategoriaId, AutorId, imagen } = e.target;

    const formData = new FormData();
    formData.append("nombre", nombre.value);
    formData.append("descripcion", descripcion.value);
    formData.append("CategoriaId", CategoriaId.value);
    formData.append("AutorId", AutorId.value);

    if (imagen.files[0]) {
        formData.append("imagen", imagen.files[0]);
    };

    try {
        const response = await fetch("/books", {
            method: "POST",
            body: formData,  
        });
        const data = await response.json();
        
        if (response.ok) {
            Swal.fire({
                title: 'Agregaste un libro exitosamente!',
                text: 'Te redirigiremos a la sección tienda',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            setTimeout(() => {
                window.location.href = "/tienda";
            }, 2500);
        } else {
            Swal.fire({
                title: 'Error al crear un libro!',
                text: 'Por favor, intenta nuevamente',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            setTimeout(() => {
                window.location.href = "/agregar-libro";
            }, 2500);
            console.log('Error:', data);
        }
        
    } catch (error) {
        console.log(error);
    }
});