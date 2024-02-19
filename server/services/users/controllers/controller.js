const User  = require('../models/user');

class UserController {
  static async addUser(req, res) {
    try {
      const { username, email, password, role, phoneNumber, address } = req.body;

      if (!username || !email || !password || !phoneNumber || !address) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const user = await User.addUser({
        username,
        email,
        password,
        role,
        phoneNumber,
        address,
      });

      res.status(201).json({ message: `User ${username} is created` });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async findAll(req, res) {
    try {
      const users = await User.findAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: `Internal Server Error` });
    }
  }

  static async getOneUser(req, res) {
    try {
      const userId = req.params.id;
      const user = await User.getOneUser(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async deleteOneUser(req, res) {
    try {
      const userId = req.params.id;
      const deletedCount = await User.deleteOneUser(userId);

      if (deletedCount === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({ message: `User deleted successfully` });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = UserController;
