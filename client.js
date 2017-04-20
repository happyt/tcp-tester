var readline = require('readline');
var rl;
var port = 8080;
var cg = require('./cg');

cg.ip = '127.0.0.1'
cg.port = port;

console.log('Opening cg...');
cg.open()
cg.sendCommand('Hello world.');


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
            cg.version(false);
        } else if (cmd === "r") {
            cg.replySwap();
        } else if (cmd === "q") {
            cg.quietSwap();
        } else if (cmd === "d") {
            cg.destroy();
        } else if (cmd === "e") {
            cg.end();
        } else {
            cg.sendCommand(cmd);       // eg MAIN VERSION
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