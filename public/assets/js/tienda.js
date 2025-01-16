const bookCard = document.getElementById("bookCard");

document.addEventListener("DOMContentLoaded", async() => {

    try {
        const response = await fetch("/books", {
            method: "GET",
            headers: {'Content-Type':'application/json'}
        });

        const data = await response.json();

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
                    </div>
                </div>
            </div>
        `).join('');


    } catch (error) {
        console.error("Error al obtener los libros:", error);
    };

});