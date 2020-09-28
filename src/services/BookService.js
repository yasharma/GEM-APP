const MongoDbRepo = require('../repository/BookRepository');

class BookService {
  constructor() {
    this.BookRepository = new MongoDbRepo('Books');
  }

  getAllPosts() {
    return this.BookRepository.getByQuery();
  }

  getByQuery(query) {
    return this.BookRepository.getByQuery(this.buildQuery(query));
  }

  async getByPagination(query, first, after) {
    const criteria = after ? { publishedDate: { $lt: new Date(after) } } : {};
    let _books = await this.BookRepository.getByPagination({ ...this.buildQuery(query), ...criteria }, first);
    const hasNextPage = _books.length > first - 1;
    //remove extra
    if (hasNextPage) {
      _books = _books.slice(0, _books.length - 1);
    }
    const edges = _books.map(r => ({
      node: r,
    }));
    return {
      pageInfo: { 
        hasNextPage,
        endCursor: _books.length > 0 ? new Date(_books[_books.length - 1].publishedDate) : null,
      },
      edges,
    };
  }

  getById(_id) {
    return this.BookRepository.getById(_id);
  }

  getBySlug(_id) {
    return this.BookRepository.getBySlug(_id);
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

module.exports = BookService;