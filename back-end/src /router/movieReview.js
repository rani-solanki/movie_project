const router = require('express').Router();
const Review = require('../models/reviewSchema');
const Movie = require('../models/movieSchema');

router.post('/reviews', async (req, res) => {
    try {
        const { Movie, Source, Ratings } = req.body;
        
        const review = new Review({
            Movie,
            Source,
            Ratings
        });
        
        await review.save();
        reviews = await Review.find(req.review)

        if (reviews) {
            return res.status(400).json({"Review":reviews})
        }
        return res.status(404).json({message:"Not found"})

    } catch(err){
        console.error(err)
    }
});

// add new post 
router.post('/new', async(req, res)=>{
    const { movie, source, value, title, body } = req.body;

    const newReview = new Review({
        Movie: movie,
        Source: source,
        Value: value,
        Title: title,
        Body: body,
    });

    newReview.save((err) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Server error.',
            });
        } else {
            Review.find({
                Movie: movie,
            })
                .sort({ _id: -1 })
                .exec(function (err, reviews) {
                    if (err) {
                        return res.send({
                            success: false,
                            message: 'Server error.',
                        });
                    } else {
                        return res.send({
                            success: true,
                            updated: reviews,
                        });
                    }
                });
        }
    });
});

// Dlete the review by id
router.delete('/delete', async(req, res)=>{
    const { id, movie } = req.body;

    console.log(req.body);
    Review.findOneAndDelete({ _id: id }).exec(function (err) {
        if (err) {
            console.log(err);
        } else {
            Review.find({
                Movie: movie,
            })
                .sort({ _id: -1 })
                .exec(function (err, reviews) {
                    if (err) {
                        return res.send({
                            success: false,
                            message: 'Server error.',
                        });
                    } else {
                        return res.send({
                            success: true,
                            updated: reviews,
                        });
                    }
                });
        }
    });
});

module.exports = router;