const { searchType } = require('../nodeTypes');
const { GraphQLList } = require('graphql');
const SearchService = require('../../services/SearchService');

const SearchQuery = {
  type: GraphQLList(searchType),
  args: {},
  resolve: async (_) => {
    const searchService = new SearchService();
    return searchService.getByMostSearched();
  }
};

module.exports = { SearchQuery };