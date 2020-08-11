/* eslint-disable no-unused-vars */
const { bookType } = require('../nodeTypes');
const {
  GraphQLString,
  GraphQLID
} = require('graphql');
const Bookservice = require('../../services/Bookservice');

const CreatePostMutation = {
  type: bookType,
  args: {
    title: { type: GraphQLString },
    description: { type: GraphQLString }
  },
  resolve: async (_, { title, description }) => {
    const Bookservice = new Bookservice();
    const newPost = await Bookservice.createPost({ 
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
    const Bookservice = new Bookservice();
    const res = await Bookservice.deletePost(_id);

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
    const Bookservice = new Bookservice();
    const updatedBlog = await Bookservice.updatePost(_id, { 
      title, 
      description
    });

    return updatedBlog;
  }
};

module.exports = { CreatePostMutation, UpdatePostMutation, DeletePostMutation };