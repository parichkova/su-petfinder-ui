
var socket = new WebSocket('ws://localhost:8081/');

socket.onopen = function(event) {
  log('Opened connection 🎉');
}

socket.onerror = function(event) {
  log('Error: ' + JSON.stringify(event));
}

socket.onmessage = function (event) {
  log('Received: ' + event.data);
}

socket.onclose = function(event) {
  log('Closed connection 😱');
}

var log = function(text) {
  console.log(text);
}

window.addEventListener('beforeunload', function() {
  socket.close();
});
