import dbUri from "./config/config";

const { ApolloServer } = require("apollo-server");
const express = require("express");
const mongoose = require("mongoose");
const { typeDefs } = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const app = express();
// const express_graphl = require("express-graphql");
const session = require("express-session");

const cors = require("cors");

import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});
app.use(cors());
// app.use(session({ secret: "kelvin", cookie: { maxAge: 60000 } }));

mongoose.connect(dbUri, { useNewUrlParser: true }).then(() => {
  console.log("Connected");
  return app.listen(
    { port: 4000 },
    console.log(`Server running on port  4000`)
  );
});
// .then((res: any) => {
//   console.log(``);
// });
