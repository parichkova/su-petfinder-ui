var http = require('http');
var express = require('express');
var WSS = require('ws').Server;

var app = express().use(express.static('public'));
var cors = require('cors');

app.use(cors());

var server = http.createServer(app);

server.listen(8080, '127.0.0.1');

var wss = new WSS({ port: 8081 });

app.get('/', (req, res) => {
  res.send('test');
});

app.post('/', (req, res) => {
  broadcast('shmyrkan');

  res.set('Content-Type', 'application/JSON');
  res.send(JSON.stringify({ joro: true }));
});

wss.on('connection', function(socket) {
  console.log('Opened Connection 🎉');

  var json = JSON.stringify({ message: 'Gotcha' });

  socket.send(json);
  console.log('Sent: ' + json);

  socket.on('message', function(message) {
    console.log('Received: ' + message);

    wss.clients.forEach(function each(client) {
      var json = JSON.stringify({ message: 'Something changed' });
      client.send(json);
      console.log('Sent: ' + json);
    });
  });

  socket.on('close', function() {
    console.log('Closed Connection 😱');
  });
});

var broadcast = function(param) {
  var json = JSON.stringify({
    message: param
  });

  wss.clients.forEach(function each(client) {
    client.send(json);
    console.log('Sent: ' + json);
  });
};
