const { Character } = require('./models/Character')

const Query = {
    characters: () => Character.find({}, (error, characters) => {
        if (error) console.log('error', error)
        return characters
    }),
    character: (_, { id }) => Character.findById(id, (error, character) => {
        if (error) console.log('error', error)
        return character
    })
}

module.exports = Query