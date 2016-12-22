(function () {
    'use strict';
    app.controller('IndexController', ['$rootScope', '$scope', 'AuthService', '$state', function ($rootScope, $scope, AuthService, $location, $state) {

        $scope.opening = false;
        $scope.animation = '';
        $scope.loading = false;

        $rootScope.authentication = AuthService.authentication;

        $scope.regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        $scope.logout = function () {
            AuthService.logOut();
        }

        $scope.toggle = function () {
            $scope.opening = $scope.opening == true ? false : true;
        }

    }])
})();