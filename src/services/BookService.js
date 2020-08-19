const MongoDbRepo = require('../repository/BookRepository');

class BookService {
  constructor() {
    this.BookRepository = new MongoDbRepo('Books');
  }

  getAllPosts() {
    return this.BookRepository.getByQuery();
  }
  
  getByQuery(query) {
    return this.BookRepository.getByQuery(query);
  }
  
  getById(_id) {
    return this.BookRepository.getById(_id);
  }

  getBySlug(_id) {
    return this.BookRepository.getBySlug(_id);
  }

  updatePost(_id, opt) {
    return this.BookRepository.updateOne(_id, opt);
  }

  deletePost(_id) {
    return this.BookRepository.deleteOne(_id);
  }

  createPost(opt) {
    return this.BookRepository.create(opt);
  }
}

module.exports = BookService;