(function (app) {
    'use strict';
    app.factory('ContactService', ['$http', '$q', '$log', 'ngAuthSettings', function ($http, $q, $log, ngAuthSettings) {
        var url = ngAuthSettings.apiDalBaseUri, service = {};

        service.delete = function (id) {
            var deferred = $q.defer();
            $http.delete(url + 'api/Contacts/Delete/' + id).success(function (response) {
                deferred.resolve(response);
            }).error(function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        service.getByName = function (name) {
            var deferred = $q.defer();
            $http.get(url + 'api/Contacts/Search?title=' + name)
                .success(function (response) {
                    deferred.resolve(response);
                }).error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        service.getById = function (id) {
            var deferred = $q.defer();
            $http.get(url + 'api/Contacts/Details/' + id).success(function (response) {
                deferred.resolve(response);
            }).error(function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        service.edit = function (data) {
            var deferred = $q.defer();
            $http.post(url + 'api/Contacts/Edit', data).success(function (response) {
                deferred.resolve(response);
            }).error(function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        service.add = function (data) {
            var deferred = $q.defer();
            $http.post(url + 'api/Contacts/Add', data).success(function (response) {
                deferred.resolve(response);
            }).error(function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        service.posts = function () {
            var deferred = $q.defer();
            $http.get(url + 'api/Contacts/').success(function (response) {
                deferred.resolve(response);
            }).error(function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        return service;
    }])
})(app)