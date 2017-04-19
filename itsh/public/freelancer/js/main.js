// Create module.
var itsh = angular.module('itsh', []);

// Products controller.
itsh.controller('ProductController', ['$scope', '$http', function($scope, $http) {
    // $scope.search = 'Portfolio';

    $scope.checkRow = function(key) {
        return ["_id", "__v"].indexOf(key) == -1;
    };

    $http.get('api/product')
        .then( function(serverResponse) {
            console.log(serverResponse.data);
            $scope.tableData = serverResponse.data;
        }, function(err) {
            console.error(err);
        });
}]);