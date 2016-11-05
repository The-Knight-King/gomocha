var Orders = require('../models/orders');

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

module.exports = read;
