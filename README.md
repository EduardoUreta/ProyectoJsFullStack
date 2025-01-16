### Aplicación Full Stack con Node.js

## Instrucciones

# Modificar .env con datos de tu conexión local
Debes modificar el DB_USER, DB_PASSWORD Y JWT_SECRET

# Instalar dependencias
npm i

# Crear BD
npx sequelize db:create

# Ejecutar migraciones
npx sequelize db:migrate

# Ejecutar seeder
npx sequelize db:seed:all

# Ejecutar aplicacion
npn run dev
