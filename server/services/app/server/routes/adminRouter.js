const express = require("express");
// const authentication = require("../middlewares/authentication");
// const authorizationProduct = require("../middlewares/authorizationProduct");
// const authorizationCategory = require("../middlewares/authorizationCategory");
const Controller = require("../controllers/adminController");
const userRouter = require("./userRouter");
const router = express.Router();


router.use("/user", userRouter);

// Admin //
// router.post("/register", Controller.register);
// router.post("/login", Controller.login);
// router.use(authentication);
router.get("/products", Controller.getAllProducts);
router.post("/products", Controller.addProduct);
router.get("/products/:id", Controller.getOneProduct);
router.patch("/products/:id", Controller.patchProduct);
router.delete("/products/:id", Controller.deleteProduct);
router.get("/category", Controller.getCategory);
router.get("/category/:id", Controller.getOneCategory);
router.post("/category", Controller.addCategory);
router.patch("/category/:id", Controller.patchCategory);
router.delete("/category/:id", Controller.deleteCategory);
router.get("/images", Controller.getImages);
router.get("/images/:id", Controller.getOneImage);

module.exports = router;
