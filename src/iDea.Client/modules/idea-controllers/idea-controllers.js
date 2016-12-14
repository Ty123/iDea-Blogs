///#source 1 1 /modules/idea-controllers/idea-home.js
(function () {
    'use strict';
    app.controller('HomeController', ['$scope', 'AuthService', function ($scope, AuthService) {
        //$scope.authentication = AuthService.authentication;
        $scope.loading = function () {
            $scope.$parent.loading();
        }

        $scope.unload = function () {
            $scope.$parent.unload();
        }
    }]);
})();
///#source 1 1 /modules/idea-controllers/idea-index.js
(function () {
    'use strict';
    app.controller('IndexController', ['$scope', 'AuthService', '$location', '$timeout', function ($scope, AuthService, $location, $timeout) {

        $scope.authentication = AuthService.authentication;

        $scope.regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        $scope.loading = function () {
            document.getElementById('idea-loading').classList.add('fadeIn');
        }

        $scope.unload = function () {
            document.getElementById('idea-loading').classList.remove('fadeIn');
        }

        $scope.logout = function () {
            AuthService.logOut();
            $location.path('#/login')
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

                var userId = response.data.userId,
                    code = response.data.code,
                    callbackUrlBase = 'http://localhost:53017/#/activate/',
                    //callbackUrlBase = 'http://blog-admin.tyly.co.nz/#/activate/',
                    destination = $scope.username;

                var message = {
                    userId: userId,
                    callbackUrlBase: callbackUrlBase,
                    code: code,
                    destination: destination,
                    subject: 'Confirm your account',
                    body: '<p> Please confirm your account by clicking the <a href="{0}">this link</a>'
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
    app.controller('ForgetController', ['$scope', 'ForgetPwdService', 'SendEmailService', function ($scope, ForgetPwdService, SendEmailService) {
        $scope.savedSuccessfully == false;

        $scope.reset = function () {
            $scope.$parent.loading(); // display loading page.
            ForgetPwdService.reset($scope.username).then(function (response) {
                console.log((response));
                var message = {
                    userId: response.userId,
                    destination: $scope.username,
                    callbackUrlBase: 'http://localhost:53017/#/reset/',
                    //callbackUrlBase : 'http://blog-admin.tyly.co.nz/#/reset/',
                    code: response.code,
                    subject: 'Reset your password',
                    body: '<p> Please reset your password by clicking the <a href="{0}">this link</a>'
                };

                SendEmailService.send(message).then(function (response) {
                    $scope.message = " Please check your email [ " + $scope.username + " ] to reset your password";
                    $scope.savedSuccessfully = true;
                    $scope.username = undefined;
                    $scope.forgetForm.$setValidity();
                    $scope.forgetForm.$setPristine();
                    $scope.forgetForm.$setUntouched();
                    $scope.$parent.unload();
                }, function (error) {
                    $scope.$parent.unload();
                });
            }, function (error) {
                var errors = [];
                if (error.data.modelState) {
                    for (var key in error.data.modelState) {
                        for (var i = 0; i < response.data.modelState[key].length; i++) {
                            errors.push(response.data.modelState[key][i]);
                        }
                    }
                    $scope.message = "" + errors.join(' ');
                } else {
                    $scope.message = error.error_description;
                }
            })
        }
    }])
})();
///#source 1 1 /modules/idea-controllers/idea-reset.js
(function () {
    app.controller('ResetController', ['$scope', 'ResetPwdService', '$stateParams', '$window', function ($scope, ResetPwdService, $stateParams, $window) {

        $scope.reset = function () {
            var data = {
                userId: $stateParams.userId,
                code: $stateParams.code,
                newPassword: $scope.password
            }
            $scope.$parent.loading();
            ResetPwdService.reset(data).then(function (response) {
                $scope.$parent.unload();
                $window.location.href = ('#/login');
            }, function (error) {
                alert(JSON.stringify(error));
            })
        }
    }])
})();
///#source 1 1 /modules/idea-controllers/idea-activate.js
(function () {
    app.controller('ActivateController', ['$scope', '$stateParams', 'ActivateService', '$window', function ($scope, $stateParams, ActivateService, $window) {
        $scope.userId = $stateParams.userId;
        $scope.code = $stateParams.code;
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
///#source 1 1 /modules/idea-controllers/idea-posts.js
(function () {
    app.controller('PostController', ['$scope', 'PostService', function ($scope, PostService) {
        $scope.$on("$routeChangeSuccess", function () {
            PostService.allPosts().then(function (response) {
                $scope.posts = response;
                console.log($scope.posts);
            }, function (error) {

            })
        });

        $scope.addPost = function () {

        }
    }])
})();
///#source 1 1 /modules/idea-controllers/idea-categories.js
(function () {
    app.controller('CategoriesController', ['$scope', 'CategoriesService', '$window', '$timeout', function ($scope, CategoriesService, $window, $timeout) {
        $scope.categories = [];
        $scope.savedSuccessfully = false;
        $scope.message = "";

        $scope.$on('$routeChangeSuccess', function () {

            CategoriesService.categories().then(function (response) {
                $scope.categories = response;
            }, function (error) {

            });
        });

        $scope.add = function () {
            var data = {
                name: $scope.category,
                description: $scope.description
            }

            $scope.$parent.loading();

            CategoriesService.add(data).then(function (response) {
                $window.location.href = '#/categories';
                $scope.$parent.unload();
            }, function (error) {
                $scope.$parent.unload();
                var errors = [];
                if (error.data.modelState) {
                    for (var key in error.data.modelState) {
                        for (var i = 0; i < response.data.modelState[key].length; i++) {
                            errors.push(response.data.modelState[key][i]);
                        }
                    }
                    $scope.message = "" + errors.join(' ');
                } else {
                    $scope.message = error.error_description;
                }
            });
        }

        $scope.edit = function () {
            var data = {
                id: $scope.id,
                name: $scope.category,
                description: $scope.description
            }

            CategoriesService.edit(data).then(function (response) {
                $window.location.href = '#/categories';
                $scope.$parent.unload();
            }, function (error) {
                $scope.$parent.unload();
                var errors = [];
                if (response.data.modelState) {
                    for (var key in response.data.modelState) {
                        for (var i = 0; i < response.data.modelState[key].length; i++) {
                            errors.push(response.data.modelState[key][i]);
                        }
                    }
                    $scope.message = "" + errors.join(' ');
                } else {
                    $scope.message = error.error_description;
                }
            })
        }
    }])
})();
