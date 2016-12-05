(function () {
    'use strict';
    app.controller('IndexController', ['$scope', 'AuthService', '$location', 'ngAuthSettings', 'localStorageService', '$timeout', function ($scope, AuthService, $location, ngAuthSettings, localStorageService, $timeout) {

        $scope.logOut = function () {

            AuthService.logOut();
            $location.path('#/home')
        }
    }])
})();