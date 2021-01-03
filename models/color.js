const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const colorSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    percentaje: {
        type: Number,
        required: true,
        default: 1
    },
    gain: {
        type: Number,
        required: true,
        default: 2
    }
});

colorSchema.plugin(uniqueValidator, {
    code: 409,
    message: 'El color ya se encuentra registrado'
});

module.exports = mongoose.model('color', colorSchema);