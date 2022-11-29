// Getting Started With GraphQL.js

// To handle GraphQL queries, we need a schema that defines the Query type, and we need an API root with a function called a “resolver” for each API endpoint.

var { graphql, buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The rootValue provides a resolver function for each API endpoint
var rootValue = {
  hello: () => {
    return 'Hello world!';
  },
};

// Run the GraphQL query '{ hello }' and print out the response
graphql({
  schema,
  source: '{ hello }', // { hello } is the graphql query the result is { data: { hello: 'Hello world!' } }
  rootValue
}).then((response) => {
  console.log(response);
});

// For practical applications, you'll probably want to run GraphQL queries from an API server, rather than executing GraphQL with a command line tool. To use GraphQL for an API server over HTTP, check out Running an Express GraphQL Server.
