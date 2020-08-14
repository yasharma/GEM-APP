const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');
const { GraphQLDateTime } = require('graphql-iso-date');

const noteType = new GraphQLObjectType({
  name: 'Note',
  fields: {
    _id: { type: GraphQLID },
    content: { type: GraphQLString }
  }
});

const bookType = new GraphQLObjectType({
  name: 'Book',
  fields: {
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
});

module.exports = { noteType, bookType };