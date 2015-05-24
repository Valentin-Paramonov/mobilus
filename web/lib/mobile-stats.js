(function() {
    var app = angular.module('mobileStats', []);
    app.controller('statsController', function($scope, $http) {
        $http.get('http://52.28.111.52:4848/statistics')
            .success(function(stats) {
                $scope.stats = stats;
            }).error(function(err) {
                console.error(err);
            });
    });
})();