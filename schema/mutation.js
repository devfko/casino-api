const graphql = require('graphql');
const { GraphQLObjectType } = graphql;

const { addUser, editUser, deleteUser } = require('./mutations/user');
const { addTable } = require('./mutations/table');
const { leaveChair } = require('./mutations/chair');
const { addBet } = require('./mutations/bet');

const Mutation = new GraphQLObjectType({
    name: 'rootMutation',
    fields: {
        addUser,
        editUser,
        deleteUser,
        addTable,
        addBet,
        leaveChair
    }
});

module.exports = Mutation;