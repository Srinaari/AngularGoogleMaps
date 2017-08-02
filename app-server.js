var express = require('express'),
    server = express();

server.use(express.static(__dirname + '/'));

server.listen(3030);
console.log('Server Started in 3030 port')