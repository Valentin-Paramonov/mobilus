module.exports = (function() {
    return require('monk')('localhost:27017/mobilus');
})();
