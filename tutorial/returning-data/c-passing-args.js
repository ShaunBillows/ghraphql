// Passing Arguments - roll dice api

// Just like a REST API, it's common to pass arguments to an endpoint in a GraphQL API. By defining the arguments in the schema language, typechecking happens automatically. Each argument must be named and have a type.

// eg.1 types - variable

// type Query {
//     rollThreeDice: [Int]
//   }

// eg.2 types - function w/ args

// type Query {
//     rollDice(numDice: Int!, numSides: Int): [Int]  ==>  Int!: ! means cannot be null, [Int]: a list of ints
//   }

// Aside: Types.  The GraphQL schema language supports the scalar types of String, Int, Float, Boolean, and ID, so you can use these directly in the schema you pass to buildSchema.  By default, every type is nullable - it's legitimate to return null as any of the scalar types. Use an exclamation point to indicate a type cannot be nullable, so String! is a non-nullable string.  To use a list type, surround the type in square brackets, so [Int] is a list of integers.

// So far, our resolver functions took no arguments. When a resolver takes arguments, they are passed as one “args” object, as the first argument to the function. So rollDice could be implemented as:




// The entire code for a server that hosts this rollDice API is:

var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
    rollDice: ({numDice, numSides}) => { // note how we use ES6 destructuring to clearly define the arguments
      var output = [];
      for (var i = 0; i < numDice; i++) {
        output.push(1 + Math.floor(Math.random() * (numSides || 6)));
      }
      return output;
    }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');





// Calling the api


// Testing with GraphiQL @ http://localhost:4000/graphql:

// {
//     rollDice(numDice: 3, numSides: 6)
// }


// With JavaScript

// var dice = 3;
// var sides = 6;
// var query = `query RollDice($dice: Int!, $sides: Int) {
//   rollDice(numDice: $dice, numSides: $sides)
// }`;

// fetch('/graphql', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   },
//   body: JSON.stringify({
//     query,
//     variables: { dice, sides },
//   })
// })
//   .then(r => r.json())
//   .then(data => console.log('data returned:', data));


// Important security note

// When you're passing arguments in code, it's generally better to avoid constructing the whole query string yourself. Instead, you can use $ syntax to define variables in your query, and pass the variables as a separate map.

// Using $dice and $sides as variables in GraphQL means we don't have to worry about string escaping on the client side.
