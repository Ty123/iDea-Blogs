///#source 1 1 /modules/idea-controllers/idea-home.js
(function () {
    'use strict';
    app.controller('HomeController', ['$scope', 'AuthService', function ($scope, AuthService) {
        $scope.authentication = AuthService.authentication;
    }]);

})();
///#source 1 1 /modules/idea-controllers/idea-index.js
(function () {
    'use strict';
    app.controller('IndexController', ['$scope', 'AuthService', '$location', '$timeout', function ($scope, AuthService, $location, $timeout) {

        $scope.regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        $scope.loading = function () {
            document.getElementById('idea-loading').classList.add('fadeIn');
        }

        $scope.unload = function () {
            document.getElementById('idea-loading').classList.remove('fadeIn');
        }

        $scope.logOut = function () {
            AuthService.logOut();
            $location.path('#/home')
        }
    }])
})();
///#source 1 1 /modules/idea-controllers/idea-login.js
(function () {
    'use strict';
    app.controller('LoginController', ['$scope', '$window', '$timeout', 'AuthService', 'localStorageService', function ($scope, $window, $timeout, AuthService) {
        $scope.message = "";
        $scope.login = function () {
            $scope.$parent.loading();
            AuthService.login({ userName: $scope.username, password: $scope.password })
                .then(function (response) {
                    $scope.$parent.unload();
                    $window.location.href = ('#/home');
                }, function (err) {
                    $scope.$parent.unload();
                    $scope.message = err.error_description;
                });
        };
    }]);
})();
///#source 1 1 /modules/idea-controllers/idea-signup.js
(function () {

    app.controller('SignupController', ['$scope', '$location', '$timeout', 'AuthService', 'SendEmailService', function ($scope, $location, $timeout, AuthService, SendEmailService) {

        $scope.savedSuccessfully = false;
        $scope.message = "";

        $scope.signUp = function () {
            $scope.$parent.loading();
            AuthService.saveRegistration({ email: $scope.username, password: $scope.password, confirmPassword: $scope.password }).then(function (response) {
                //var userId = response.data.userId,
                //    code = response.data.code,
                //    url = 'http://localhost:53017/#/activate/' + userId + '/' + code;
                //    body = '<p>Please activate your account by click this <a href="' + url + '" target="_blank">activate link</a></p>',
                //    message = {
                //        destination: $scope.username,
                //        subject: 'Verify your account',
                //        body: body
                //    };
                //    console.log(code);
                //var userId = response.data.userId,
                //    url = $location.url(),
                //    body = '<p>Please activate your account by click this <a href="http://localhost:53017/#/activate/2" target="_blank">activate link</a></p>',
                //    message = {
                //        destination: $scope.username,
                //        subject: 'Verify your account',
                //        body: body
                //    };

                var userId = response.data.userId,
                    code = response.data.code,
                    callbackUrlBase = 'http://localhost:53017/#/activate/',
                    destination = $scope.username;

                var message = {
                    userId: userId,
                    callbackUrlBase: callbackUrlBase,
                    code: code,
                    destination: destination
                };

                SendEmailService.send(message).then(function (response) {
                    $scope.message = " Please check your email [ " + $scope.username + " ] activate your account.";

                    $scope.savedSuccessfully = true;
                    $scope.username = undefined;
                    $scope.password = undefined;
                    $scope.signupForm.$setValidity();
                    $scope.signupForm.$setPristine();
                    $scope.signupForm.$setUntouched();
                    $scope.$parent.unload();
                }, function (error) {
                    $scope.$parent.unload();
                });
            }, function (response) {
                $scope.$parent.unload();
                var errors = [];
                for (var key in response.data.modelState) {
                    for (var i = 0; i < response.data.modelState[key].length; i++) {
                        errors.push(response.data.modelState[key][i]);
                    }
                }
                $scope.message = "" + errors.join(' ');
            });
        };
    }]);
})();
///#source 1 1 /modules/idea-controllers/idea-forget.js
(function () {
    'use strict';
    app.controller('ForgetController', ['$scope', 'ResetService', '$http', function ($scope, ResetService, $http) {
        $scope.regex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/i;

        $scope.reset = function () {
            ResetService.reset($scope.username).then(function (response) {
            }, function (error) {
                alert(JSON.stringify(error));
            })
        }
    }])
})();
///#source 1 1 /modules/idea-controllers/idea-reset.js
(function () {
    app.controller('ResetController', ['$scope', 'ResetService', '$http', function ($scope, ResetService, $http) {
        $scope.regex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/i;

        $scope.reset = function () {
            ResetService.reset($scope.username).then(function (response) {
            }, function (error) {
                alert(JSON.stringify(error));
            })
        }
    }])
})();
///#source 1 1 /modules/idea-controllers/idea-activate.js
(function () {
    app.controller('ActivateController', ['$scope', '$routeParams', 'ActivateService', '$window', function ($scope, $routeParams, ActivateService, $window) {
        $scope.userId = $routeParams.userId;
        $scope.code = $routeParams.code;
        $scope.activate = function () {
            $scope.$parent.loading();
            var data = {
                userId: $scope.userId,
                code: $scope.code
            };

            ActivateService.activate(data).then(function (response) {
                $scope.$parent.unload();
                $window.location.href = ('#/login');
            }, function (error) {
                $scope.$parent.unload();
                alert(JSON.stringify(error));
            })
        }
    }])
})();
