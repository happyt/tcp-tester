var net = require('net');

var CG = {

    ip: '1.2.3.4',
    port: 8080,
    replies: true,
    quiet: false,
    live: true,
    counter: 0,
    logging: 1,
    socket: 0,

    open: function() {
        dlog('Opening a port to CG...' + this.ip + ", " + this.port);

        var _this = this;

        this.socket = net.connect({host: this.ip, port: this.port},
            function() { //'connect' listener
                _this.live = true;
                dlog('client open');
            });

        this.socket.on('data', function(data) {
            dlog('received: ' + data);
        });

        this.socket.on('end', function() {
            this.live = false;
            dlog('client ended');
        });

        this.socket.on('close', function() {
            this.live = false;
            dlog('client closed');
        });

        this.socket.on('timeout', function() {
            dlog('client timed out');
        });

        this.socket.on('error', function(e) {
            dlog('client error ' + e);
        });

        this.socket.on('connect', function() {
            dlog('client connected');
        });

    },

    version: function() {
        this.sendCommand("MAIN VERSION");
    },

    replySwap: function() {
        this.replies = !this.replies;
    },

    quietSwap: function() {
        this.quiet = !this.quiet;
    },

    sendCommand: function(cmd) {

        //   dlog('Live?: ' + this.live);

        if (!this.live) {
            dlog('Re-opening a port to CG...' + this.ip + ", " + this.port);
            this.open();
        }

        if (this.replies  && !this.quiet) {
            this.counter++;
            this.socket.write(this.counter + " " + cmd + "\0");
        } else {
            if (this.quiet) {
                this.socket.write("@ " + cmd + "\0");
            } else  {
                this.socket.write("-1 " + cmd + "\0");
            }
        }
    },

    end: function() {
        this.live = false;
        this.socket.end();
    },

    close: function() {
        this.live = false;
        this.socket.end();
    },

    destroy: function() {
        this.live = false;
        this.socket.destroy();
    }
};

function dlog(data) {
    if (CG.logging > 0) {
        console.log('\x1b[36m\>>>\x1b[37m ' + data);
    }
}

module.exports = CG;