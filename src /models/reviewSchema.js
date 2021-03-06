const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Review = new Schema({
    Movie: {
        type: String
    },
    Source: {
        type: String
    },
    Value: {
        type: String
    },
    Title: {
        type: String,
        default: '',
    },
    Body: {
        type: String,
        default: '',
    },
    DateCreated: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Review', Review);