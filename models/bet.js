const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const betSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'table',
        required: true
    },
    color: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'color',
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    profit: {
        type: Number
    },
    resultColor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'color',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('bet', betSchema);