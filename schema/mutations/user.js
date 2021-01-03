const graphql = require('graphql');
const typeDefinitons = require('../types');
const mongoose = require('mongoose');
const { ApolloError } = require('apollo-server-express');
const { GraphQLString, GraphQLID, GraphQLNonNull, GraphQLFloat } = graphql;

const modelUser = mongoose.model('user');

const addUser = {
    type: typeDefinitons.userType,
    description: 'Add user',
    args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        lastname: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        balance: { type: GraphQLFloat }
    },
    async resolve(parent, args) {
        let newUser = new modelUser({
            ...args
        });

        try {
            return newUser.save();
        } catch (err) {
            throw new ApolloError("Bad Request", 400);
        }
    }
};

const editUser = {
    type: typeDefinitons.userType,
    description: 'Edit user',
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        lastname: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        balance: { type: GraphQLFloat }
    },
    async resolve(parent, args) {

        return new Promise((resolve, reject) => {
            modelUser.findOneAndUpdate({ "_id": new mongoose.Types.ObjectId(args.id) }, { "$set": args }, { new: true }).exec((err, resp) => {
                if (err) reject(new ApolloError("Bad Request", 400));
                else resolve(resp);
            });
        });
    }
};

const deleteUser = {
    type: typeDefinitons.userType,
    description: 'Delete user',
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(parent, args) {

        return new Promise((resolve, reject) => {
            modelUser.findOneAndRemove({ "_id": mongoose.Types.ObjectId(args.id) }).exec((err, resp) => {
                if (err) reject(new ApolloError("Bad Request", 400));
                else resolve(resp);
            });
        });
    }
};

module.exports = {
    addUser,
    editUser,
    deleteUser
};