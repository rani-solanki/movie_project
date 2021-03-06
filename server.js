const express = require('express');
const bodyParser = require("body-parser");
const { dbConnect } = require('./config/db');
// const movieData = require('./src /router/movieData.json');
const app = express()

dbConnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/movie',require("./src /router/movie"))
app.use('/api/user', require("./src /router/user"))
app.use('/api/auth', require("./src /router/auth"))
app.use('/api/review', require("./src /router/movieReview"))


const PORT = process.env.PORT || 1900;

app.listen(PORT, () => {
    console.log("server is runing",PORT)
})








