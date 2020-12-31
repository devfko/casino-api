const graphql = require('graphql');
const mongoose = require('mongoose');

const modelUser = require('../../models/user');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat } = graphql;

const userType = new GraphQLObjectType({
    name: 'User',
    description: 'User Model',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        lastname: { type: GraphQLString },
        user: { type: GraphQLString },
        password: { type: GraphQLString },
        balance: { type: GraphQLFloat },
    })
});

const colorType = new GraphQLObjectType({
    name: 'Color',
    description: 'Color Model',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        percentaje: { type: GraphQLFloat },
        gain: { type: GraphQLFloat }
    })
});

module.exports = {
    userType,
    colorType
};