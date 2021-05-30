const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const Movie = require('../models/movieSchema');
const User = require('../models/userSchema')

validation = [check(
    "Title", "please entter  the movie tittle").not().isEmpty(),
    check("Year", "please entter  the movie year").not().isEmpty(),
    check("Actors", "please entter  the movie Actor").not().isEmpty(),
    check("Director", "please entter  the movie tittle").not().isEmpty(),
    check("Poster", "please entter  the movie tittle").not().isEmpty(),
    check("Ratings", "please enter the ratings").not().isEmpty(),
    check("Gener", "please entter  the movie tittle").not().isEmpty(),
    check("Artists", "please entter  the movie tittle").not().isEmpty()

]

router.post('/Movie', validation, async (req, res) => {
    console.log(req.body)
    const error = validationResult(req)
    if (!error.isEmpty()) {
        res.status(400).json({ error: error.array()})
    }
    try {
        const user = await User.findOne(req.user)
        const isAdmin = user.isAdmin
        if (isAdmin === true) {
            const newMovie = new Movie(req.body)
            const movie = await newMovie.save()
            if (movie) {
                return res.status(200).json({ msg: "movie", movie })
            }
        }
        else {
            return res.status(400).json({ msg: "enter the valid admin token" })
        }
        
    } catch (err) {
        console.error(err)
        
    }
})

// get all movie
router.get('/allMovie', async (req, res) => {
    try {
        const movie = await Movie.find(req.movie)
        console.log(movie)
        if (!movie) {
            return res.status(404).json({ "message": err })
        }
        res.send(movie)

    } catch (err) {
        console.error(err)
        return res.status(400).json({ "message": err })
    }
})

// get the movie by id
router.get('/movie/:id', async (req, res) => {
    try {
        const movieId = req.params.id
        console.log(movieId)

        const movie = await Movie.findById(movieId)
        console.log(movie)
        if (!movie) {
            return res.status(404).json({"message": err})
        }
        res.send(movie)

    }catch (err) {
        console.error(err)
        return res.status(400).json({"message":err})        
    }
})

router.get('/view/:id', async (req, res) => {
    try {
        const { Poster, Ratings, Summary } = req.body
        const movie_id = req.params.id
        const movie = await Movie.findById(movie_id)
        if (!movie) {
            return res.status(404).json({ "message": err })
        }
        query = {}
        query["Poster"] = movie.Poster
        query["Ratings"] = movie.Ratings
        query["Summary"] = movie.Summary
        
        await res.send(query)

    } catch (err) {
        console.error(err)
        return res.status(400).json({"message":err})
    }
})

// Users should be able to filter movies on the basis of genre and artists.
router.get('/filter', async (req, res) => {
    try {
        const { Gener, Artists } = req.body;

        const movie = await Movie.find({ }); 
        console.log(movie)

        if (!movie) {
            return res.status(404).json({message:"Not found"})
        }

        console.log(movie[0])
        movies = {}
        for (var i = 0; i < movie.length; i++){
            if ((movie[i].Gener == Gener) && (movie[i].Artists == Artists)) {
                movies[i] = movie[0]
            }
        }
        res.send(movies)

    } catch (err) {
        console.error(err)
        return res.status(400).json({message:err})
    }
})

// Indexing on the basis of ratings given by other users as well as native ratings.
router.get('/', async (req, res) => {
    try {

        console.log("welcome")

    } catch (err) {
        console.error("message", err)
        return res.status(400).json({ message: err })
    }
})

module.exports = router;