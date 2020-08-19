const { bookType } = require('../nodeTypes');
const { GraphQLList, GraphQLID, GraphQLString } = require('graphql');
const BookService = require('../../services/BookService');

const BooksQuery = {
  type: GraphQLList(bookType),
  args: {
    category: { type: GraphQLString }
  },
  resolve: async (_, { category }) => {
    const bookService = new BookService();
    const Books = await bookService.getByQuery({ category });

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


const BookBySlugQuery = {
  type: bookType,
  args: {
    slug: { type: GraphQLString }
  },
  resolve: async (_, { slug }) => {
    const bookService = new BookService();
    const post = await bookService.getBySlug(slug);

    return post;
  }
};

module.exports = { BooksQuery, BookByIdQuery, BookBySlugQuery };