const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
const nanoid = require('nanoid')
const Character = require('./models/Character')

mongoose.connect('mongodb://localhost:27017/doingiteasychannel-db', {useNewUrlParser: true, useUnifiedTopology: true });

const typeDefs = gql`
    type Character { 
        id: ID 
        name: String
        status: String
        gender: String
        image: String
    }

    type Query {
        characters: [Character]
        character(id: ID!): Character
    }
    type Mutation {
        addCharacter(name: String, status: String, gender: String, image: String): Character
    }
`

const data = require('./data')

const resolvers = {
    Query: {
        characters: () => Character.find({}, (error, characters) => {
            if (error) console.log('error', error)
            return characters
        }),
        character: (_, { id }) => Character.findById(id, (error, character) => {
            if (error) console.log('error', error)
            return character
        })
    },
    Mutation: {
        addCharacter(_, payload) {
            return Character.create(payload)
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url })=> {
    console.log('Server is running on ' + url)
})