
//module is native node
module.exports = {

	builder : {
		enableServer : false,
		serverRoot : '/www_builder',
		port    : 8080,
		
		/*turns off sass*/
		useSass : false, 
		/*sass properties*/
		sassProps : {
			sassDir    : 'style/builder',
			outputDir  : 'www_builder/style',
			outStyle   : 'expanded'
		}
	},

	mobile : {

		enableServer : true,
		serverRoot : '/www_mobile',
		port    : 3000,
		useSass : false,
		sassProps : {
			sassDir    : 'style/mobile',
			outputDir  : 'www_mobile/style',
			outStyle   : 'expanded'
		}

	}

};

