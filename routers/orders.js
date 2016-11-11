var express = require('express');
var app = express();
var Orders = require('../app/models/orders');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var create = require('../app/methods/create');
var read = require('../app/methods/read');

app.get('/orders', jsonParser, function(req,res) {
    read({}, function(err, listOfOrders) {
        if (err) {
            res.json(err)
        }
        res.json(listOfOrders);
        res.status(200);
    })
})

app.post('/orders', jsonParser, function(req, res) {
    create(req.body, function(err, order) {
        res.json(order);
        res.status(201);
    });
})

app.delete('/orders', jsonParser, function(req, res) {
    Orders.remove({}, function(err) {
        console.log('collection removed');
        res.json('collection removed')
        res.status(200);
    });
})

module.exports = app;
