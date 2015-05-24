const
    ONE_KB = 1024,
    ONE_MB = 1024 * ONE_KB,
    MAX_ALLOWED_BYTES = 5 * ONE_MB;

module.exports = (function() {
    var router = require('express').Router(),
        bodyParser = require('body-parser'),
        HttpStatus = require('http-status-codes'),
        fs = require('fs');

    bodyParser.raw({ limit: '5mb' });

    router.route('/')
        .post(function(request, response) {
            var stream = fs.createWriteStream('/dev/null');
            request.on('data', function(data) {
                stream.write(data);
            });
            request.on('end', function() {
                stream.end();
                response.status(HttpStatus.OK)
                    .json();
            });
        })
        .get(function(request, response) {
            var bytes = +(request.query.bytes || ONE_KB);
            if (isNaN(bytes)) {
                return response.status(HttpStatus.BAD_REQUEST)
                    .json('The number of bytes must be a number');
            }
            if (bytes > MAX_ALLOWED_BYTES) {
                return response.status(HttpStatus.BAD_REQUEST)
                    .json('Max allowed bytes is ' + MAX_ALLOWED_BYTES);
            }
            acquireRandomDataBuffer(bytes, function(err, buffer) {
                if (err) {
                    return response.sendStatus(HttpStatus.SERVICE_UNAVAILABLE);
                }
                response.write(buffer, function() {
                    response.status(HttpStatus.OK)
                        .end();
                });
            });
        });

    function acquireRandomDataBuffer(size, onBufferAcquired) {
        fs.open('/dev/urandom', 'r', function(err, fd) {
            if (err) {
                onBufferAcquired(err);
                return;
            }
            var buffer = new Buffer(size);
            fs.read(fd, buffer, 0, size, 0, function() {
                fs.close(fd);
            });
            onBufferAcquired(null, buffer);
        });
    }

    return router;
})();