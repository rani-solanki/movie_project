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
        type: String,
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
        type: String,
        required: true
    },
    Gener: {
        type: String,
        required: true
    },
    Artists: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Movie', Movie);
