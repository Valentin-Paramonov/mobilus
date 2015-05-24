module.exports = (function() {
    var router = require('express').Router();
    var HttpStatus = require('http-status-codes');
    var db = require('../modules/db');

    router.route('/')
        .post(function(request, response) {
            db.get('statistics').insert(request.body, function(err, doc) {
                if (err) {
                    response.status(HttpStatus.NOT_ACCEPTABLE).json(err);
                } else {
                    response.sendStatus(HttpStatus.CREATED);
                }
            });
        })
        .get(function(request, response) {
            db.get('statistics').find({}, {}, function(err, docs) {
                if (err) {
                    response.status(HttpStatus.BAD_REQUEST).json(err);
                } else {
                    response.status(HttpStatus.OK).json(docs);
                }
            });
        });

    return router;
})();
