'use strict';

const { hash } = require("argon2");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {

    static associate(models) {
      const { Libro, LibrosUsuario } = models;

      this.belongsToMany(Libro, {through: LibrosUsuario});
    }
  }
  Usuario.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Ingresa un correo válido"
        }
      }
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 6,
        max: 12
      }
    },
    role: {
      type: DataTypes.ENUM('admin','user'),
      allowNull: false,
      defaultValue: 'user'
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: "https://e7.pngegg.com/pngimages/340/946/png-clipart-avatar-user-computer-icons-software-developer-avatar-child-face-thumbnail.png"
    }
  }, {
    sequelize,
    modelName: 'Usuario',
    paranoid: true,
    hooks: {
      beforeSave: async (user, options) => {
        if(user.changed('contrasena')){
          user.contrasena = await hash(user.contrasena);
        }
      }
    }
  });
  return Usuario;
};