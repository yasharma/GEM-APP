const MongoDbRepo = require('../repository/BookRepository');

class SearchService {
  constructor() {
    this.BookRepository = new MongoDbRepo('Searches');
  }

  getByQuery(query) {
    return this.BookRepository.getByQuery(this.buildQuery(query));
  }

  getById(_id) {
    return this.BookRepository.getById(_id);
  }

  update(_id, opt) {
    return this.BookRepository.updateOne(_id, opt);
  }

  remove(_id) {
    return this.BookRepository.deleteOne(_id);
  }

  save(opt) {
    return this.BookRepository.create(opt);
  }

  buildQuery(query) {
    const queryMap = {
      category: 'categories',
      title: 'title'
    }
    return Object.keys(query).reduce((p, c) => {
      if (query[c]) p[queryMap[c]] = { $in: [query[c]] }
      return p;
    }, {});
  }
}

module.exports = SearchService;