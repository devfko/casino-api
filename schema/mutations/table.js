const graphql = require('graphql');
const typeDefinitons = require('../types');
const mongoose = require('mongoose');
const { ApolloError } = require('apollo-server-express');
const { GraphQLString, GraphQLID, GraphQLNonNull, GraphQLFloat } = graphql;
const { genTable } = require('../../utils/generator');

/** Models */
const modelChair = mongoose.model('chair');
const modelTable = mongoose.model('table');

const addTable = {
    type: typeDefinitons.tableType,
    description: 'Create table',
    args: {
        user: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(parent, args) {
        /** Se verifica si el usuario tiene una silla activa */
        const validate = await modelChair.find({
            "user": new mongoose.Types.ObjectId(args.user),
            "state": 1
        });

        if (validate.length > 0) throw new ApolloError("Forbidden - Silla activa", 403);

        /** Si no tiene silla activa, se crea la mesa y se une el usuario */
        let newTable = new modelTable({
            name: "Mesa " + await genTable("table")
        });

        try {
            const operation = await newTable.save();
            if (!operation.id) throw new ApolloError("Bad Request", 400);

            let newChair = new modelChair({
                user: args.user,
                table: operation.id
            });

            const result = await newChair.save();
            // console.log(result);

            return operation;
        } catch (err) {
            throw new ApolloError("Bad Request", 400);
        }
    }
};

module.exports = {
    addTable
};