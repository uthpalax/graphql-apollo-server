const { ApolloServer, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const lodash = require('lodash')
const fs = require('fs')
const path = require('path')
const { Character, validateCharacter } = require('./models/Character')
const { User, validateUser } = require('./models/User')

mongoose.connect('mongodb://localhost:27017/doingiteasychannel-db', 
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

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
            const { value, error } = validateCharacter(payload, { abortEarly: false })
            if ( error ) {
                throw new UserInputError('Failed to create a character due to validation errors', {
                    validationErrros: error.details 
                }) 
            }
            return Character.create(value)
        }, 
        async signup(_, {user}) {
            const { value, error } = validateUser(user)
            if (error) {
                throw new UserInputError('Failed to create a character due to validation errors', {
                    validationErrros: error.details 
                })
            }

            const password = await bcrypt.hash(user.password, 10)
            const registerUser = await User.create({
                ...value,
                password
            })

            const token = await jwt.sign({
                _id: registerUser._id
            }, 'topSecret')

            return {
                token,
                user: lodash.pick(user, ['name', 'email'])
            }
        },
    }
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
    resolvers
})

server.listen().then(({ url })=> {
    console.log('Server is running on ' + url)
})