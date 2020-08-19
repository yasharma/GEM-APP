const { getDB } = require('../config/databaseConnection');
const ObjectId = require('mongodb').ObjectId;

class BookRepository {
  constructor(collectionName) {
    this.collection = getDB().collection(collectionName);
  }

  getByQuery(query = {}) {
    console.log({ ...this.buildQuery(query), status: 'PUBLISH' });
    return new Promise((resolve, reject) => {
      this.collection.find({ ...this.buildQuery(query), status: 'PUBLISH' }).sort({ publishedDate: -1 }).toArray((err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }

  getById(_id) {
    return new Promise((resolve, reject) => {
      this.collection.findOne({ _id: ObjectId(_id) }, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }

  getBySlug(slug) {
    return new Promise((resolve, reject) => {
      this.collection.findOne({ slug, status: 'PUBLISH' }, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }

  updateOne(_id, opt) {
    return new Promise((resolve, reject) => {
      this.collection.findOneAndUpdate(
        { _id: ObjectId(_id) },
        { $set: { ...opt, updatedAt: new Date() } },
        { returnOriginal: false },
        (err, data) => {
          if (err) {
            reject(err);
          }

          resolve(data.value);
        }
      );
    });
  }

  deleteOne(_id) {
    return new Promise((resolve, reject) => {
      this.collection.findOneAndDelete({ _id: ObjectId(_id) }, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }

  create(opt) {
    return new Promise((resolve, reject) => {
      const extended = { ...opt, createdAt: new Date(), updatedAt: new Date() }
      this.collection.insertOne(extended, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data.ops[0]);
      });
      1;
    });
  }

  buildQuery(query) {
    const queryMap = {
      category: 'categories'
    }
    return Object.keys(query).reduce((p, c) => {
      if (query[c]) p[queryMap[c]] = { $in: [query[c]] }
      return p;
    }, {});
  }
}

module.exports = BookRepository;