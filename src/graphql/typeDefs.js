// typedefs are created using gql (graph querying language)

const { gql } = require("apollo-server")

// type determins the schema, necessary for the resolvers 
// inputs represent the client side inputs
// queries read information 
// mutations write information

module.exports = gql`
type Receipe {
    name: String
    description: String
    createdAt: String
    thumbsUp: Int
    thumbsDown: Int 
}
input RecipeInput {
    name: String
    description: String
}
type Query {
    recipe(ID: ID!): Recipe!
    getRecipes(amount: Int): [Recipe]
}
type Mutation {
    createRecipe(recipeInput: RecipeInput): Recipe!
    deleteRecipe(ID: ID!): Boolean
    editRecipe(ID:ID!, recipeInput: RecipeInput): Boolean
}
`

// note the use of 'Number' in mongoose vs 'Int' in gql