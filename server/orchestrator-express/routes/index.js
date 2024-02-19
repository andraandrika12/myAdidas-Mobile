const express = require("express");
const UserController = require("../controllers/userController");
const ProductController = require("../controllers/productController");
const router = express.Router();

// USER

router.post("/user", UserController.addUser);
router.get("/user", UserController.findAllUser);
router.get("/user/:id", UserController.getOneUser);
router.delete("/user/:id", UserController.deleteOneUser);

// PRODUCT

router.get("/products", ProductController.getAllProducts);
router.post("/products", ProductController.addProduct);
router.get("/products/:id", ProductController.getOneProduct);
router.patch("/products/:id", ProductController.patchProduct);
router.delete("/products/:id", ProductController.deleteProduct);
router.get("/category", ProductController.getCategory);
router.get("/category/:id", ProductController.getOneCategory);
router.post("/category", ProductController.addCategory);
router.patch("/category/:id", ProductController.patchCategory);
router.delete("/category/:id", ProductController.deleteCategory);
router.get("/images", ProductController.getImages);
router.get("/images/:id", ProductController.getOneImage);

module.exports = router;
