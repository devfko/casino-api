const graphql = require('graphql');
const typeDefinitons = require('../types');
const mongoose = require('mongoose');
const { ApolloError } = require('apollo-server-express');
const { GraphQLString, GraphQLID, GraphQLNonNull, GraphQLFloat } = graphql;
const { genBet } = require('../../utils/generator');

/** Models */
const modelUser = mongoose.model('user');
// const modelChair = mongoose.model('chair');
// const modelTable = mongoose.model('table');
const modelBet = mongoose.model('bet');

const addBet = {
    type: typeDefinitons.betType,
    description: 'Add bet',
    args: {
        user: { type: new GraphQLNonNull(GraphQLString) },
        table: { type: new GraphQLNonNull(GraphQLString) },
        color: { type: new GraphQLNonNull(GraphQLString) },
        value: { type: new GraphQLNonNull(GraphQLFloat) }
    },
    async resolve(parent, args) {

        let probability = await genBet(args.color, args.value);
        let result = (probability._id == args.color) ? probability.gain * args.value : 0;

        let newBet = new modelBet({
            ...args,
            profit: result,
            resultColor: probability._id
        });

        try {
            const betResult = await newBet.save();

            if (!betResult.id) throw new ApolloError("Bad Request", 400);

            return new Promise((resolve, reject) => {
                modelUser.findOneAndUpdate({ "_id": new mongoose.Types.ObjectId(args.user) }, { "$inc": { "balance": betResult.profit } }, { new: true }).exec((err, resp) => {
                    if (err) reject(new ApolloError("Bad Request", 400));
                    else resolve(newBet);
                });
            });


        } catch (err) {
            throw new ApolloError("Bad Request", 400);
        }
    }
};

module.exports = {
    addBet
};