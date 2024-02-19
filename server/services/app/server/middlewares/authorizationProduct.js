// const { Product } = require("../models");

// async function authorization(req, res, next) {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
//     const findProduct = await Product.findByPk(id);

//     if (!findProduct) {
//       throw { name: "not_found", id: id };
//     }
//     if (req.user.role === "User") {
//       if (req.user.id !== findProduct.authorId) {
//         throw { name: "forbidden", id: id };
//       } else {
//         next();
//       }
//     } else if (req.user.role === "Admin") {
//       next();
//     }
//   } catch (error) {
//     next(error);
//   }
// }

// module.exports = authorization;
