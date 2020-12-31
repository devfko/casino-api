const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tableSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('table', tableSchema);