/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  10/16/2016
 */
'use strict';

const paths = require('path');

module.exports = {
    resolve: {
        root: [
            paths.resolve('./Client/resources/paths')
        ]
    },
    entry: "./Client/src/routes.js",
    output: {
        path: "./",
        filename: "Client/TripComp_webpack.js"
    },
/*    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }*/
};
