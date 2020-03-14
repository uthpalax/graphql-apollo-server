const { ApolloServer, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')

const fs = require('fs')
const path = require('path')
require('dotenv').config()

const Query = require('./Query')
const Mutation = require('./Mutation')

mongoose.connect('mongodb://localhost:27017/doingiteasychannel-db', 
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const resolvers = {
    Query,
    Mutation
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
    resolvers
})

server.listen().then(({ url })=> {
    console.log('Server is running on ' + url)
})