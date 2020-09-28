const { bookType, BookConnection } = require('../nodeTypes');
const { GraphQLList, GraphQLID, GraphQLString } = require('graphql');
const BookService = require('../../services/BookService');
const { GraphQLInt } = require('graphql');
const { GraphQLDateTime } = require('graphql-iso-date');

const BooksQuery = {
  type: BookConnection,
  args: {
    category: { type: GraphQLString },
    first: { type: GraphQLInt },
    after: { type: GraphQLDateTime },
  },
  resolve: async (_, { category, first, after }) => {
    const bookService = new BookService();
    const Books = await bookService.getByPagination({ category }, first, after);

    return Books;
  }
};

const BooksListQuery = {
  type: GraphQLList(bookType),
  args: {
    title: { type: GraphQLString },
  },
  resolve: async (_, { title }) => {
    if(!title) return Promise.resolve([]);
    const bookService = new BookService();
    const Books = await bookService.getByQuery({ title: new RegExp(title, 'gi') });

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

module.exports = { BooksQuery, BookByIdQuery, BookBySlugQuery, BooksListQuery };