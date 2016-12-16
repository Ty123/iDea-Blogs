(function () {
    app.factory('CategorieService', ['$http', '$q', '$log', 'ngAuthSettings', function ($http, $q, $log, ngAuthSettings) {
        var service = {},
            url = ngAuthSettings.apiDalBaseUri;

        service.categories = function () {
            var deferred = $q.defer();
            $http.get(url + 'api/Categories').success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        service.add = function (data) {
            var deferred = $q.defer();
            $http.post(url + 'api/Categories/Add', data).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        service.edit = function (data) {
            var deferred = $q.defer();

            $http.post(url + 'api/Categories/Edit', data).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        service.delete = function (id) {
            var deferred = $q.defer();

            $http.delete(url + 'api/Categories/Delete/' + id).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        service.getById = function (id) {
            var deferred = $q.defer();

            $http.get(url + 'api/Categories/Details/' + id).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        return service;
    }])
})();