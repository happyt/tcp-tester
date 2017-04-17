var net = require('net');
var port = 8080;

var client = new net.Socket();


client.on('data', function(data) {
	console.log('Received: ' + data);
});

client.on('end', function() {
    this.live = false;
    dlog('client ended');
});

client.on('timeout', function() {
    dlog('client timed out');
});

client.on('error', function() {
    dlog('client error');
});

client.on('close', function() {
	console.log('Connection closed');
});
function dlog(data) {
        console.log('\x1b[36m\>>>\x1b[37m ' + data);
}
client.connect(port, '127.0.0.1', function() {
	console.log('Connected');
	client.write('Hello world.');
});