const { Product, Category, Image } = require("../models");

class UserController {
  static async getUserProducts(req, res, next) {
    try {
      const showProducts = await Product.findAll();

      res.status(200).json(showProducts);
    } catch (error) {
      next(error);
    }
  }

  static async getOneUserProduct(req, res, next) {
    try {
      const productDetail = await Product.findByPk(req.params.id, {
        include: [
          {
            model: Image,
            attributes: ["imgUrl"],
          }
        ],
      });

      res.status(200).json(productDetail);
    } catch (error) {
      next(error);
    }
  }

  static async getCategory(req, res, next) {
    try {
      const showCategories = await Category.findAll();

      res.status(200).json(showCategories);
    } catch (error) {
      next(error);
    }
  }

  static async getProductByCategoryId(req, res, next) {
    const { id } = req.params; 
  
    try {
      const categories = await Category.findAll();
      const categoryMap = {};
      for (const category of categories) {
        categoryMap[category.id] = category.name;
      }
  
      const products = await Product.findAll({
        where: {
          categoryId: id
        }
      });
  
      const productsWithCategoryName = products.map(product => {
        return {
          ...product.get(),
          categoryName: categoryMap[product.categoryId]
        };
      });
  
      res.status(200).json(productsWithCategoryName);
    } catch (error) {
      next(error);
    }
  }
  
}

module.exports = UserController;
