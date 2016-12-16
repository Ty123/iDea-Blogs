///#source 1 1 /modules/idea-services/idea-authen.js
(function () {
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
///#source 1 1 /modules/idea-services/idea-interceptor.js
(function () {
    'use strict';
    app.factory('AuthInterceptorService', ['$q', '$injector', '$location', 'localStorageService', function ($q, $injector, $location, localStorageService) {

        var service = {};

        var _request = function (config) {

            config.headers = config.headers || {};

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }

            return config;
        }

        var _responseError = function (rejection) {
            if (rejection.status === 401) {
                var authService = $injector.get('AuthService');
                var authData = localStorageService.get('authorizationData');

                authService.logOut();
                $location.path('/login');
            }
            return $q.reject(rejection);
        }

        service.request = _request;
        service.responseError = _responseError;

        return service;
    }]);
})();
///#source 1 1 /modules/idea-services/idea-reset-pwd.js
(function () {
    app.factory('ResetPwdService', ['$http', '$q', 'ngAuthSettings', function ($http, $q, ngAuthSettings) {
        var url = ngAuthSettings.apiServiceBaseUri;
        var service = {};

        var _reset = function (data) {
            var deferred = $q.defer();

            $http.post(url + 'api/Account/ResetPassword', data).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        service.reset = _reset;

        return service;

    }]);
})();
///#source 1 1 /modules/idea-services/idea-sendemail.js
(function () {
    app.factory('SendEmailService', ['$http', '$q', '$log', 'ngAuthSettings', function ($http, $q, $log, ngAuthSettings) {
        var url = ngAuthSettings.apiServiceBaseUri,
            service = {};

        var _send = function (message) {
            var deferred = $q.defer(),
                data = {
                    userId: message.userId,
                    destination: message.destination,
                    callbackUrlBase: message.callbackUrlBase,
                    code: message.code,
                    body: message.body,
                    subject: message.subject
                };

            $http.post(url + 'api/Account/SendEmail', data).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        service.send = _send;

        return service;
    }])
})();
///#source 1 1 /modules/idea-services/idea-activate.js
(function () {
    app.factory('ActivateService', ['$http', '$q', '$log', 'ngAuthSettings', function ($http, $q, $log, ngAuthSettings) {
        var url = ngAuthSettings.apiServiceBaseUri,
            service = {};

        var _activate = function (data) {
            var deferred = $q.defer();

            $http.post(url + 'api/Account/ConfirmEmail?userId='+ data.userId + '&code=' + data.code).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        service.activate = _activate;

        return service;
    }])
})();
///#source 1 1 /modules/idea-services/idea-forget-pwd.js
(function () {
    app.factory('ForgetPwdService', ['$http', '$q', 'ngAuthSettings', function ($http, $q, ngAuthSettings) {
        var url = ngAuthSettings.apiServiceBaseUri;
        var service = {};

        var _reset = function (email) {
            var deferred = $q.defer();

            $http.post(url + 'api/Account/ForgetPassword?email=' + email).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        service.reset = _reset;

        return service;

    }]);
})();
///#source 1 1 /modules/idea-services/idea-posts.js
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

        var _addPost = function (data) {
            var deferred = $q.defer();
            $http.post(url + 'api/Posts/Add', data).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        service.allPosts = _allPosts;
        service.addPost = _addPost;

        return service;
    }])
})();
///#source 1 1 /modules/idea-services/idea-categories.js
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
