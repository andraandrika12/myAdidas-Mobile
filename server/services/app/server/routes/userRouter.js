const express = require("express");
const UserController = require("../controllers/userController");
const userRouter = express.Router();

userRouter.get("/products", UserController.getUserProducts);
userRouter.get("/products/:id", UserController.getOneUserProduct);
userRouter.get("/category", UserController.getCategory);
userRouter.get("/products/category/:id", UserController.getProductByCategoryId);

module.exports = userRouter;
