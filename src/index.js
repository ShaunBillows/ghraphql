const { ApolloServer } = require("apollo-server");
const mogoose = require("mongoose");
require("dotenv").config();
MONGODB = process.env.MONGODB;
PORT = 5001;

const typeDefs = require("./graphql/typeDefs"); // GraphQL type definitions
const resolvers = require("./graphql/resolvers"); // How we resolve queries / mutations
const { default: mongoose } = require("mongoose");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("Conection sucessful.");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
