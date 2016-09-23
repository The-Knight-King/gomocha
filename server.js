var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
// var database = require('./database');
var mongoose = require('mongoose');
var db = mongoose.connection;

// db.on('error', console.error);
// db.once('open', function() {
//   Create your schemas and models here.
// });

mongoose.connect('mongodb://localhost/test');



var movieSchema = new mongoose.Schema({


});

// Compile a 'Movie' model using the movieSchema as the structure.
// Mongoose also creates a MongoDB collection called 'Movies' for these documents.
var Movie = mongoose.model('Movie', movieSchema);




var thor = new Movie({
  title: 'Thor'
, rating: 'PG-13'
, releaseYear: '2011'  // Notice the use of a String rather than a Number - Mongoose will automatically convert this for us.
, hasCreditCookie: true
});

thor.save(function(err, thor) {
//  if (err) return console.error(err);
//  console.dir(thor);
console.log(thor);
});







// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------








var orderSchema = mongoose.Schema({
    username: String,
    items: Array,
    specialInstructions: String,
    selectedShop: String,
    selectedShop_id: String,
    favorited: Boolean
});

var Orders = mongoose.model('Order', orderSchema);

mongoose.connection.once('open', function() {
    console.log('connection established!');
});

var create = function(order, callback) {
    Orders.create(order, function(err, result) {
        if (err || !order) {
            console.error("Could not create order", order);
            console.log(err);
            return;
        }
        console.log("Created order", order);
        callback(null, result);
    });
};

var read = function(filter, callback) {
    Orders.find(filter, function(err, listOfOrders) { // needs to be able to find all values in an array
        if (!listOfOrders || err) {
            console.error("Could not read snippet");
            return;
        }
        console.log("Read list of orders:", listOfOrders);
        callback(null, listOfOrders);
    });
};

/* ----------------------------------------- */










function requestHandler(request, response) {
    response.sendFile(__dirname + '/public/index.html');
}

app.use(express.static(__dirname + '/public')); // creates special route for handling static files (.js, .html, .css). These will automatically be served from public directory when something is requested

app.get('/api/users/:username/orders/previous', function(req, res) {
    console.log(req.params);
    read({username: req.params.username}, function(err, listOfOrders) {
        res.json(listOfOrders);
    })
})

app.get('/api/users/:username/orders/favorites', function(req, res) {
    console.log(req.params);
    read({
        favorited: true,
        username: req.params.username
        }, function(err, listOfOrders) {
            res.json(listOfOrders);
    })
})
// send back list of orders from /previous
// send back list of favorited orders from /favorites
app.post('/api/orders', jsonParser, function(req, res) {
    create(req.body, function(err, order) {
        res.json(order);
    });
})

app.post('/api/orders/remove', jsonParser, function(req, res) {
    Orders.remove({}, function(err) {
        console.log('collection removed');
        res.status(201);
    });
})

app.get('*', requestHandler);

var test = function() {
    console.log('app listening on port 4000');
}

app.listen(process.env.PORT || 4000, test);
