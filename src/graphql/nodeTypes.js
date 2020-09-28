const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLBoolean } = require('graphql');
const { GraphQLDateTime } = require('graphql-iso-date');

const noteType = new GraphQLObjectType({
  name: 'Note',
  fields: {
    _id: { type: GraphQLID },
    content: { type: GraphQLString }
  }
});

const categoryType = new GraphQLObjectType({
  name: 'Category',
  fields: {
    _id: { type: GraphQLID },
    name: { type: GraphQLString }
  }
});

const bookSchema = {
  _id: { type: GraphQLID },
  title: { type: GraphQLString },
  slug: { type: GraphQLString },
  authors: { type: new GraphQLList(GraphQLString) },
  categories: { type: new GraphQLList(GraphQLString) },
  longDescription: { type: GraphQLString },
  shortDescription: { type: GraphQLString },
  isbn: { type: GraphQLString },
  status: { type: GraphQLString },
  thumbnailUrl: { type: GraphQLString },
  pageCount: { type: GraphQLInt },
  publishedDate: { type: GraphQLDateTime },
  createdAt: { type: GraphQLDateTime },
  updatedAt: { type: GraphQLDateTime }
}
const bookType = new GraphQLObjectType({
  name: 'Book',
  fields: bookSchema
});

const BookEdge = new GraphQLObjectType({
  name: 'BookEdge',
  fields: () => ({
    cursor: {
      type: GraphQLString,
    },
    node: {
      type: bookType,
    },
  }),
});

const PageInfo = new GraphQLObjectType({
  name: 'PageInfo',
  fields: {
    hasNextPage: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    endCursor: {
      type: GraphQLDateTime,
    },
  },
});

const BookConnection = new GraphQLObjectType({
  name: 'BookConnection',
  fields: () => ({
    edges: {
      type: new GraphQLList(BookEdge)
    },
    pageInfo: {
      type: new GraphQLNonNull(PageInfo),
    },
  }),
});


const searchType = new GraphQLObjectType({
  name: 'Search',
  fields: {
    _id: { type: GraphQLID },
    bookId: { type: GraphQLID },
    slug: { type: GraphQLString },
    title: { type: GraphQLString },
    count: { type: GraphQLInt }
  }
});

module.exports = { noteType, bookType, categoryType, searchType, BookConnection };