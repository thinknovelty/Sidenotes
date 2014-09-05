var winston = require('winston');
var Logger = {};

var logger = new winston.Logger({
    transports: [
        new(winston.transports.Console)({
            level: 'info',
            silent: false,
            colorize: true,
            timestamp: true
        })
    ]
});

logger.cli();

logger.extend(Logger);
module.exports = Logger;