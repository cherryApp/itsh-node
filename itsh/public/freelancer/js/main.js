// Create module.
var itsh = angular.module('itsh', []);

// Products controller.
itsh.controller('ProductController', ['$scope', '$http', function($scope, $http) {
    $scope.search = {};
    $scope.newRow = {};
    $scope.cols = [
        {key: 'name', label: 'Name'},
        {key: 'manufacturer', label: 'Man.'},
        {key: 'price', label: 'Price'},
        {key: 'active', label: 'Active'}
    ];

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

    $scope.deleteRow = function(row) {
        console.log(row);
        $http.delete('api/product/' + row._id)
            .then( function(serverResponse) {
                var res = serverResponse.data;
                if (res.ok == 1) {
                    var index = $scope.tableData.indexOf(row);
                    $scope.tableData.splice(index, 1);
                }
            }, function(err) {
                console.error(err);
            });
    };

    $scope.insertRow = function(row) {
        $http.put('api/product', row)
            .then( function(serverResponse) {
                var newRow = serverResponse.data;
                $scope.tableData.push(newRow);
                $scope.newRow = {};
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