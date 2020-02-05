const { ApolloServer, gql, UserInputError } = require('apollo-server')
const Joi = require('@hapi/joi')
const mongoose = require('mongoose')
const Character = require('./models/Character')

mongoose.connect('mongodb://localhost:27017/doingiteasychannel-db', {useNewUrlParser: true, useUnifiedTopology: true });

const typeDefs = gql`
    type Character { 
        id: ID 
        name: String!
        status: String!
        gender: String
        image: String
    }

    type Query {
        characters: [Character]
        character(id: ID!): Character
    }
    type Mutation {
        addCharacter(name: String!, status: String!, gender: String, image: String): Character
    }
`

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
            const schema = Joi.object({
                name: Joi.string().alphanum().min(3).max(30).required(),
                status: Joi.string().required(), 
                gender: Joi.string().allow(''),
                image: Joi.string().allow('')
            })

            const { value, error } = schema.validate(payload, { abortEarly: false })
            if ( error ) {
                throw new UserInputError('Failed to create a character due to validation errors', {
                    validationErrros: error.details 
                }) 
            }
            return Character.create(value)
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