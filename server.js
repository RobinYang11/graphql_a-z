const { graphql, buildSchema } = require("graphql");
const g = require("express-graphql");
const express = require("express");

const app = express();

var schema = buildSchema(`
  type Query {
    books:[Book]
    users:[User]
    book(id:Int):Book
  }
  type Book{
    id:Int,
    name:String,
    price:Float,
  }
  type User{
    name:String,
    age:Int
  }
`);

const root = {
  books:()=>{
    return [{
      id:1,
      name:'《山海经》',
      price:333.3
    }]
  },
  hello: () => {
    return "hello world!";
  },
  users: () => {
    return [
      {
        name: "robin",
        age: 33,
      },
    ];
  },
};

app.use(
  "/graphql",
  g.graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000);

// var root = {
//   hello: () => {
//     return "Hello world!";
//   },
//   age: () => {
//     return 33;
//   },
//   users: () => {
//     return [
//       { name: "robin", age: 33 },
//       { name: "dvd", age: 32 },
//     ];
//   },
// };

// graphql(schema, "{hello,age}", root).then((res) => {
//   console.log(res);
// });
