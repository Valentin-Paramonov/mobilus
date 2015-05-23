var express = require('express'),
    bodyParser = require('body-parser'),
    HttpStatus = require('http-status-codes'),
    fs = require('fs');

var ONE_KB = 1024;

var router = express.Router();
module.exports = router;

bodyParser.raw({ limit: '5mb' });

function randomData(bytes) {
    var fd = fs.openSync('/dev/urandom', 'r');
    var buffer = new Buffer(bytes);
    fs.read(fd, buffer, 0, bytes, 0, function() {
        fs.close(fd);
    });
    return buffer;
}

router.route('/')
    .post(function(request, response) {
        fs.writeFile('/dev/null', request.body, function() {
            response.sendStatus(HttpStatus.OK);
        });
    })
    .get(function(request, response) {
        var bytes = parseInt(request.query.bytes || ONE_KB);
        if (isNaN(bytes)) {
            response.status(HttpStatus.BAD_REQUEST)
                .json("failed to parse 'bytes' parameter");
            return;
        }
        response.write(randomData(bytes), function() {
            response.status(HttpStatus.OK)
                .end();
        });
    });
