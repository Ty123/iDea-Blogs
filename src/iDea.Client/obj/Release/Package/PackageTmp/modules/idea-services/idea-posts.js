(function () {
    app.factory('PostService', ['$http', '$q', '$log', 'ngAuthSettings', function ($http, $q, $log, ngAuthSettings) {
        var service = {},
            url = ngAuthSettings.apiDalBaseUri;

        var _allPosts = function () {
            var deferred = $q.defer();
            $http.get(url + 'api/Posts/').success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        service.allPosts = _allPosts;

        return service;
    }])
})();