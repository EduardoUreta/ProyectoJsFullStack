const navbar = document.getElementById("Navbar");

document.addEventListener("DOMContentLoaded", () => {
    if(document.cookie){  
        const token = document.cookie.split('; ').find(row => row.startsWith('Bearer=')).split('=')[1];
        const user = parseJwt(token);
        const isAdmin = (user.role == "admin") ? true : false;

        const navAdmin = `
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Administrador
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/agregar-libro">Agregar Libro</a></li>
                    <li><a class="dropdown-item" href="/listado-libro">Listado Libros</a></li>
                </ul>
            </li>
        `;

        navbar.innerHTML = `
            <div class="container-fluid">
                <img src="/favicon.ico" class="img-fluid" style="height: 50px;">
                <a class="navbar-brand" href="/">Biblioteca</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/">Inicio</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/tienda">Tienda</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/perfil/${user._id}">Perfil</a>
                        </li>
                        ${isAdmin ? navAdmin : null}
                        <li class="nav-item"> 
                            <a class="nav-link" href="#" id="logoutButton">Cerrar Sesión</a>
                        </li>
                    </ul>
                </div>
            </div>
        `;
    } else {
        navbar.innerHTML = `
            <div class="container-fluid">
                <img src="/favicon.ico" class="img-fluid" style="height: 50px;">
                <a class="navbar-brand" href="/">Biblioteca</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/">Inicio</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/tienda">Tienda</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/registro">Registro</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/login">Login</a>
                        </li>
                    </ul>
                </div>
            </div>
        `;
    }
});

function parseJwt(token) {
    if (!token) {
        return;
    }
    const base64Url = token.split(".")[1]; // Obtiene la segunda parte del token (payload)
    const base64 = base64Url.replace("-", "+").replace("_", "/"); // Decodifica el base64Url para que tenga el formato estándar
    return JSON.parse(window.atob(base64)); // Convierte el base64 a JSON y lo parsea
}
  