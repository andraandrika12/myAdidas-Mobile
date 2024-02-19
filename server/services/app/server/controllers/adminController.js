const { comparePassword } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt");
const { User, Product, Category, Image, sequelize } = require("../models");

class Controller {
  // static async register(req, res, next) {
  //   try {
  //     const { email, password, phoneNumber, address } = req.body;

  //     const user = await User.create({
  //       email,
  //       password,
  //       phoneNumber,
  //       role: "Admin",
  //       address,
  //     });

  //     res.status(201).json({ message: `Email ${email} is created` });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // static async login(req, res, next) {
  //   const { email, password } = req.body;

  //   try {
  //     if (req.body !== null) {
  //       let user = await User.findOne({ where: { email } });

  //       if (!user) {
  //         throw { name: "Invalid login" };
  //       }

  //       const isPasswordValid = comparePassword(password, user.password);
  //       if (!isPasswordValid) {
  //         throw { name: "Invalid login" };
  //       }

  //       const access_token = signToken({ id: user.id });
  //       res.status(200).json({ access_token });
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  static async getAllProducts(req, res, next) {
    try {
      const showProducts = await Product.findAll({
        include: [
          {
            model: Category,
            attributes: ["name"],
          },
          {
            model: User,
            attributes: {exclude: ['password', 'createdAt', 'updatedAt']},
          },
          {
            model: Image,
            attributes: ["imgUrl"],
          }
        ],
        order: [["id", "ASC"]]
      });

      res.status(200).json(showProducts);
    } catch (error) {
      next(error);
    }
  }

  static async getOneProduct(req, res, next) {
    try {
      let productById = +req.params.id;
      let product = await Product.findByPk(productById, {
        include: [
          {
            model: Category,
            attributes: ["name"],
          },
          {
            model: User,
            attributes: ["email"],
          },
          {
            model: Image,
            attributes: ["imgUrl"],
          }
        ],
      });

      if (!product) {
        throw { name: "Invalid detail" };
      } else {
        res.status(200).json(product);
      }
    } catch (error) {
      next(error);
    }
  }

  static async addProduct(req, res, next) {
    let transaction = await sequelize.transaction()
    const { name, description, price, mainImg, categoryId, userMongoId, authorId, newImage1, newImage2, newImage3 } = req.body;
    let slug = name.split(" ").join("-")
    
    try {
      const addNewProduct = await Product.create({
        name,
        slug,
        description,
        price,
        mainImg,
        categoryId,
        userMongoId,
        authorId
      }, { transaction: transaction });

      let imageData = [
        {
          imgUrl: newImage1,
          productId: addNewProduct.id
        },
        {
          imgUrl: newImage2,
          productId: addNewProduct.id
        },
        {
          imgUrl: newImage3,
          productId: addNewProduct.id
        }
      ]

      let newAddImage = await Image.bulkCreate(imageData, { transaction: transaction })

      await transaction.commit()
      res.status(201).json({ addNewProduct, newAddImage });
    } catch (error) {
      await transaction.rollback()
      next(error);
    }
  }

  static async patchProduct(req, res, next) {
    let transaction = await sequelize.transaction()
    const { id }  = req.params;
    const { name, description, price, mainImg, categoryId, userMongoId } = req.body;
    let slug = name.split(" ").join("-")

    try {
      
      const findProduct = await Product.findByPk(id);
      console.log(findProduct,"<<<<<<<<<<<")
      if (!findProduct) {
        throw { name: "invalid update", id };
      }
      await Product.update({ name, slug, description, price, mainImg, categoryId, userMongoId },
        {
          where: { id: id },
          transaction: transaction
        }
      );

      await transaction.commit()
      res.status(200).json({ message: `Product status on ${id} has been updated` });
    } catch (error) {
      await transaction.rollback()
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      let productId = +req.params.id;
      let product = await Product.findByPk(productId);
      if (!product) {
        throw { name: "Invalid delete" };
      } else {
        await product.destroy();
        res.json({ message: `${product.name} success to delete` });
      }
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

  static async getOneCategory(req, res, next) {
    try {
      let categoryById = +req.params.id;
      let category = await Category.findByPk(categoryById);

      if (!category) {
        throw { name: "Invalid detail" };
      } else {
        res.status(200).json(category);
      }
    } catch (error) {
      next(error);
    }
  }

  static async addCategory(req, res, next) {
    try {
      const { name } = req.body;

      const category = await Category.create({ name });

      res.status(201).json({ message: `Category ${category.name} is created!` });
    } catch (error) {
      next(error);
    }
  }

  static async patchCategory(req, res, next) {
    let transaction = await sequelize.transaction()
    const { id }  = req.params;
    const { name } = req.body;
    let slug = name.split(" ").join("-")

    try {
      
      const findCategory = await Category.findByPk(id);
      console.log(findCategory,"<<<<<<<<<<<")
      if (!findCategory) {
        throw { name: "invalid update", id };
      }
      await Category.update({ name },
        {
          where: { id: id },
          transaction: transaction
        }
      );

      await transaction.commit()
      res.status(200).json({ message: `Category status on ${id} has been updated` });
    } catch (error) {
      await transaction.rollback()
      next(error);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      let categoryId = +req.params.id;
      let category = await Category.findByPk(categoryId);
      if (!category) {
        throw { name: "Invalid delete" };
      } else {
        await category.destroy();
        res.json({ message: `${category.name} success to delete` });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getImages(req, res, next) {
    try {
      const showImages = await Image.findAll();

      res.status(200).json(showImages);
    } catch (error) {
      next(error);
    }
  }

  static async getOneImage(req, res, next) {
    try {
      const imageDetail = await Image.findByPk(req.params.id);

      res.status(200).json(imageDetail);
    } catch (error) {
      next(error);
    }
  }


}

module.exports = Controller;
