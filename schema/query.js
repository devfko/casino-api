const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLID, GraphQLString } = graphql;
const { ApolloError } = require('apollo-server-express');
const typeDefinitions = require('./types');

/** Models */
const modelUser = require('../models/user');
const modelColor = require('../models/color');
const modelTable = require('../models/table');
const modelChair = require('../models/chair');
const modelBet = require('../models/bet');

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
        },
        allTables: {
            type: new GraphQLList(typeDefinitions.tableType),
            description: 'List of tables',
            async resolve(parent, args) {
                try {
                    return await modelTable.find({}).sort({ name: 1 });
                } catch (err) {
                    throw new ApolloError("Bad Request", 400);
                }
            }
        },
        getTableById: {
            type: typeDefinitions.tableType,
            description: 'Table information',
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            async resolve(parent, args) {
                try {
                    return await modelTable.findById(args.id);
                } catch (err) {
                    throw new ApolloError("Bad Request", 400);
                }
            }
        },
        loginUser: {
            type: typeDefinitions.userType,
            description: 'Login User',
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args) {
                try {
                    return await modelUser.findOne({ "$and": [{ "username": args.username }, { "password": args.password }] });
                } catch (err) {
                    throw new ApolloError("Bad Request", 400);
                }
            }
        }
    }
});

module.exports = Query;