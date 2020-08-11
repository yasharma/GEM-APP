const MongoDbRepo = require('../repository/mongoDbRepository');

class BookService {
  constructor() {
    this.BookRepository = new MongoDbRepo('Books');
  }

  getAllPosts() {
    return this.BookRepository.getAll();
  }
  
  getById(_id) {
    return this.BookRepository.getById(_id);
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