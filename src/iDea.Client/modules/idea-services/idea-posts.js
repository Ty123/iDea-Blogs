(function () {
    app.factory('PostService', ['$http', '$q', '$log', 'ngAuthSettings', function ($http, $q, $log, ngAuthSettings) {
        var service = {},
            url = ngAuthSettings.apiDalBaseUri;

        service.delete = function (id) {
            var deferred = $q.defer();
            $http.delete(url + 'api/Posts/Delete/' + id).success(function (response) {
                deferred.resolve(response);
            }).error(function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        service.getByName = function (name) {
            var deferred = $q.defer();
            $http.get(url + 'api/Posts/Search?title=' + name)
                .success(function (response) {
                    deferred.resolve(response);
                }).error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        service.getById = function (id) {
            var deferred = $q.defer();
            $http.get(url + 'api/Posts/Details/' + id).success(function (response) {
                deferred.resolve(response);
            }).error(function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        service.edit = function (data) {
            var deferred = $q.defer();
            $http.post(url + 'api/Posts/Edit', data).success(function (response) {
                deferred.resolve(response);
            }).error(function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        service.add = function (data) {
            var deferred = $q.defer();
            $http.post(url + 'api/Posts/Add', data).success(function (response) {
                deferred.resolve(response);
            }).error(function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        service.posts = function () {
            var deferred = $q.defer();
            $http.get(url + 'api/Posts/').success(function (response) {
                deferred.resolve(response);
            }).error(function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        return service;
    }])
})();