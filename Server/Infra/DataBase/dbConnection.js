/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  29/12/2015
 */
'use strict';
const properties = require('./dbProperties');
const mongoose = require('mongoose');

let connection;

function getConnection() {
    mongoose.Promise = global.Promise;

    function createConnection() {
        return mongoose.createConnection(properties.DB_HOST)
            .on('error', console.error.bind(console, 'connection error:'));
    }

    if (!connection) {
        connection = createConnection();
    }
    return connection;
}

module.exports = {getConnection: getConnection};