const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const movieRoutes = express.Router();
const PORT = 4000;

let Movie = require('./movie.model');
let User = require('./user.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/funny-movies', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})


movieRoutes.route('/').get(function (req, res) {
    Movie.find(function (err, movies) {
        if (err) {
            console.log(err);
        } else {
            console.log(movies);
            res.json(movies);
        }
    });
});
movieRoutes.route('/share').post(function (req, res) {
    let movie = new Movie(req.body);
    movie.save()
        .then(movie => {
            res.status(200).json({ 'movie': 'added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new fail');
        });
});
movieRoutes.route('/:id').get(function (req, res) {
    let id = req.params.body;
    Movie.findById(id, function (err, movie) {
        res.json(movie);
    });
});

movieRoutes.route('/signin').post(function (req, res) {
    User.findOne(req.body, function (err, data) {
        if (data)
            res.status(200).json(data);
        let user = new User(req.body);
        user.save()
            .then(user => {
                res.status(200).json(user);
            });
    });
});

app.use('/', movieRoutes);

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});