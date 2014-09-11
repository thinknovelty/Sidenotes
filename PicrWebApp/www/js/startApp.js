//JLH - Created 09/10/2014

'use strict';
//------- Creation of the Globel objects.
if (!window.Picr) {
    console.log("Creating the Picr object.");
    var Picr = {};
    Picr.Auth = null;
	Picr.Router = null;
	Picr.Connection = null;
	Picr.Events = null;
	Picr.Session = null;

	//Set the object;
	window.Picr = Picr;
}else{
	console.error("Error - Picr Object already exist at boot, the object will not be created again.");
}

//------ start of the startApp file
define([
        "std/auth", "std/router", "std/connection", "std/events", "std/session"
    ],
    function(Auth, Router, Connection, Events, Session) {
        // window.Picr.addInitializer(function(){
        // console.log("addInitializer");
        // _.extend(App.views, {
        // 	loader : new App.View.LoaderView({el:'#preloader'}),
        // 	header : new App.View.HeaderView(),
        // 	nav : new App.View.NavigationView(),
        // 	menu : new App.View.ContextMenu(),
        // });

        // App.addRegions({
        // 	navRegion  : 'nav.overlay', 
        // 	menuRegion : 'menu.overlay',
        // 	contentRegion : 'content'
        // });
        // App.navRegion.show(App.views.nav);
        // App.menuRegion.show(App.views.menu);

        // App.auth = new Auth({
        // 	synkJS     : App.connection
        // });

        // //when started it automatically starts the routing process looking at routes
        // App.router = new AppRouter();

        // App.session = new Session();
        // });


        // window.Picr .on('initialize:after', function() {
        // console.log("On");
        // Backbone.history.start();
        // $('menu.overlay').on('click', function(evt) {
        // 	evt.stopImmediatePropagation();
        // 	evt.preventDefault();
        // 	App.views.header.toggleMenu();
        // 	return false;
        // });
        // $('nav.overlay').on('click', function(evt) {
        // 	evt.stopImmediatePropagation();
        // 	evt.preventDefault();
        // 	App.views.header.toggleNavigation();
        // 	return false;
        // });
        // });


        //this is the init function which is called  after 
        // the application makes all its Globel objects.
        return {
            initialize: function(options) {
                console.log("Initialize of Picr application.");
                console.log(window);
                // $(function() {
                // 	var createSynkConnection = function(settings) {
                // 		App.connection = SynkJS.createSynkConnection({
                // 			 synkserver    : settings.get('iware')
                // 			,iop           : settings.get('iop')
                // 			,debug         : settings.get('debug')
                // 			,clientVersion : settings.get('clientVersion')
                // 			,host          : settings.get('host')
                // 		});
                // 	};

                // 	App.settings = new Settings({ 
                // 		url    : 'settings.json',
                // 		debug  : true
                // 	});
                // 	App.settings.fetch({
                // 		success : function(){
                // 			createSynkConnection(App.settings);

                // 			App.settings.on('change', function(){
                // 				App.eventManager.settingsUpdated(this);
                // 				if (this.hasChanged('host')) {
                // 					DeviceManager.reload({ host:App.settings.get('host') }, App.noop);
                // 				}
                // 			}, this);

                // 			App.start();
                // 		}
                // 	}); //calls sync('read')

                // 	App.eventManager.onSettingsUpdated(function(settings){
                // 		createSynkConnection(settings);
                // 	});

                // });
            }
        };
    });