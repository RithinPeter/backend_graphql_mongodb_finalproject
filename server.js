require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const expressPlayground = require('graphql-playground-middleware-express').default;
const mongoose = require('mongoose');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

async function startApolloServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        // If you have a context setting, set it here, e.g.,
        // context: ({ req }) => ({ req })
    });

    await server.start();

    server.applyMiddleware({ app });
    
    app.get('/', expressPlayground({ endpoint: '/graphql' }));
    
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    app.listen({ port: process.env.PORT || 4000 }, () => {
       console.log(`🚀 GraphQL Playground available at http://localhost:${process.env.PORT || 4000}`);
    });
}

startApolloServer();
