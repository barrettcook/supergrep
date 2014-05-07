var net  = require('net');
var ee   = require('events').EventEmitter;
var util = require('util');

// TCP logstash
function LogstashReader(file, config) {
    var self = this;

    this.file = file;
    this.lines = [];

    this.server = net.createServer(function(socket) {
        socket.setEncoding('utf8');
        socket.on('data', function(data) {
            var line = data;

            if (self.file.filter) {
                line = self.file.filter(line, config);
            }

            self.emit("line", JSON.parse(data.toString()));
        });
    }).listen(file.port);
}

LogstashReader.prototype.kill = function() {
    this.server.close();
};

util.inherits(LogstashReader, ee);

module.exports = LogstashReader;
