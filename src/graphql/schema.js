const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { BooksQuery, BookBySlugQuery, BooksListQuery } = require('./query/BooksQuery');
const { CategoriesQuery } = require('./query/CategoriesQuery');
const { SearchQuery } = require('./query/SearchQuery');
const { NotesQuery } = require('./query/NotesQuery');
const {
  CreatePostMutation,
  UpdatePostMutation,
  DeletePostMutation
} = require('./mutation/BooksMutation');
const { SaveSearchMutation } = require('./mutation/SearchMutation');
const {
  CreateNoteMutation,
  UpdateNoteMutation,
  DeleteNoteMutation
} = require('./mutation/NotesMutation');

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    books: BooksQuery,
    bookListing: BooksListQuery,
    book: BookBySlugQuery,
    notes: NotesQuery,
    categories: CategoriesQuery,
    searches: SearchQuery
  })
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createPost: CreatePostMutation,
    deletePost: DeletePostMutation,
    updatePost: UpdatePostMutation,
    createNote: CreateNoteMutation,
    deleteNote: DeleteNoteMutation,
    updateNote: UpdateNoteMutation,
    saveSearch: SaveSearchMutation
  })
});

const schema = new GraphQLSchema({ query: QueryType, mutation: MutationType });

module.exports = schema;