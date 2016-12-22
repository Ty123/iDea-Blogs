(function () {
    'use strict';
    app.controller('LoginController', ['$rootScope', '$scope', '$timeout', 'AuthService', '$state', function ($rootScope, $scope, $timeout, AuthService, $state) {

        $scope.message = "";

        $scope.login = function () {
            $rootScope.isLoading = true;
            AuthService.login({ userName: $scope.username, password: $scope.password }).then(function (response) {
                $state.go('admin');
                $rootScope.isLoading = false;
            }, function (err) {
                $scope.message = err.error_description;
            });
        };

        $scope.forgetPwd = function () {
            $state.go('^.forget')
        }
    }]);
})();