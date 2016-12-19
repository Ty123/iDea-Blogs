(function () {
    'use strict';
    app.controller('IndexController', ['$rootScope', '$scope', 'AuthService', '$timeout', '$state', function ($rootScope, $scope, AuthService, $location, $timeout, $state) {

        $scope.opening = false;
        $scope.animation = '';
        $scope.loading = false;

        $scope.authentication = AuthService.authentication;

        $scope.regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        $scope.logout = function () {
            AuthService.logOut();
            $state.go('home');
        }

        $scope.toggle = function () {
            $scope.opening = $scope.opening == true ? false : true;
        }

        $rootScope.$on('$viewContentLoading', function (event, viewName, viewContent) {
            
        });

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
        });

    }])
})();