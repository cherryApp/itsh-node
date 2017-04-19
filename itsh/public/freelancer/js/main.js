// Create module.
var itsh = angular.module('itsh', []);

// Products controller.
itsh.controller('ProductController', ['$scope', '$http', function($scope, $http) {
    $scope.search = 'Portfolio';

    $http.get('api/product')
        .then( function(serverResponse) {
            console.log(serverResponse.data);
        }, function(err) {
            console.error(err);
        });
}]);