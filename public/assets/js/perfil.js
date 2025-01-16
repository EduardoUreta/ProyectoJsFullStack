const perfil = document.getElementById("Perfil");

document.addEventListener("DOMContentLoaded", async () => {

    const id = window.location.pathname.split("/").pop();

    try {
        const response = await fetch(`/users/${id}`, {
            method: "GET",
            headers: {'Content-Type':'application/json'}
        });

        const data = await response.json(); 

        const responsePurchase = await fetch(`/users/purchases/${id}`, {
            method: "GET",
            headers: {'Content-Type':'application/json'}
        });

        const dataResponsePurchase = await responsePurchase.json();

        console.log(dataResponsePurchase);

        let librosComprados = dataResponsePurchase.map(libro => `
            <li class="text-muted">${libro.nombre}</li>
        `).join(' ');

        if(dataResponsePurchase.length == 0) {
            librosComprados = "";
        };
        

        perfil.innerHTML = `
           <div class="container p-5" style="text-align: -webkit-center;">
                <div class="card p-3 w-75" style="border-radius: 10px; box-shadow: 0 4px 10px rgba(2, 8, 23, 1);">
                    <div class="text-center">
                        <div class="team-member text-light">
                            <img class="mx-auto rounded-circle" src="${data.avatar}" alt="${data.nombre}" style="border: 4px solid #f8f9fa; padding: 2px;" />
                        </div>
                    </div>
                    <div class="text-center mt-2">
                        <h2 class="section-heading text-uppercase text-warning"><strong>${data.nombre + ' ' + data.apellido}</strong></h2>
                        <h3 class="section-subheading text-light">${data.correo}</h3>
                        <p class="text-muted">Rol: ${data.role}</p>
                        <hr/>
                        <h3>Libros comprados: ${dataResponsePurchase.length}</h3>
                        <div>
                            ${librosComprados}
                        </div>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
    };

});