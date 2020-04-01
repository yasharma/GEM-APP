const express = require('express');
const cors = require('cors');
const app = express();
const graphqlHTTP = require('express-graphql');
const { config } = require('./config')
const { setupDB } = require('./config/databaseConnection');
const schema = require('./graphql/schema');

setupDB(v => console.log(v));

app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
    pretty: true
  })
);

app.listen(config.port);
console.log('SERVER listening on port', config.port);