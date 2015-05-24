(function() {
    var app = angular.module('mobileStats', []);
    app.controller('statsController', function($scope, $interval, $http) {
        var fetchStatistics = function() {
            $http.get('http://52.28.111.52:4848/statistics')
                .success(function(stats) {
                    $scope.stats = stats;
                }).error(function(err) {
                    console.error(err);
                });
        };
        fetchStatistics();
        var fetchPromise = $interval(fetchStatistics, 30000);
        $scope.$on('$destroy', function() {
            if (angular.isDefined(fetchPromise)) {
                $interval.cancel(fetchPromise);
                fetchPromise = undefined;
            }
        });
    });
})();