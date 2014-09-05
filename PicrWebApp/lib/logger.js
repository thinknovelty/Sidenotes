/**
 * Logging. Right now this is just a wrapper for 
 * the winston lib. The wrapping is so logging can
 * be swapped easily.
 */
var winston = require('winston');
var Logger = {};

// winston.addColors({
// 	info    : "green",
// 	warning : "orange",
// 	debug   : "blue",
// 	error   : "red"
// });
// winston.cli();

//
// Configure CLI on an instance of winston.Logger
//
var logger = new winston.Logger({
	transports: [
		new (winston.transports.Console)({
			level     : 'info',
			silent    : false,
			colorize  : true,
			timestamp : true
		})
	]
});

logger.cli();

logger.extend(Logger);
module.exports = Logger;

