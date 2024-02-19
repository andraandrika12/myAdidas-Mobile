'use strict';
const { hashPassword } = require('../helpers/bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {

    let data = require('../db.json')

    let dataUser = data.users
    dataUser.forEach(el => {
      delete el.id;
      el.password = hashPassword(el.password)
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Users', dataUser)

    let dataCategory = data.categories
    dataCategory.forEach(el => {
      delete el.id;
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Categories', dataCategory)

    let dataProduct = data.products
    dataProduct.forEach(el => {
      delete el.id;
      el.slug = el.name.toLowerCase().replace(/\s+/g, "-");
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Products', dataProduct)

    let dataImage = data.images
    dataImage.forEach(el => {
      delete el.id;
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Images', dataImage)
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
    await queryInterface.bulkDelete('Categories', null, {})
    await queryInterface.bulkDelete('Products', null, {})
    await queryInterface.bulkDelete('Images', null, {})
    await queryInterface.bulkDelete('userMongoId', null, {})



  }
};
