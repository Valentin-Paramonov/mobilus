const ONE_KB = 1024;
const ONE_MB = 1024 * ONE_KB;
const MAX_ALLOWED_BYTES = 5 * ONE_MB;

module.exports = (function() {
    var router = require('express').Router();
    var bodyParser = require('body-parser');
    var HttpStatus = require('http-status-codes');
    var fs = require('fs');

    bodyParser.raw({ limit: '5mb' });

    var writeRandomDataToResponse = function(bytes, response) {
        acquireRandomDataBuffer(bytes, function(err, buffer) {
            if (err) {
                response.sendStatus(HttpStatus.SERVICE_UNAVAILABLE);
            } else {
                response.write(buffer, function() {
                    response.status(HttpStatus.OK).end();
                });
            }
        });
    };

    var acquireRandomDataBuffer = function(size, onBufferAcquired) {
        fs.open('/dev/urandom', 'r', function(err, fd) {
            if (err) {
                onBufferAcquired(err);
            } else {
                var buffer = new Buffer(size);
                fs.read(fd, buffer, 0, size, 0, function() {
                    fs.close(fd);
                });
                onBufferAcquired(null, buffer);
            }
        });
    };

    router.route('/')
        .post(function(request, response) {
            var stream = fs.createWriteStream('/dev/null');
            request.on('data', function(data) {
                stream.write(data);
            });
            request.on('end', function() {
                stream.end();
                response.sendStatus(HttpStatus.OK);
            });
        })
        .get(function(request, response) {
            var bytes = +(request.query.bytes || ONE_KB);
            if (isNaN(bytes)) {
                response.status(HttpStatus.BAD_REQUEST).json('The number of bytes must be a number');
            } else if (bytes > MAX_ALLOWED_BYTES) {
                response.status(HttpStatus.BAD_REQUEST).json('Max allowed bytes is ' + MAX_ALLOWED_BYTES);
            } else {
                writeRandomDataToResponse(bytes, response);
            }
        });

    return router;
})();