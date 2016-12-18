(function () {
    app.factory('TagService', ['$http', '$q', '$log', 'ngAuthSettings', function ($http, $q, $log, ngAuthSettings) {

        var service = {}, url = ngAuthSettings.apiDalBaseUri;

        service.tags = function () {
            var deferred = $q.defer();
            $http.get(url + 'api/Tags').success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        service.add = function (data) {
            var deferred = $q.defer();

            $http.post(url + 'api/Tags/Add', data).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        service.edit = function (data) {
            var deferred = $q.defer();

            $http.post(url + 'api/Tags/Edit', data).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        service.delete = function (id) {
            var deferred = $q.defer();

            $http.delete(url + 'api/Tags/Delete/' + id).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        service.getById = function (id) {
            var deferred = $q.defer();

            $http.get(url + 'api/Tags/Details/' + id).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        return service;
    }])
})();