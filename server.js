// modules =================================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
require("dotenv").config();



var movies = require('./app/movie-crud');
var city = require('./app/city-crud');
var theatre = require('./app/theatre-crud');
var showtime = require('./app/showtime-crud');
var assign = require('./app/assign-crud');
var book = require('./app/bookings-crud');

// configuration ===========================================

// config files
//var db = require('./config/db');
app.use(bodyParser.json({})); // parse application/json

app.use('/movie', movies);
app.use('/city', city);
app.use('/theatre', theatre);
app.use('/showtime', showtime);
app.use('/assign', assign);
app.use('/book', book);

/* local database
var mongo = require('mongodb');
var mongoose = require('mongoose');
var dbHost = 'mongodb://localhost:27017/dbHost' //version 2
mongoose.connect(dbHost);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to DB");
});*/

const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});


var port = process.env.PORT || 3000; // set our port
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);
console.log('Server starts on port ' + port); // shoutout to the user
exports = module.exports = app; // expose app