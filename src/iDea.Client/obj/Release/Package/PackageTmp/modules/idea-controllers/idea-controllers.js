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
    app.controller('IndexController', ['$scope', 'AuthService', '$location', 'ngAuthSettings', 'localStorageService', '$timeout', function ($scope, AuthService, $location, ngAuthSettings, localStorageService, $timeout) {

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

            AuthService.login({ userName: $scope.username, password: $scope.password }).then(function (response) {
                $window.location.href = ('#/home');

            }, function (err) {
                $scope.message = err.error_description;
            });
        };
    }]);
})();
///#source 1 1 /modules/idea-controllers/idea-signup.js
(function () {
    app.controller('SignupController', ['$scope', '$location', '$timeout', 'AuthService', function ($scope, $location, $timeout, AuthService) {

        $scope.regex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/i;
        $scope.savedSuccessfully = false;
        $scope.message = "";

        $scope.registration = {
            email: "",
            password: "",
            confirmPassword: ""
        };

        $scope.signUp = function () {
            AuthService.saveRegistration({ email: $scope.username, password: $scope.password, confirmPassword: $scope.password }).then(function (response) {

                $scope.savedSuccessfully = true;
                $scope.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
                startTimer($timeout, $location);

            }, function (response) {
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
