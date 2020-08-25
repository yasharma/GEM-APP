const MongoDbRepo = require('../repository/SearchRepository');

class SearchService {
  constructor() {
    this.searchRepository = new MongoDbRepo('Searches');
  }

  getByQuery(query) {
    return this.searchRepository.getByQuery(this.buildQuery(query));
  }

  getById(_id) {
    return this.searchRepository.getById(_id);
  }

  update(_id, opt) {
    return this.searchRepository.updateOne(_id, opt);
  }

  remove(_id) {
    return this.searchRepository.deleteOne(_id);
  }

  save(opt) {
    return this.searchRepository.create(opt);
  }

  async upsertWithCount(opt) {
    const { value } = await this.searchRepository.upsertWithCount(opt, opt);
    return value;
  }

  getByMostSearched() {
    return this.searchRepository.findByMostSearched({})
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