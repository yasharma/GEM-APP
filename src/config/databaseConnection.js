const MongoClient = require('mongodb').MongoClient;
const { config } = require('./index');
let mongoDB;

const setupDB = callback => {
  MongoClient.connect(
    config.mongoUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      mongoDB = client.db('gem-db');
      if (err) {
        return callback(err);
      } else {
        mongoDB.collection('Books').createIndex('slug');
        mongoDB.collection('Books').createIndex('title');
        mongoDB.collection('Books').createIndex('publishedDate');
        mongoDB.collection('Searches').createIndex({ 'count': 1, 'createdAt': 1 });
        mongoDB.collection('Searches').createIndex({ 'bookId': 1 });
        return callback('DB connection successful!');
      }
    }
  );
};

const getDB = () => {
  return mongoDB;
};

module.exports = { setupDB, getDB };