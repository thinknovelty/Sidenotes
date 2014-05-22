/**
 * Logging. Right now this is just a wrapper for
 * the winston lib. The wrapping is so logging can
 * be swapped easily.
 */
var winston = require('winston');
var Logger = {};

winston.addColors({
    info: "green",
    warning: "orange",
    debug: "blue",
    error: "red"
});

var logger = new(winston.Logger)({
    transports: [
        new(winston.transports.Console)({
            'timestamp': true,
            level: 'info',
            silent: false,
            colorize: true
        })
    ]
});

logger.extend(Logger);
module.exports = Logger;
