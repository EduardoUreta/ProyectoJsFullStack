'use strict';

const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    let usuarios = [];

    for (let i = 0; i < 6; i++) {
      let usuario = {};
      usuario.nombre = faker.person.firstName();
      usuario.apellido = faker.person.lastName();
      usuario.correo = faker.internet.email();
      usuario.contrasena = faker.internet.password();
      usuario.createdAt = new Date();
      usuario.updatedAt = new Date();

      usuarios.push(usuario);
    }

    await queryInterface.bulkInsert('Usuarios', usuarios);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuarios', null, {});
  }
};
