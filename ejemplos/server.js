var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var server = express();

var relojes = [{
    ciudad: 'Madrid',
    diferencia: 0
  }];

server.use(express.static(path.join(__dirname, 'app')));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.get('/api/reloj', function (req, res, next) {
  res.send(relojes);
});
server.post('/api/reloj', function (req, res, next) {
  //var reloj = JSON.parse(req.body);
  relojes.push(req.body);
  res.send();
});
server.delete('/api/reloj/:ciudad', function (req, res, next) {
  var ciudad = req.params.ciudad;
  relojes = relojes.filter(function (item) {
    return item.ciudad != ciudad;
  });
  res.send(relojes);
});


server.listen(process.env.PORT || '3000');
console.log('Server listening on localhost: 3000');
