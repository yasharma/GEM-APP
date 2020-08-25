/* eslint-disable no-unused-vars */
const { bookType } = require('../nodeTypes');
const {
  GraphQLString,
  GraphQLID
} = require('graphql');
const SearchService = require('../../services/SearchService');

const SaveSearchMutation = {
  type: bookType,
  args: {
    bookId: { type: GraphQLID },
    title: { type: GraphQLString },
    slug: { type: GraphQLString }
  },
  resolve: async (_, { bookId, title, slug }) => {
    const searchService = new SearchService();
    return searchService.upsertWithCount({ bookId, title, slug});
  }
};

module.exports = { SaveSearchMutation };