'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Visitor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Visitor.hasMany(models.Rent, { foreignKey: "UserId" })
    }
  };
  Visitor.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'name is required' },
        notEmpty: { msg: 'name cant be empty' }
      }
    }
  }, {
    sequelize,
    modelName: 'Visitor',
  });
  return Visitor;
};