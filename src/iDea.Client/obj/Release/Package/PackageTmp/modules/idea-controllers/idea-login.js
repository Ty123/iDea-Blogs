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