(function () {
    app.factory('HomeServices', ['$http', '$q', '$log', 'ngAuthSettings', function ($http, $q, $log, ngAuthSettings) {
        var url = ngAuthSettings.apiDalBaseUri,
            service = {
                posts: function () {
                    var deferred = $q.defer();
                    $http.get(url + 'api/Posts').success(function (response) {
                        deferred.resolve(response);
                    }).error(function (err, status) {
                        deferred.reject(err);
                    });

                    return deferred.promise;
                },
                categories: function () {
                    var deferred = $q.defer();
                    $http.get(url + 'api/Categories').success(function (response) {
                        deferred.resolve(response);
                    }).error(function (err, status) {
                        deferred.reject(err);
                    });

                    return deferred.promise;
                },
                tags: function () {
                    var deferred = $q.defer();
                    $http.get(url + 'api/Tags').success(function (response) {
                        deferred.resolve(response);
                    }).error(function (err, status) {
                        deferred.reject(err);
                    });

                    return deferred.promise;
                }
            };
        return service;
    }])
})();