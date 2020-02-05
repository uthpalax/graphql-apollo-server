const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true
    },
    gender: String,
    image: String
})

const Character = mongoose.model('Character', schema)

module.exports = Character