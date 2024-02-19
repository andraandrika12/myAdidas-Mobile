const axios = require("axios");
const USER_SERVICE_URLBASE = "http://localhost:4001";
const Redis = require('ioredis');
const redis = new Redis();

class UserController {
static async addUser(req, res) {
    try {
      await axios.post(USER_SERVICE_URLBASE + '/user')

      await redis.del("allUsers")

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  static async findAllUser(req, res) {
    try {
      let cachedUsers = await redis.get("allUsers");

      if (!cachedUsers) {
        const response = await axios.get(USER_SERVICE_URLBASE + `/user`);

        cachedUsers = response.data 

        await redis.set("allUsers", JSON.stringify(response.data));

        res.status(response.status).json(response.data);
      } else {
        cachedUsers = JSON.parse(cachedUsers);
      }
      res.status(200).json(cachedUsers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getOneUser(req, res) {
    try {
      const { id } = req.params;
      const cachedUser = await redis.get(`user:${id}`);

      if (!cachedUser) {
        const response = await axios.get(USER_SERVICE_URLBASE + `/user/${id}`);

       
        await redis.set(`user:${id}`, JSON.stringify(response.data));

        res.status(response.status).json(response.data);
      } else {
        const user = JSON.parse(cachedUser);
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteOneUser(req, res) {
    try {
      const { id } = req.params;
      const response = await axios.delete(USER_SERVICE_URLBASE + `/user/${id}`);

      if (response.status === 200) {
      
        await redis.del(`user:${id}`);
        
        await redis.del("allUsers")

        res.status(response.status).json(response.data);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;
