exports.register = function (server, option, next) {
  
  var db =[
   {quote: "Nothing is Ever Random.", author: "Harry Chen 2015"},
   {quote: "I need beaver", author: "Harry Chen 26/03/2015"},
   {quote: "Demo or Die", author: "Harry"},
   {quote: "I need Bieber", author: "Harry Chen"},
   {quote: "I've never heard of it", author: "Harry Chen"},
   {quote: "You have to fork the repo and clone it in your computer", author: "Harry"},
   {quote: "What did I just see?", author: "Harry"},
   {quote: "Do you have a confession?", author: "Harry"},
   {quote: "Don't GOX me bro!", author: "Harry #classic"},
   {quote: "Yesterday is gone, but today is up for for grabs.", author: "Harry Chen"},
   {quote: "Have you forked today?", author: "Harry Chen #fakeharryquotes"},
   {quote: "Can I quickly interject?", author: "MDA"},
   {quote: "A lot of you has been trying to get some action through clicking", author: "HC"},
   {quote: "I wanna buy a lot of Fer today", author: "HC"},
   {quote: "You go, TIGER!", author: "Dom to Victoria"},
   {quote: "I tried. It's NEVER going to work for me", author: "Ken"},
   {quote: "I AM Harry Potter", author: "Harry Chen #fakeharryquotes"},
   {quote: "This is some geeky fun", author: "MDC"},
   {quote: "That's not what Jobs said", author: "HC"},
   {quote: "What ? Are we gambling here?", author: "HC"},
   {quote: "Oh, there's something to fork?", author: "XLS"},
   {quote: "That I can do. I don't even need eval", author: "MDC"},
   {quote: "Where's your javascript?", author: "Harryscript"},
   {quote: "Cloning is encouraged!", author: "HC"},
   {quote: "I'm going to get my fork. It's in the trash.", author: "Xiao"},
   {quote: "Harry === Geeky", author: "HC 1/4/2015"},
   {quote: "Xavi just blew my mind", author: "Elia <br/> wait.. when did I blow someone?", author: "XLS"},
   {quote: "I don't sweat. Ever", author: "XLS"},
   {quote: "This is ridiculous what they are suggesting", author: "Victoria referring to codeclimate"},
   {quote: "Strawpedo is actually pretty good", author: "Michael"},
   {quote: "If you ever have a daughter..... ", author: "Xiao..... Uhhhhhhhhhhh"},
   {quote: "...I'll ruin her before you can find me...", author: "xiao"},
   {quote: "I KNOW WHO'S COMING TO  MY FUNERAL", author: "Xiao"},
   {quote: "that's what she said", author: "Xiao"},
   {quote: "why would she say that??", author: "Michael"},
   {quote: "SO much sausage.... What do we(I) even do here... The sausage has exploded.... Oh wow that's good hmmmm mmmmmm", author: "Dom"},
   {quote: "I want to get real seriously deep tonight", author: "Dom"},
   {quote: "it's all in the back hand", author: "Dom, 'the beast' dunnet"},
   {quote: "Do you want me to hold it for you do you can do it with two hands?", author: "Dimple"},
   {quote: "When programmers see an INFINITE amount of forms to access a government, they are like: GG", author: "Harry Chen"},
   {quote: "You Are Being Smart Today", author: "The DOM."},
   {quote: "This was Distracting (Points to [Dom's] Balls)", author: "HC"},
   {quote: "So far you've all been consuming from my backend", author: "HC"},
   {quote: "I got rickroll'ed! I got rickroll'ed!", author: "Xiao"},
   {quote: "WOAAH", author: "Mia"},
   {quote: "Omg! Did it go to Mars? OMG! Did I go to Mars?", author: "HC"},
   {quote: "I'm not EVEN joking", author: "HC"},
   {quote: "WoW", author: "HC"},
   {quote: "෴", author: "HC"},
   {quote: "It's kinda like a prostitution", author: "MDC"}
];
  //here's where all the routes for our API will go 
  server.route([
    // HELLO WORLD
    {
      method: 'GET',
      path: '/',
      handler: function(request, reply) {
          reply("Hello, I'm an awesome HarryQuote API Server!!")
      }
    },
    { //GET ALL THE QUOTES
      method: 'GET',
      path:'/quotes',
      handler: function(request, reply) { 
        reply(db);
      },
    },
    { //GET **ONE** QUOTE
      method: 'GET',
      path: '/quotes/{id}', //why {}? just syntax lol 
      handler: function(request, reply) {
        var id = Number(request.params.id);
        if (isNaN(id)){
          return reply('Oops! Not a number!');
        }
        reply(db[id]);
//         reply(db[request.params.id]);//what are params? it's a command that modifies the request
      }
    },
    { // POST ONE QUOTE ===> slightly different from GET because we need to get the data from ajax first. Then modify it before sending it over again. PAYLOAD refers to the data that we passed
      method: 'POST',
      path: '/quotes',
      handler: function(request, reply) {
        var newQuote = request.payload.quote; // access the quote key in the hashes of new data called payload. 
        db.push(newQuote);
        reply(newQuote); 
      }
    },
    {
      method: 'DELETE',
      path: '/quotes/{id}',
      handler: function(request, reply) {
        var id = Number(request.params.id);
        db.splice(id, 1);
        reply("successfully deleted" + id);
      }
    },
    { //UPDATING THE LATEST QUOTE 
      method: 'PUT', 
      path: 'quotes/{id}',
      handler: function(request, reply) {
        var id = Number(request.params.id);
        db[id] = request.payload.newQuote; // newQuote would only work if in postman you submit key as newQuote.
        reply(db[id]);
      }
    },
    {//GET A RANDOM QUOTE
      method: 'GET',
      path: 'quotes/random',
      handler: function(request, reply) {
        var random = Math.round(Math.random(request) * db.length);
        reply (db[random]);
      }
    },
  ])
  next();
}

exports.register.attributes ={
  name: 'quotes-route',
  version: '0.0.1'
}