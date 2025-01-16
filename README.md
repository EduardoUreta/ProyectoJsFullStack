# Aplicación Full Stack con Node.js

Este es un proyecto de aplicación web full stack construido con Node.js, express, Sequelize con Postgres, HTML, CSS, JavaScript, Bootstrap 5, además de librerias y dependencias como jsonwebtoken, argon2, cookie-parser, multer y sweetalert2. La aplicación permite gestionar una tienda de libros, con funcionalidades de usuario regular y administrador.

## Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- **Node.js** (version 14 o superior)
- **npm** (gestor de paquetes de Node.js)
- **PostgreSQL**

## Configuración del Proyecto

### 1. Configuración de variables de entorno

Debes crear un archivo `.env` en la raíz del proyecto con los siguientes parámetros:

```env
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nombre_de_tu_base_de_datos
JWT_SECRET=tu_secreto_de_jwt
```

### 2. Instalación de dependencias

Ejecuta el comando:
    npm install

### 3. Crear la base de datos
Ejecuta el siguiente comando para crear la base de datos,según la configuración del .env:
    npx sequelize db:create

### 4. Ejecutar migraciones
Ejecuta las migraciones para crear las tablas en la base de datos:
    npx sequelize db:migrate

### 5. Ejecutar Seeder
Para poblar la base de datos con datos iniciales, ejecuta el siguiente comando:
    npx sequelize db:seed:all

### 6. Ejecutar la aplicación
Para iniciar la aplicación, usa el siguiente comando:
    npm run dev

La aplicación estará disponible en http://localhost:3000.

### 7. Registro

#### 1. Registro de usuario:
Navega a http://localhost:3000/registro y crea una cuenta.
Después de registrarte, puedes modificar el rol del usuario a admin usando Postman o DBeaver para acceder a funcionalidades administrativas.

#### 2. Inicia sesión
Navega a http://localhost:3000/login y utiliza las credenciales del usuario que registraste. Si el rol es admin, tendrás acceso a las funciones exclusivas para administradores.


### 8. Páginas
- Inicio: Página principal de la aplicación.
- Login: Página para que los usuarios inicien sesión con sus credenciales.
- Registro: Página para registrar nuevos usuarios en el sistema.
- Tienda: Página donde se listan los libros disponibles para compra.
- Detalle de libro: Página que muestra la información detallada de cada libro. La compra está restringida a usuarios logueados.
- Perfil de usuario: Página donde el usuario puede ver y actualizar su propia información. Accesible solo para el propio usuario.
- Administrador: accesible solo para usuarios con rol admin.
    - Agregar libros: Funcionalidad para que el administrador pueda agregar nuevos libros a la tienda.
    - Listado de libros: Funcionalidad para listar todos los libros disponibles en la tienda.
        - Actualizar libros: Opción para que el administrador actualice los detalles de un libro existente.
        - Eliminar libros: Opción para que el administrador elimine un libro de la tienda.
