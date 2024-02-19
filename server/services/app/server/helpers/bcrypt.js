const bcrypt = require("bcryptjs");

const hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(8));
};

const comparePassword = (plainPassword, hashedPass) => {
  return bcrypt.compareSync(plainPassword, hashedPass);
};

module.exports = {
  hashPassword,
  comparePassword,
};