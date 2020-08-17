const MongoDbRepo = require('../repository/CategoryRepository');

class CategoryService {
  constructor() {
    this.CategoryRepository = new MongoDbRepo('Categories');
  }

  getAll() {
    return this.CategoryRepository.getAll();
  }
}

module.exports = CategoryService;