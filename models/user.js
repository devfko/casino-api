const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    }
});

userSchema.plugin(uniqueValidator, {
    code: 409,
    message: 'El usuario {PATH} ya se encuentra registrado'
});

module.exports = mongoose.model('user', userSchema);