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
