const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const { loadFilesSync } = require('@graphql-tools/load-files'); // Import loadFilesSync
const { mergeTypeDefs } = require('@graphql-tools/merge');
const resolvers = require('./resolvers/resolvers');

const app = express();
app.use(cors({}));
 


const typesArray = loadFilesSync(path.join(__dirname, './schema'), {
  extensions: ['graphql'],
});
const typeDefs = mergeTypeDefs(typesArray); 
 
async function startServer() {
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
 
await server.start();
server.applyMiddleware({ app });
 
const PORT = process.env.PORT || 3000;
 
const URI =
  "mongodb+srv://sarthakgupta1433:S4rthak2002@semester3-fullstack.sdble.mongodb.net/";
   
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`DB is connected and server is running on http://localhost:${PORT}${server.graphqlPath}`);
    });
  })
  .catch((err) => console.log(err));
 
}
 
startServer();