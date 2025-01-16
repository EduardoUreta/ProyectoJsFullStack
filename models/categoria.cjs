'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { Libro } = models;

      // this.hasMany(Libro);
    }
  }
  Categoria.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        min: 3,
        max: 15
      }
    }
  }, {
    sequelize,
    modelName: 'Categoria',
    tableName: 'Categorias',
    paranoid: true
  });
  return Categoria;
};