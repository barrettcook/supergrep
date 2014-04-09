var ee            = require('events').EventEmitter;
var util          = require('util');
var sanitize      = require('validator').sanitize;
var elasticsearch = require('elasticsearch');

var ElasticsearchListener = function(file, config) {
    var self = this;

    ee.call(this);
    this.setMaxListeners(0);

    this.file = file;
    this.lines = [];

    this.client = new elasticsearch.Client({
        host: file.host,
        log: 'trace'
    });

    var handleHits = function(hits) {
        hits.forEach(function(line) {
            if (self.file.filter) {
                line = self.file.filter(line, config);
            }

            if (line) {
                //line = sanitize(line).entityEncode();
                self.emit("line", line);
            }
        });
    };

    setInterval(function() {
        self.client.search({
            body: {
                'query': {
                    'filtered': {
                        'query': {
                            'query_string': {
                                'query': file.query,
                            }
                        },
                        'filter': {
                            'range': {
                                '@timestamp': {
                                    from: 'now-10s',
                                    to: 'now'
                                }
                            }
                        }
                    }
                },
                'sort': {
                    '@timestamp': { 'order': 'desc' }
                }
            }
        }).then(function(body) {
            var hits = body.hits.hits;
            handleHits(hits);
        }, function(error) {
            console.trace(error.message);
        });
    }, 1000);
};

util.inherits(ElasticsearchListener, ee);

module.exports = ElasticsearchListener;
