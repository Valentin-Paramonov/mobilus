var express = require('express');
var bodyParser = require('body-parser')
var server = express();

var HOME = '.';
var PORT = 4848;

server.use(bodyParser.json());
server.use(bodyParser.raw({limit: '5mb'}));
server.set('view engine', 'jade');
server.set('views', HOME + '/views');
server.locals.pretty = true;

server.get('/', function(request, response) {
    response.send('Data received!');    
});

server.post('/', function(request, response) {
    console.log(request.body);
    response.send(request.body);
});

server.post('/echo', function(request, response) {
    response.send(request.body);
});

server.get('/log', function(request, response) {
    response.render('log');
});

server.listen(PORT, function() {
    console.log('Listening on port ' + PORT);    
});
