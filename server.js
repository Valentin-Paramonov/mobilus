var express = require('express'),
    bodyParser = require('body-parser');

var server = express();

var HOME = __dirname,
    PORT = 4848;

server.use(bodyParser.json());
server.set('view engine', 'jade');
server.set('views', HOME + '/views');
server.locals.pretty = true;

server.use('/test-data', require('./routes/test-data'));

server.get('/', function(request, response) {
    response.send('Data received!');
});

server.post('/', function(request, response) {
    console.log(request.body);
    response.send(request.body);
});

server.get('/log', function(request, response) {
    response.render('log');
});

server.listen(PORT, function() {
    console.log('Listening on port ' + PORT);
});
