// const { verifyToken } = require("../helpers/jwt");
// const { User } = require('../models')

// async function authentication(req, res, next) {
  
//     try {
//         const { access_token } = req.headers;
//         if(!access_token){
//             throw { name: "unauthenticated"}
//         }

//         const payload = verifyToken(access_token);
 
//         const findUser = await User.findByPk(payload.id)
//         if (!findUser) {
//             throw { name: "unauthenticated"}
//         }

//         req.user = {
//             id: findUser.id,
//             email: findUser.email,
//             password: findUser.password,
//             role: findUser.role,
//             phoneNumber: findUser.phoneNumber,
//             address: findUser.address
//         };

//         next();

        
//     } catch (error) {
//         next(error);
//     }
// }

// module.exports = authentication;