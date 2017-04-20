// Create module.
var itsh = angular.module('itsh', []);

// Products controller.
itsh.controller('ProductController', ['$scope', '$http', function($scope, $http) {
    $scope.search = {};

    $scope.checkRow = function(key) {
        return ["_id", "__v"].indexOf(key) == -1;
    };

    $scope.editRow = function(row) {
        console.log(row);
        $http.post('api/product/' + row._id, row)
            .then( function(serverResponse) {
                console.log(serverResponse.data);
            }, function(err) {
                console.error(err);
            });
    };

    $http.get('api/product')
        .then( function(serverResponse) {
            console.log(serverResponse.data);
            $scope.tableData = serverResponse.data;
        }, function(err) {
            console.error(err);
        });
}]);