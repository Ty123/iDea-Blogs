﻿(function () {
    'use strict';
    app.factory('AuthService', ['$http', '$q', '$log', 'localStorageService', 'ngAuthSettings', function ($http, $q, $log, localStorageService, ngAuthSettings) {

        var url = ngAuthSettings.apiServiceBaseUri;
        var service = {};

        var _authentication = {
            userName: "",
            isAuth: false,
        };

        var _saveRegistration = function (registration) {

            _logOut();

            return $http.post(url + 'api/account/register', registration).then(function (response) {
                return response;
            });

        };

        var _login = function (loginData) {

            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;
            var deferred = $q.defer();

            $http.post(url + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                localStorageService.set('authorizationData', {
                    token: response.access_token,
                    userName: loginData.userName,
                    isAuth: true
                });

                _authentication.userName = loginData.userName;
                _authentication.isAuth = true;

                deferred.resolve(response);

            }).error(function (err, status) {
                _logOut();
                deferred.reject(err);
            });

            return deferred.promise;

        };

        var _logOut = function () {

            localStorageService.clearAll();

            _authentication.isAuth = false;
            _authentication.userName = "";

        };

        var _fillAuthData = function () {

            var authData = localStorageService.get('authorizationData');

            if (authData) {
                _authentication.isAuth = true;
                _authentication.userName = authData.userName;
            }

        };

        service.saveRegistration = _saveRegistration;
        service.login = _login;
        service.logOut = _logOut;
        service.authentication = _authentication;
        service.fillAuthData = _fillAuthData;

        return service;
    }]);

})();