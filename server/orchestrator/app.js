require('dotenv').config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require('@apollo/server/standalone')
const { typeDefs: userTypeDefs , resolvers: userResolvers} = require('./schema/user')
const { typeDefs: productTypeDefs, resolvers: productResolvers} = require('./schema/product')

const server = new ApolloServer({
    typeDefs: [userTypeDefs, productTypeDefs],
    resolvers: [userResolvers, productResolvers],
    introspection: true
})

startStandaloneServer(server, {
    listen: { port: process.env.PORT || 4000},
}).then(({ url }) => { 
    console.log(`Server ready on ${url}`)
})