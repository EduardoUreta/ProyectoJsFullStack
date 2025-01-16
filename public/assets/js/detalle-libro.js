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

            <div class="container p-3">
                <button class="btn btn-success btn-lg" id="btnComprar-${data.id}">Comprar</button>
            </div>
        `;

        document.getElementById(`btnComprar-${data.id}`).addEventListener("click", async (e) => {
            if(document.cookie){
                const token = document.cookie.split('; ').find(row => row.startsWith('Bearer=')).split('=')[1];
                const user = parseJwt(token);
    
                const UsuarioId = user._id;
                const LibroId = data.id;
    
                try {
    
                    const response = await fetch(`/purchases/`, {
                        method: "POST",
                        headers: {'Content-Type':'application/json'},
                        body: JSON.stringify({UsuarioId, LibroId})
                    });
            
                    Swal.fire({
                        title: `¡Compraste el libro: ${data.nombre}!`,
                        text: "Te redirigiremos a la sección tienda",
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                    setTimeout(() => {
                        window.location.replace("/tienda"); 
                    }, 5000);
            
                } catch (error) {
                    Swal.fire({
                        title: 'Error en el servidor',
                        icon: 'error',
                        text: 'Intenta más tarde',
                        confirmButtonText: 'Aceptar'
                    });
                    setTimeout(() => {
                        // window.location.href = `/detalle-libro/${LibroId}`;
                    }, 2500);
                };

            } else {
                Swal.fire({
                    title: "Debes iniciar sesión para comprar",
                    showDenyButton: true,
                    confirmButtonText: "Ir a login",
                    denyButtonText: `Cancelar`
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      window.location.replace("/login");
                    } 
                  });
                
            }
            
            
        });



    } catch (error) {
        console.error("Error al obtener los libros:", error);
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
  