var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection({
	host: 'localhost',
	port: 8001
});

server.route({
	method: 'GET',
	path: '/cheers',
	handler: function(request, reply) {
		reply('hello world');
	}
});

server.start();