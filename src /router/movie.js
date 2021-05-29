const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const Movie = require('../models/movieSchema');
const jsonData = require('./movieData.json')
const fs = require('fs');
const User = require('../models/userSchema');

fs.readFile("movieData.json", function (err, data) {
    if (err) throw err;
    jsonData = JSON.parse(data);
    console.log(jsonData)
})

// router.post('/movie', async (res, req,data) => {
//     try {
//         const user = await User.findOne({ id:req._id });
//         if (user.isAdmin == true) {
            
//             const movies = await res.send(data)
//             console.log(movies)
//         }
//     } catch (err){
//         console.error(err)
//     }
// })

module.exports = router;