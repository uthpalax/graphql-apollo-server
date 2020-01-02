const { ApolloServer, gql } = require('apollo-server')

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
`

const data = require('./data')

const resolvers = {
    Query: {
        characters: () => data,
        character: (_, { id }) => {
            return data.find( character => character.id == id)
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