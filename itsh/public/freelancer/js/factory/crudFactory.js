// Factory for connect api.
itsh.factory('crudFactory', ['$http', '$q', function($http, $q) {
    var apiUrl = 'api/';
    var scheme = {};
    return {
        scheme: scheme,
        read: function(collection) {
            var deferred = $q.defer();

            $http.get(apiUrl+collection)
                .then( function(res) {
                    if (res.scheme) {
                        scheme[collection] = res.scheme;
                    }
                    deferred.resolve(res.data.docs);
                }, function(err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        },
        create: function(collection, data) {
            var deferred = $q.defer();

            $http.put(apiUrl+collection, data)
                .then( function(res) {
                    deferred.resolve(res.data);
                }, function(err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }
    };
}]);