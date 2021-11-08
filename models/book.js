'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.hasMany(models.Rent, { foreignKey: "BookId" })
    }
  };
  Book.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'name is required' },
        notEmpty: { msg: 'name cant be empty' }
      }
    },
    genre: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'genre is required' },
        notEmpty: { msg: 'genre cant be empty' }
      }
    }
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};