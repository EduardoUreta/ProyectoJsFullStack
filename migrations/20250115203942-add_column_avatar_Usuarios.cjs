'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn("Usuarios", "avatar", { 
      type: Sequelize.STRING,
      defaultValue: "https://e7.pngegg.com/pngimages/340/946/png-clipart-avatar-user-computer-icons-software-developer-avatar-child-face-thumbnail.png",
    });
    queryInterface.addColumn("Libros", "imagen", {type: Sequelize.STRING});
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn("Usuarios", "avatar");
    queryInterface.removeColumn("Libros", "imagen");
  }
};
