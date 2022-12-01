const Recipe = require("../model/recipe");

// resolvers can take 4 optional args (parent (here we use '_' as a placeholder), args: object, context, info)
module.exports = {
  Query: {
    recipe: async (_, { ID }) => {
      try {
        return await Recipe.findById(ID);
      } catch (error) {
        console.log(error);
      }
    },
    getRecipes: async (_, { amount }) => {
      try {
        return await Recipe.find().sort({ createdAt: -1 }).limit(amount); // returns 'amount' most recent recipes
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    createRecipe: async (_, { recipeInput: { name, description } }) => {
      // 2x object destructuring
      try {
        const createdRecipe = new Recipe({
          name: name,
          description: description,
          createdAt: new Date().toISOString(),
          thumbsUp: 0,
          thumbsDown: 0,
        });
        const res = await createdRecipe.save(); // adds document to collection
        return {
          id: res.id,
          ...res._doc,
        };
      } catch (error) {
        console.log(error);
      }
    },
    deleteRecipe: async (_, { ID }) => {
      try {
        const wasDeleted = (await Recipe.deleteOne({ _id: ID })).deletedCount;
        return wasDeleted; // returns 1 if something was deleted and 0 if nothing was deleted
      } catch (error) {
        console.log(error);
      }
    },
    editRecipe: async (_, { ID, recipeInput: { name, description } }) => {
      try {
        const wasEditied = (
          await Recipe.updateOne(
            { _id: ID },
            { name: name, description: description }
          )
        ).modifiedCount;
        return wasEditied;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
