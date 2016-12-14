(function () {
    app.factory('CategoriesService', ['$http', '$q', '$log', 'ngAuthSettings', function ($http, $q, $log, ngAuthSettings) {
        var service = {},
            url = ngAuthSettings.apiDalBaseUri;

        var _categories = function () {
            var deferred = $q.defer();
            $http.get(url + 'api/Categories').success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        var _add = function (data) {
            var deferred = $q.defer();
            $http.post(url + 'api/Categories/Add', data).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        var _edit = function (data) {
            var deferred = $q.defer();

            $http.post(url + 'api/Categories/Edit', data).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        service.edit = _edit;
        service.add = _add;
        service.categories = _categories;

        return service;
    }])
})();