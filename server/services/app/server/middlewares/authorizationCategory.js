// const { Category } = require("../models");

// async function authorization(req, res, next) {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
//     const findCategory = await Category.findByPk(id);

//     if (!findCategory) {
//       throw { name: "not_found", id: id };
//     }
//     if (req.user.role === "User") {
//       if (req.user.id !== findCategory.authorId) {
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
