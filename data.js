const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} = require("graphql");
const express = require("express");
const g = require("express-graphql");
const app = express();

const authors = [
  { id: 1, name: "j" },
  { id: 2, name: "k" },
  { id: 3, name: "l" },
];

const books = [
  { id: 1, name: "bckde", aid: 1 },
  { id: 2, name: "adsf", aid: 2 },
  { id: 3, name: "asdf", aid: 3 },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "Book type",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
    aid: {
      type: GraphQLNonNull(GraphQLInt),
    },
    author: {
      type: AuthorType,
      resolve: (book) => {
        return authors.find((a) => a.id === book.aid);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "Author type",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: (author) => {
        return books.find((book) => book.aid === author.id);
      },
    },
  }),
});

const rootQuery = new GraphQLObjectType({
  name: "Query",
  description: "root query",
  fields: () => ({
    book: {
      type: BookType,
      description: "A single Book",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) => {
        console.log(parent);
        console.log(args);
        return books.find((book) => book.id === args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      description: "book list",
      resolve: () => books,
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: "book list",
      resolve: () => authors,
    },
    author: {
      type: AuthorType,
      description: "A single Author",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) =>
        authors.find((author) => author.id === args.id),
    },
  }),
});

const schema = new GraphQLSchema({
  query: rootQuery,
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
