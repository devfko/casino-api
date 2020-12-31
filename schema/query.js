const { ApolloError } = require('apollo-server-express');
const graphql = require('graphql');
const mongoose = require('mongoose');

const typeDefinitions = require('./types');

/** Models */
const modelUser = require('../models/user');
const modelColor = require('../models/color');

const { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLID } = graphql;

const Query = new GraphQLObjectType({
    name: 'rootQuery',
    fields: {
        allColors: {
            type: new GraphQLList(typeDefinitions.colorType),
            description: 'List of Colors',
            async resolve(parent, args) {
                try {
                    return await modelColor.find({}).sort({ name: 1 });
                } catch (err) {
                    throw new ApolloError("Bad Request", 400);
                }
            }
        },
        allUsers: {
            type: new GraphQLList(typeDefinitions.userType),
            description: 'List of users',
            async resolve(parent, args) {
                try {
                    return await modelUser.find({}).sort({ name: 1 });
                } catch (err) {
                    throw new ApolloError("Bad Request", 400);
                }
            }
        },
        getUserById: {
            type: typeDefinitions.userType,
            description: 'User information',
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            async resolve(parent, args) {
                try {
                    return await modelUser.findById(args.id);
                } catch (err) {
                    throw new ApolloError("Bad Request", 400);
                }
            }
        }
    }
});

module.exports = Query;