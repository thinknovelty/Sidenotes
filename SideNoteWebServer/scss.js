require('./bootstrap.js');
var logger = appLogger();
var _u = require('lodash');


var $defaults = {

	/*
	 * Sass libs to load
	 */
	libs : [
		'style/bourbon',
		'style/compass',
		'style/neat'
	],

	/*
	 * directory where your sass files are 
	 * located. 
	 * 
	 * Default is './style'.
	 */
	sassDir    : 'style',

	/*
	 * Output directory. This should be your 
	 * public root css dir.
	 *
	 * Default is ./www/syle
	 */
	outputDir  : 'www/style',

	/*
	 * Compiled css output format. 
	 *
	 * Default is expanded

	 * @see sass --style optins
	 */
	outStyle   : 'expanded'
};

var _sassProc;
var scssWatcher;

/**
 * Create a new sass watcher. This just runs 
 * sass so you don't have to open another window
 * for it.
 * 
 * @param  {object} options options to pass to sass
 */
scssWatcher = exports.scssWatcher = function(options) {
	$options = _u.extend($defaults, options);

	var cmd = 'sass';
	var opts = ['--watch'];
	opts.push($options.sassDir+':'+$options.outputDir);

	opts.push('--style');
	opts.push($options.outStyle);

	$options.libs.forEach(function(lib) {
		opts.push('-I');
		opts.push(lib);
	});

	opts.push('--scss');


	var sass = require('child_process').spawn(cmd, opts, {/*detached:true,*/ stdio: 'inherit'});

	sass.on('exit', function (code) {
		if (code !== 0) {
			console.log('exiting sass ' + code);
		}
	});

	/**
	 * Try to kill the sass process. Used when this process 
	 * gets controlled by another process like nodemon.
	 * @param  {Function} callback something to do when we're done cleaning up
	 */
	sass.cleanup = function(callback) {
		logger.info('killing sass');
		// send Ctrl+C to the sass (ruby) process
		this.kill('SIGINT');
		// return control
		return setTimeout(callback, 0);
	};


	//_sassProc = sass;
	return sass;
};


/**
 * Run this straight from the commandline, not 
 * as an included file.
 */
if ( !module.parent ) {
	var which = 'tool';
	if ( process.argv.length > 2 ) {
		which = process.argv[2];
	}
	
	var base   = appConfig()
	var config = {};
	var props  = {};

	if ( base.hasOwnProperty(which) ) {
		config = base[which];
	}

	if ( config.hasOwnProperty('sassProps') ) {
		props = config['sassProps'];
	}

	logger.info('loaded ' + which + ' config');
	logger.info('starting sass watcher');
	scssWatcher(props);
}

