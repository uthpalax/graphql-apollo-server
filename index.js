const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    type Character { 
        id: ID 
        name: String
    }

    type Query {
        characters: [Character]
    }
`

const data = [
    {
        id: 1,
        name: "Random name"
    }, 
    {
        id: 2, 
        name: "Another random name"
    }
]

const resolvers = {
    Query: {
        characters: () => data
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url })=> {
    console.log('Server is running on ' + url)
})