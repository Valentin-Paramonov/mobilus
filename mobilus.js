var express = require('express'),
    bodyParser = require('body-parser');

var mobilus = express();

var HOME = __dirname,
    PORT = 4848;

mobilus.locals.pretty = true;
mobilus.use(bodyParser.json());
mobilus.set('view engine', 'jade');
mobilus.set('views', HOME + '/views');

mobilus.use('/test-data', require('./routes/test-data'));

mobilus.get('/', function(request, response) {
    response.send('Data received!');
});

mobilus.post('/', function(request, response) {
    console.log(request.body);
    response.send(request.body);
});

mobilus.get('/log', function(request, response) {
    response.render('log');
});

mobilus.listen(PORT, function() {
    console.log('Listening on port ' + PORT);
});
