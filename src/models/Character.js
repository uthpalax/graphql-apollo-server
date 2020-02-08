const mongoose = require('mongoose')
const Joi = require('@hapi/joi')

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

const validateCharacter = (character) => {
    return Joi.object({
        name: Joi.string().alphanum().min(3).max(30).required(),
        status: Joi.string().required(), 
        gender: Joi.string().allow(''),
        image: Joi.string().allow('')
    }).validate(character)
}

exports.Character = Character
exports.validateCharacter = validateCharacter