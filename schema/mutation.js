const graphql = require('graphql');
const { GraphQLObjectType } = graphql;

const { addUser, editUser, deleteUser } = require('./mutations/user');

const Mutation = new GraphQLObjectType({
    name: 'rootMutation',
    fields: {
        addUser,
        editUser,
        deleteUser
    }
});

module.exports = Mutation;