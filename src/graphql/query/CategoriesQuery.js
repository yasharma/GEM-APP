const { categoryType } = require('../nodeTypes');
const { GraphQLList } = require('graphql');
const CategoryService = require('../../services/CategoryService');

const CategoriesQuery = {
  type: GraphQLList(categoryType),
  args: {},
  resolve: async (_) => {
    const categoryService = new CategoryService();
    const categories = await categoryService.getAll();

    return categories;
  }
};

module.exports = { CategoriesQuery };