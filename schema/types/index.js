const graphql = require('graphql');
const mongoose = require('mongoose');

const modelUser = require('../../models/user');
const modelTable = require('../../models/table');
const modelChair = require('../../models/chair');
const modelColor = require('../../models/color');
const modelBet = require('../../models/bet');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLFloat,
    GraphQLList,
    GraphQLBoolean
} = graphql;

const userType = new GraphQLObjectType({
    name: 'User',
    description: 'User Model',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        lastname: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        balance: { type: GraphQLFloat },
        chairs: {
            type: GraphQLList(chairType),
            description: 'Object Chair',
            async resolve(parent, args) {
                return await modelChair.find({ "username": new mongoose.Types.ObjectId(parent.id) });
            }
        }
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

const tableType = new GraphQLObjectType({
    name: 'Table',
    description: 'Table Model',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        chairs: {
            type: GraphQLList(chairType),
            description: 'Object Chair',
            async resolve(parent, args) {
                return await modelChair.find({ "table": new mongoose.Types.ObjectId(parent.id) });
            }
        }
    })
});

const chairType = new GraphQLObjectType({
    name: 'Chair',
    description: 'Chair Model',
    fields: () => ({
        id: { type: GraphQLID },
        state: { type: GraphQLBoolean },
        user: {
            type: userType,
            description: 'Object User',
            async resolve(parent, args) {
                return await modelUser.findOne({
                    "_id": new mongoose.Types.ObjectId(parent.username)
                });
            }
        },
        table: {
            type: tableType,
            description: 'Object Table',
            async resolve(parent, args) {
                return await modelTable.findOne({
                    "_id": new mongoose.Types.ObjectId(parent.table)
                });
            }
        }
    })
});

const betType = new GraphQLObjectType({
    name: 'Bet',
    description: 'Bet Model',
    fields: () => ({
        id: { type: GraphQLID },
        value: { type: GraphQLFloat },
        profit: { type: GraphQLFloat },
        user: {
            type: userType,
            description: 'Object User',
            async resolve(parent, args) {

                return await modelUser.findOne({
                    "_id": new mongoose.Types.ObjectId(parent.username)
                });
            }
        },
        table: {
            type: tableType,
            description: 'Object Table',
            async resolve(parent, args) {

                return await modelTable.findOne({
                    "_id": new mongoose.Types.ObjectId(parent.table)
                });
            }
        },
        color: {
            type: colorType,
            description: 'Object Color',
            async resolve(parent, args) {
                return await modelColor.findOne({
                    "_id": new mongoose.Types.ObjectId(parent.color)
                });
            }
        },
        resultColor: {
            type: colorType,
            description: 'Object Result Color',
            async resolve(parent, args) {
                return await modelColor.findOne({
                    "_id": new mongoose.Types.ObjectId(parent.resultColor)
                });
            }
        }
    })
});

module.exports = {
    userType,
    colorType,
    tableType,
    chairType,
    betType
};