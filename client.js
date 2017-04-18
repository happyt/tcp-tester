var readline = require('readline');
var rl;
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
	console.log('\x1b[36m Connected to port: ' + port + '\x1b[37m');
	client.write('Hello world.');
});

rl = readline.createInterface(process.stdin, process.stdout, null);
rl.setPrompt('> ');

console.log('\nWaiting for commands...("quit" to exit)');

rl.on('line', function(cmd) {

    if (cmd === 'quit') {
        rl.question('Are you sure? (y/n) ', function(answer) {
            if (answer === 'y') {
                rl.close();
            } else {
                rl.prompt();
            }
        });
    } else {
        // parse the command
        //
        if (cmd === "v") {
            viz.version(false);
        } else if (cmd === "r") {
            viz.replySwap();
        } else if (cmd === "q") {
            viz.quietSwap();
        } else if (cmd === "d") {
            viz.destroy();
        } else if (cmd === "e") {
            viz.end();
        } else {
            viz.sendCommand(cmd);       // eg MAIN VERSION
        }
        //    console.log('You typed:', cmd);
        //    console.log('Type "quit" to exit');
        rl.prompt();
    }

});

rl.on('close', function() {
    console.log('Bye');
    process.exit();
});

rl.prompt();