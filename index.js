const express = require("express");
const g = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = require("graphql");
const app = express();

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "HelloWorld",
    fields: () => ({
      message: {
        type: GraphQLString,
        resolve: () => "test",
      },
      age: {
        type: GraphQLInt,
        resolve: () => {
          return 3;
        },
      },
    }),
  }),
});

app.use(
  "/abc",
  g.graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log(`Your App running on http:127.0.0.1:3000`);
});
