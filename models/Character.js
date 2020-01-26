const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: String,
    status: String,
    gender: String,
    image: String
})

const Character = mongoose.model('Character', schema)

module.exports = Character