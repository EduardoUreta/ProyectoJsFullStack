'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LibrosUsuario extends Model {
    static associate(models) {

    }
  }
  LibrosUsuario.init({
    UsuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuarios',
        key: 'id'
      }
    },
    LibroId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Libros',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'LibrosUsuario',
    paranoid: true
  });
  return LibrosUsuario;
};