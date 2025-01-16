const detalleLibro = document.getElementById("Detalle-Libro");

document.addEventListener("DOMContentLoaded", async () => {

    const id = window.location.pathname.split("/").pop();

    try {
        const response = await fetch(`/books/${id}`, {
            method: "GET",
            headers: {'Content-Type':'application/json'}
        });

        const data = await response.json();

        const responseAutor = await fetch(`/authors/${data.AutorId}`, {
            method: "GET",
            headers: {'Content-Type':'application/json'}
        });

        const dataAutor = await responseAutor.json();

        const responseCategory = await fetch(`/categories/${data.CategoriaId}`, {
            method: "GET",
            headers: {'Content-Type':'application/json'}
        });

        const dataCategory = await responseCategory.json();

        detalleLibro.innerHTML = `
            <div class="p-3">
                <button onclick="window.history.back()" class="d-flex justify-content-start" style="font-size: 1.2em; padding: 10px;  background-color: #007bff; color: white; border: none; border-radius: 50px;">
                    <i class="fa fa-arrow-left" aria-hidden="true"></i>
                </button>
            </div>

            <div class="container p-5">
                <div class="text-center">
                    <h2 class="section-heading text-uppercase text-warning"><strong>${data.nombre}</strong></h2>
                    <h3 class="section-subheading text-light">${dataCategory.nombre}</h3>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="team-member text-light">
                            ${(data.imagen.includes('assets')) 
                                ? `<img class="mx-auto" src="/${data.imagen}" alt="${data.nombre}" />` 
                                : `<img class="mx-auto" src="${data.imagen}" alt="${data.nombre}" />`}
                            <h4><strong>${dataAutor.nombre + ' ' + dataAutor.apellido}</strong></h4>
                            <p class="text-muted">${dataAutor.nacionalidad}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;


    } catch (error) {
        console.error("Error al obtener los libros:", error);
    };
});