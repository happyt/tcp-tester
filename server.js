var net = require('net');
var port = 8080;

var server = net.createServer(function(socket) {

    socket.on('data', function(data) {
        console.log('Server received: ' + data);
    });

	socket.write('Server open\r\n');
	socket.pipe(socket);
});

server.listen(port, '127.0.0.1');
console.log('Listening on ' + port)
