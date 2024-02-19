const { gql } = require('apollo-server');
const axios = require("axios");
const Redis = require('ioredis');
const redis = new Redis({
  port: 14513,
  host: "redis-14513.c295.ap-southeast-1-1.ec2.cloud.redislabs.com", 
  password: process.env.PASSWORD,
});


const USER_SERVICE_URLBASE = "http://user-service:4001" || process.env.USER_URL;

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    role: String
    phoneNumber: String
    address: String
  }

  type Query {
    getAllUsers: [User]
    getUser(id: ID!): User
  }

  type Message {
    msg: String
  }

  type Mutation {
    addUser(
      username: String
      email: String
      password: String
      role: String
      phoneNumber: String
      address: String
    ): Message
    deleteUser(id: ID!): Message
  }
`;

const resolvers = {
  Query: {
    getAllUsers: async () => {
      try {
        const cachedUsers = await redis.get("allUsers");
  
        if (!cachedUsers) {
          const response = await axios.get(USER_SERVICE_URLBASE + `/user`);
  
          await redis.set("allUsers", JSON.stringify(response.data));
  
          return response.data.map(user => ({
            ...user,
            id: user._id 
          }));
        } else {
          return JSON.parse(cachedUsers);
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    getUser: async (_, { id }) => {
      try {
        const cachedUser = await redis.get(`user:${id}`);
    
        if (!cachedUser) {
          const response = await axios.get(USER_SERVICE_URLBASE + `/user/${id}`);
    
          if (response.status === 200) {
            await redis.set(`user:${id}`, JSON.stringify(response.data));
            return response.data;
          } else {
            throw new Error(`User not found: ${id}`);
          }
        } else {
          return JSON.parse(cachedUser);
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    
  },
  Mutation: {
    addUser: async (_, args) => {
      try {
        const { username, email } = args; 
    
   
        const cachedUser = await redis.get(`user:${username}:${email}`);
    
        if (!cachedUser) {
     
          const response = await axios.post(USER_SERVICE_URLBASE + '/user', {
      
            username,
            email,
            password: args.password,
            role: args.role,
            phoneNumber: args.phoneNumber,
            address: args.address
          });
    
          await redis.set(`user:${username}:${email}`, JSON.stringify(response.data));
    
         
          await redis.del("allUsers");
    
          return {msg: "add user success"}
        } else {
          return JSON.parse(cachedUser); 
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    
    
    deleteUser: async (_, { id }) => {
      try {
        const response = await axios.delete(USER_SERVICE_URLBASE + `/user/${id}`);
    
        if (response.status === 200) {
          await redis.del(`user:${id}`);
          await redis.del("allUsers");
        }
    
        return {msg: "delete user success"}
      } catch (error) {
        throw new Error(error.message);
      }
    },
    
  },
};

module.exports = { typeDefs, resolvers };
