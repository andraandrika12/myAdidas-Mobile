const { getDb } = require('../config/mongo');
const { hashPassword } = require ('../helper/bcrypt');
const {ObjectId} = require ('mongodb')

class User {
  static async addUser({ username, email, password, phoneNumber, address }) {
    try {
      const db = getDb();
      const users = db.collection("User");

      const newUser = {
        username,
        email,
        password: hashPassword(password), 
        role: "Admin",
        phoneNumber,
        address,
      };

      const result = await users.insertOne(newUser);

      return result;
    } catch (error) {
        console.log(error)
    }
  }

  static async findAllUsers() {
    try {
      const db = getDb();
      const users = db.collection("User");
  
      const userList = await users.find({}, { projection: { password: 0 } }).toArray();
  
      return userList;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  

  static async getOneUser(userId) {
    try {
      const db = getDb();
      const users = db.collection("User");
      
      const user = await users.findOne({ _id: new ObjectId(userId)}, { projection: { password: 0 } }); 
  
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  

  static async deleteOneUser(userId) {
    try {
      const db = getDb();
      const users = db.collection("User");
  
      const result = await users.deleteOne({ _id: new ObjectId(userId) }); 
  
      return result.deletedCount;
    } catch (error) {
      console.log(error);
    }
  }
  
}


module.exports = User;
