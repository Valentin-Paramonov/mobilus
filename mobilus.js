const
    HOME = __dirname,
    PORT = 4848;

var mobilus = require('express')(),
    bodyParser = require('body-parser');

mobilus.locals.pretty = true;
mobilus.use(bodyParser.json());
mobilus.set('view engine', 'jade');
mobilus.set('views', HOME + '/views');

mobilus.use('/test-data', require('./routes/test-data'));
mobilus.use('/statistics', require('./routes/statistics'));

mobilus.get('/log', function(request, response) {
    response.render('log');
});

mobilus.listen(PORT, function() {
    console.log('Listening on port ' + PORT);
});
