const { getDB } = require('../config/databaseConnection');

class CategoryRepository {
  constructor(collectionName) {
    this.collection = getDB().collection(collectionName);
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.collection.find({}).sort({ name: 1 }).toArray((err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }
}

module.exports = CategoryRepository;