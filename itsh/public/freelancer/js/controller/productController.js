// Products controller.
itsh.controller('ProductController', ['$scope', '$http', 'Config', 'crudFactory',
 function($scope, $http, Config, crudFactory) {
    $scope.search = {};
    $scope.newRow = {};
    $scope.cols = [
        {key: 'name', label: 'Name', valid: '^[A-Z][a-zA-Z0-9Á-Űá-ű ]{4,30}$'},
        {key: 'manufacturer', label: 'Man.', valid: '^[A-Z][a-zA-Z0-9 ]{4,30}$'},
        {key: 'price', label: 'Price', valid: '^[0-9 \.]{1,10}$'},
        {key: 'active', label: 'Active', valid: '^(true|false)$'}
    ];

    $scope.message = {};    

    $scope.checkValid = function(field) {
        return !field.$valid && field.$dirty && !field.$pristine;
    };

    $scope.editRow = function(row) {
        console.log(row);
        $http.post('api/product/' + row._id, row)
            .then( function(serverResponse) {
                console.log(serverResponse.data);
                $scope.message = {
                    mTitle: Config.message.saveSuccess, 
                    mMessage: Config.message.saveModified
                };
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
        crudFactory.create('product', row)
            .then( function(row) {
                $scope.tableData.push(row);
                $scope.newRow = {};
            });
    };

    crudFactory.read('product')
        .then( function(data) {
            console.log(data);
            $scope.tableData = data;
        }, function(err) {
            console.error(err);
        });
}]);