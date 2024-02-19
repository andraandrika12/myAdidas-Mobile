const express = require("express");
const UserController = require("../controllers/controller");
const router = express.Router();

router.post("/user", UserController.addUser);
router.get("/user", UserController.findAll);
router.get("/user/:id", UserController.getOneUser);
router.delete("/user/:id", UserController.deleteOneUser);

module.exports = router;
