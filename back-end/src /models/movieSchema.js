const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Movie = new Schema({
    
    Title: {
        type: String,
        required:true
    },
    Year: {
        type: String,
    },
    Actors: {
        type: Object,
        required:true
    },
    Director: {
        type: String,
        required:true
    },
    Poster: {
        type: String,
        required: true
    },
    Summary: {
        type: String,
        required: true
    },
    Ratings: {
        type: Object,
        required: true
    },
    Gener: {
        type: Object,
        required: true
    },
    Artists: {
        type: Object,
        required: true
    }
})

module.exports = mongoose.model('Movie', Movie);
