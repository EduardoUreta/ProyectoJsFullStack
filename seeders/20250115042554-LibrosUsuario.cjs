'use strict';

const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    let LibrosUsuarios = [];

    for (let i = 0; i < 6; i++) {
      let LibroUsuario = {};
      LibroUsuario.UsuarioId = Math.ceil(Math.random() * 4);
      LibroUsuario.LibroId = Math.ceil(Math.random() * 4);
      LibroUsuario.createdAt = new Date();
      LibroUsuario.updatedAt = new Date();

      LibrosUsuarios.push(LibroUsuario);
    }

    await queryInterface.bulkInsert('LibrosUsuarios', LibrosUsuarios);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('LibrosUsuarios', null, {});
  }
};
