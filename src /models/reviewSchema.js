const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Review = new Schema({
    
    Movie: {
        type: String,
        required: true,
    },
    MovieName: {
        type: String,
        required: true,
    },
    Ratings: {
        type: String,
        required:true
    }

})

module.exports = mongoose.model('Review', Review);