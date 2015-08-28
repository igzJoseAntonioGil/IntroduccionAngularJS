var express = require('express');
var path = require('path');
var server = express();

server.use(express.static(path.join(__dirname, 'app')));
server.listen(process.env.PORT || '3000');
console.log('Server listening on localhost: 3000');
