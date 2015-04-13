var Hapi = require('hapi'); //would load the hapi library by screening the current directory "node ." and instantiate the programs in the variable "Hapi"

// Crete a server with a host and port
var server = new Hapi.Server(); //WHY DID WE DECLARE THIS? NEW = constructor that creates objects from a class. .Server()creates a new server. 
server.connection({
	host: '0.0.0.0',
	port: 8888,
  routes: {cors: true} //CORS = Cross-Origin Resource Sharing; it's cool if sb wants access from outside; origin refers to other computers; without cors: true, it means that the only way to access your website is from your own computer. 
}); // .connection means, "Server, make a connection with the following address to run the program"

var plugins = [{ register: require('./routes/quotes.js') }]; //created so that we could put similar API functions in one separate file and this file would be kept clean. Plugins can be used to create new routes. 

server.register(plugins, function(err) { //if there's an error, please operate x. After plugins are installed correctly, then operate this function. 
  if (err) { throw err; } //throw is an exception statement 
  server.start(function() { //unblocking; why is console.log inside the function? To guarantee that the server will only run after the plugin is ready. 
    console.log('info', 'Server running at: ' + server.info.url);
  }); //server starts running once the the server starts 
});

server.start();//calling upon the function 