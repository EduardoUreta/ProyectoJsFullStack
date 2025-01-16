'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Autor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { Libro } = models;
      
      this.hasMany(Libro);
    }
  }
  Autor.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nacionalidad: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Autor',
    paranoid: true
  });
  return Autor;
};