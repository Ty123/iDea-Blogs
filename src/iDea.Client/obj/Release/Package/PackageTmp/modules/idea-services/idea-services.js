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
///#source 1 1 /modules/idea-services/idea-posts.js
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
///#source 1 1 /modules/idea-services/idea-categories.js
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
///#source 1 1 /modules/idea-services/idea-tags.js
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
///#source 1 1 /modules/idea-services/idea-contacts.js
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
