const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const generatorSchema = new Schema({
    type: {
        type: String
    },
    seq: {
        type: Number,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('generator', generatorSchema);