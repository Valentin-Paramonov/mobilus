const WEB_DIR = __dirname + '/web';
const PARTIALS_DIR = __dirname + '/partials';
const PORT = 4848;

var express = require('express');
var bodyParser = require('body-parser');
var jadeStatic = require('connect-jade-static');

var mobilus = express();
mobilus.locals.pretty = true;
mobilus.set('view engine', 'jade');
mobilus.set('views', PARTIALS_DIR);

mobilus.use(bodyParser.json());
mobilus.use(express.static(WEB_DIR));
mobilus.use(jadeStatic({
    baseDir: PARTIALS_DIR, baseUrl: '/', jade: {
        pretty: true
    }
}));

mobilus.use('/test-data', require('./routes/test-data'));
mobilus.use('/statistics', require('./routes/statistics'));
mobilus.use(function(request, response) {
    response.status(404).render('404');
});

mobilus.listen(PORT, function() {
    console.log('Listening on port ' + PORT);
});
