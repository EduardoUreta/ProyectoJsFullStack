const bookCard = document.getElementById("bookCard");
const autores = document.querySelector(".cargarAutores");
const categorias = document.querySelector(".cargarCategorias");

document.addEventListener("DOMContentLoaded", async() => {

    try {
        const response = await fetch("/books", {
            method: "GET",
            headers: {'Content-Type':'application/json'}
        });

        const data = await response.json();

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
   
            // Revisar
            autores.innerHTML = dataAuthor.map((autor) => `
                <option value="${autor.id}" ${data.AutorId == autor.id ? 'selected' : ''}>${autor.nombre + ' ' + autor.apellido}</option>
            `).join(' ');
    
            categorias.innerHTML = dataCategories.map((categoria) => `
                <option value="${categoria.id}">${categoria.nombre}</option>
            `).join(' ');

            // Revisar
        } catch (error) {
            console.error("Error al obtener los autores o categorias:", error);
        };


        bookCard.innerHTML = data.map((book) => `
            <div class="col-lg-4 col-sm-6 mb-4">
                <div class="portfolio-item text-center">
                    <a class="portfolio-link" href="/detalle-libro/${book.id}">
                        <div class="portfolio-hover">
                            <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                        </div>
                        <img class="img-fluid" src="${book.imagen}" alt="${book.nombre}" />
                    </a>
                    <div class="portfolio-caption">
                        <div class="portfolio-caption-heading">${book.nombre}</div>
                        <div class="portfolio-caption-subheading text-secondary">${book.descripcion}</div>
                        <div class="portfolio-caption-subheading mt-3">
                            <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-id="${book.id}" data-bs-target="#modalUpdateBook">Editar</button>
                            <button class="btn btn-danger btn-sm" data-id="${book.id}">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        document.querySelectorAll('button[data-id]').forEach(button => {
            button.addEventListener("click", async (e) => {
                const bookId = e.target.getAttribute('data-id'); 
                
                const book = data.find(book=> book.id == bookId);
        
                updateBook(book);
            });
        });

        document.querySelectorAll('button[data-id]').forEach(button => {
            button.addEventListener("click", async (e) => {
                const bookId = e.target.getAttribute('data-id');
                
                Swal.fire({
                    title: "¿Estás seguro de eliminar este libro?",
                    showDenyButton: true,
                    confirmButtonText: "Eliminar",
                    denyButtonText: `Cancelar`
                  }).then((result) => {
                    if (result.isConfirmed) {
                        deleteBook(bookId);
                    } else if (result.isDenied) {
                      Swal.fire("No se ha eliminado el libro", "", "info");
                    }
                  });

            
            });
        });

    } catch (error) {
        console.error("Error al obtener los libros:", error);
    };

});

