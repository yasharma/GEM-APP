const { bookType } = require('../nodeTypes');
const { GraphQLList, GraphQLID } = require('graphql');
const BookService = require('../../services/BookService');

const BooksQuery = {
  type: GraphQLList(bookType),
  args: {},
  resolve: async () => {
    const bookService = new BookService();
    const Books = await bookService.getAllPosts();

    return Books;
  }
};

const BookByIdQuery = {
  type: bookType,
  args: {
    _id: { type: GraphQLID }
  },
  resolve: async (_, { _id }) => {
    const bookService = new BookService();
    const post = await bookService.getById(_id);

    return post;
  }
};

module.exports = { BooksQuery, BookByIdQuery };