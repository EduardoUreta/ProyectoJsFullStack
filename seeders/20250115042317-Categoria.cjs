'use strict';

const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    let categorias = [];

    for (let i = 0; i < 4; i++) {
      let categoria = {};
      categoria.nombre = faker.book.genre();
      categoria.createdAt = new Date();
      categoria.updatedAt = new Date();

      categorias.push(categoria);
    }

    await queryInterface.bulkInsert('Categorias', categorias);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categorias', null, {});
  }
};
