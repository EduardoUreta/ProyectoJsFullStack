'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Libro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { Categoria, Autor, LibrosUsuario, Usuario } = models;

      this.belongsToMany(Usuario, { through: LibrosUsuario });
      this.belongsTo(Categoria, {
        foreignKey: 'CategoriaId'
      });
      this.belongsTo(Autor, {
        foreignKey: 'AutorId'
      });
    }
  }
  Libro.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    CategoriaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Categorias',
        key: "id"
      }
    },
    AutorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Autors',
        key: "id"
      }
    },
    imagen: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Libro',
    paranoid: true
  });
  return Libro;
};