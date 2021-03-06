var config       = require('./config/conf.js'),
    uuid         = require('node-uuid'),
    jsdom        = require('jsdom').jsdom,
    $            = require('jquery')(jsdom('<html></html>', {}).defaultView),
    request      = require('ajax-request');

var server = null;

if (config.https) {
    var fs    = require('fs'),
        https = require('https');

    const options = {
        key:  fs.readFileSync(config.key),
        cert: fs.readFileSync(config.cert)
    };

    server = https.createServer(options).listen(config.port);
} else {
    var http   = require('http');
    server = http.createServer().listen(config.port);
}

var io = require('socket.io').listen(server);

require('./src/Server/node/lobby.js')(io, $, uuid, request);
