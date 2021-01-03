const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chairSchema = new Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'table',
        required: true
    },
    state: {
        type: Boolean,
        default: 1
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

chairSchema.index({
    username: 1,
    table: 1
}, { unique: true });

module.exports = mongoose.model('chair', chairSchema);