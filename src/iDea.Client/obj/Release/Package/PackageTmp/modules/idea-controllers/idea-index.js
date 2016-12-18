(function () {
    'use strict';
    app.controller('IndexController', ['$rootScope', '$scope', 'AuthService', '$timeout', '$state', function ($rootScope, $scope, AuthService, $location, $timeout, $state) {

        $scope.authentication = AuthService.authentication;

        $scope.regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        $scope.loading = function () {
            document.getElementById('idea-loading').classList.add('fadeIn');
        }

        $scope.unload = function (duration) {
            (function (duration) {
                setTimeout(function () {
                    document.getElementById('idea-loading').classList.remove('fadeIn');
                }, duration);
            })(duration)
        }

        $scope.logout = function () {
            AuthService.logOut();
            $state.go('home.login');
        }

        $rootScope.$on('$viewContentLoading', function (event, viewName, viewContent) {
            $scope.loading();
        });

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            $scope.unload(2000);
        });
    }])
})();