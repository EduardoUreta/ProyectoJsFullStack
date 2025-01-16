'use strict';

const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    let libros = [];

    for (let i = 0; i < 6; i++) {
      let libro = {};
      libro.nombre = faker.book.title();
      libro.descripcion = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.";
      libro.CategoriaId = Math.ceil(Math.random() * 4);
      libro.AutorId = Math.ceil(Math.random() * 4);
      libro.createdAt = new Date();
      libro.updatedAt = new Date();

      libros.push(libro);
    }

    await queryInterface.bulkInsert('Libros', libros);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Libros', null, {});
  }
};
