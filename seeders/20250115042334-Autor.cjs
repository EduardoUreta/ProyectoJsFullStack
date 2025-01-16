'use strict';

const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    let autores = [];

    for (let i = 0; i < 6; i++) {
      let autor = {};
      autor.nombre = faker.person.firstName();
      autor.apellido = faker.person.lastName();
      autor.nacionalidad = faker.location.country();
      autor.createdAt = new Date();
      autor.updatedAt = new Date();

      autores.push(autor);
    }

    await queryInterface.bulkInsert('Autors', autores);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Autors', null, {});
  }
};
