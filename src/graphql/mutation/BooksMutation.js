/* eslint-disable no-unused-vars */
const { bookType } = require('../nodeTypes');
const {
  GraphQLString,
  GraphQLID
} = require('graphql');
const BookService = require('../../services/BookService');
const SearchService = require('../../services/SearchService');

const CreatePostMutation = {
  type: bookType,
  args: {
    title: { type: GraphQLString },
    description: { type: GraphQLString }
  },
  resolve: async (_, { title, description }) => {
    const bookService = new BookService();
    const newPost = await bookService.save({ 
      title, 
      description 
    });

    return newPost;
  }
};

const DeletePostMutation = {
  type: GraphQLID,
  args: {
    _id: { type: GraphQLID }
  },
  resolve: async (_, { _id }) => {
    const Bookservice = new BookService();
    const res = await Bookservice.remove(_id);

    if (res.ok) {
      return _id;
    }
  }
};

const UpdatePostMutation = {
  type: bookType,
  args: {
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString }
  },
  resolve: async (_, { _id, title, description  }) => {
    const Bookservice = new BookService();
    const updatedBlog = await Bookservice.update(_id, { 
      title, 
      description
    });

    return updatedBlog;
  }
};

module.exports = { CreatePostMutation, UpdatePostMutation, DeletePostMutation };