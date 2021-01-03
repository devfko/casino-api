const graphql = require('graphql');
const typeDefinitons = require('../types');
const mongoose = require('mongoose');
const { ApolloError } = require('apollo-server-express');
const { GraphQLString, GraphQLID, GraphQLNonNull, GraphQLFloat } = graphql;

/** Models */
const modelChair = mongoose.model('chair');

const leaveChair = {
    type: typeDefinitons.chairType,
    description: 'Create table',
    args: {
        idChair: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(parent, args) {

        try {
            return new Promise((resolve, reject) => {
                modelChair.findOneAndUpdate({ "_id": new mongoose.Types.ObjectId(args.idChair) }, { "$set": { "state": false } }, { new: true }).exec((err, resp) => {
                    if (err) reject(new ApolloError("Bad Request", 400));
                    else resolve(resp);
                });
            });
        } catch (err) {
            throw new ApolloError("Bad Request", 400);
        }
    }
};

module.exports = {
    leaveChair
};