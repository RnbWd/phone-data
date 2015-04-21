express = require('express.io');
app = express().http().io();
  app.use(express.static(__dirname + '/styles'));
  app.use(express.static(__dirname + '/bower_components'));
  //send index.html page
  app.get('/', function(req, res) {
      res.sendfile(__dirname + '/index.html');
  });
  app.io.route('lobby', function(req) {
    req.io.join('lobby');
    req.io.respond({
      success: 'you successfully joined the lobby',
      rooms: app.io.sockets.manager.rooms
    });
  });
  // app.io.route('motion', function(req) {
  //   for (var key in req.io.manager.roomClients[req.io.socket.id]) {
  //     if (key != '') {
  //       req.io.room(key.slice(1)).broadcast('phoneM', req.data);
  //     }
  //   }
  // });

  app.io.route('orientation', function(req) {
    for (var key in req.io.manager.roomClients[req.io.socket.id]) {
      if (key != '') {
        req.io.room(key.slice(1)).broadcast('phoneO',req.data);
      }
    }
  });
app.listen(3000);
console.log("\n\n******\n\nnode server started on port 3000\n\n******\n\n");
