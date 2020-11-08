var express = require('express');
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');


// Maps id to user object
var fakeDatabase = {
    'a': {
        id: 'a',
        name: 'alice',
    },
    'b': {
        id: 'b',
        name: 'bob',
    },
};

// Define the user type 
var userType = new graphql.GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: graphql.GraphQLString },
        name: { type: graphql.GraphQLString },
    }
});

// Define the Query type
var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: userType,
            // `args` describes the arguments that the `user` query accepts
            args: {
                id: { type: graphql.GraphQLString }
            },
            resolve: (_, { id }) => {
                return fakeDatabase[id];
            }
        }
    }
});

var schema = new graphql.GraphQLSchema({ query: queryType });

var app = express();
app.use('/graphql', graphqlHTTP.graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.listen(4002);
console.log('Running a GraphQL API server at localhost:4002/graphql');