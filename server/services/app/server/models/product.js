'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    Product.belongsTo(models.User, { foreignKey: "authorId" })
    Product.belongsTo(models.Category, { foreignKey: "categoryId" })
    Product.hasMany(models.Image, { foreignKey: "productId" })
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name cannot be empty",
        },
        notEmpty: {
          msg: "Name cannot be empty",
        },
      },
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Slug cannot be empty",
        },
        notEmpty: {
          msg: "Slug cannot be empty",
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Description cannot be empty",
        },
        notEmpty: {
          msg: "Description cannot be empty",
        },
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Price cannot be empty",
        },
        notEmpty: {
          msg: "Price cannot be empty",
        },
        min: {
          args: 100000,
          msg: "Price cannot be lower than Rp100,000"
        }
      },
    },
    mainImg: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "MainImg cannot be empty",
        },
        notEmpty: {
          msg: "MainImg cannot be empty",
        },
      },
    },
    categoryId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    userMongoId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};