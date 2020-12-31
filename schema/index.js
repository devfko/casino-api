const graphql = require('graphql');
const { GraphQLSchema } = graphql;

const rootQuery = require('./query');
const rootMutation = require('./mutation');

module.exports = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation
});