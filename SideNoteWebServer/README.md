Basic
---------
This folder consists of both a node server app and two client apps. The node part is really 
a small self-contained server. There's no real serverside functionality here. The focus is 
on the client-side apps within the www* folders.  



Project Folder Structure:
--------------------------
backups - backup space.
config - server config files
lib - server app libraries and helpers
node_modules - node plugin folder (automatically managed)
reference - scratch space for references
routes - server route handling
	builder - builder specific routes
	mobile - mobile specific routes
style - sass styling workspace (only if you use sass)
templates - any serverside templating
views - any serverside views
	builder - builder specific views
	mobile - mobile specific views
www_builder - builder client-side app root
	img - builder images
	js - builder app
		lib - builder app modules
		vendor - 3rd party libraries
		app.js - main builder app
	style - builder stylesheets
	index.html - builder app markup
www_mobile - mobile client-side app route
	img - mobile app images
	js - mobile app
		lib - common app functionality and modules
		models - mobile app models
		vendor - 3rd party libraries
		views - mobile app views
		app.js - main mobile app
		bootstrap.js - can be used to load up app resources or global registrations
		page.js - page controller for mobile app
		router.js - url routing for mobile app
	style - mobile app style sheets
	index.html - base app markup
	settings.json - serverside settings used to configure client.
app.js - main server app file. runs everything that's enabled in the config.
bootstrap.js - used to load some basic server app resources.
builder.js - starts the builder server services. can be used standalone.
iware.js - iware dummy server. used for testing in the absense of iware.
mobile.js - starts the mobile server services. can be used standalone.
package.json - defines node (server side) app, including dependencies.
scss.js - used to run sass services if you want sass.



	"dependencies": {
		"lodash"      : "*",  convenience object handling. util library like jquery. Not being used
		"moment"      : "*",  time library
		"handlebars"  : "*",  template engine
		"consolidate" : "*",  bridge for handlebars into express. not being used
		"express"     : "*",  static web server
		"restler"     : "*",  makes rest style request into iware
		"winston"     : "*"   logging
	}

Install commands:
npm install //installs whats in the dependencies list in package.json
npm install -g nodemon //-g is a global install. nodemon automatic restart of server
node app.js //runs everything using node. "nodemon app.js" uses nodemon to watch for changes
            //.nodemonignore ignores certain files/folders