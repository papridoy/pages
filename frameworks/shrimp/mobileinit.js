function mobileInit(inputProperties){
	_newEl('meta',{'name':'HandheldFriendly','content':'true'}).insert(document.head);
	_newEl('meta',{'name':'apple-mobile-web-app-capable','content':'yes'}).insert(document.head);
	_newEl('meta',{'name':'apple-mobile-web-app-status-bar-style','content':'default'}).insert(document.head);
	_newEl('link',{'rel':'stylesheet','type':'text/css','href':'http://static.publ.com/mobile/'+inputProperties.version+'/styles/index.css'}).insert(document.head);
	_newEl('link',{'rel':'stylesheet','type':'text/css','href':'http://static.publ.com/mobile/'+inputProperties.version+'/styles/style.css'}).insert(document.head);
	_dom('body')[0].attr('id','body');
	var utilsjs = _newEl('script',{'type':'text/javascript'});
	utilsjs.on('load',function(){
		load();
	});
	utilsjs.el.src = 'http://static.publ.com/mobile/'+inputProperties.version+'/javascript/utils.js';
	utilsjs.insert(document.head);

	window.properties = {};
	window.properties.book = inputProperties.hash;
	properties.pass = inputProperties.pass;
	properties.user = inputProperties.ticket;
	if (window.location.hash){
		var hashParameters = window.location.hash.split("#")[1].split("/");
		window.properties.page = parseInt(hashParameters[0]);
	}

	var serv = window.location.protocol+'//'+inputProperties.serv+'/';

	PS = properties.pass;
	USERID = properties.user;

	LOCALS_FOLDER = 'http://static.publ.com/mobile/'+inputProperties.version+'/locals';
	STYLES_FOLDER = 'http://static.publ.com/mobile/'+inputProperties.version+'/styles';
	JAVASCRIPT_FOLDER = 'http://static.publ.com/mobile/'+inputProperties.version+'/javascript';

	FILES_FOLDER = serv + "BookDataLink/" + properties.book;
	ASSETS_FOLDER = serv + "BookDataLink/" + properties.book + "/mobile";
	COMMON_FOLDER = serv + "BookDataLink/" + properties.book + "/common";
	BACKGROUND_FOLDER = serv + "BookDataLink/" + properties.book;

	BG_COLOR = "000000";
	PUBLICATION_NAME = "HermanMiller - Filing and Storage";

};