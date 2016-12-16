(function () {
    'use strict';
    app.controller('LoginController', ['$scope', '$timeout', 'AuthService', '$state', function ($scope, $timeout, AuthService, $state) {

        $scope.message = "";

        $scope.login = function () {
            $scope.$parent.loading();
            AuthService.login({ userName: $scope.username, password: $scope.password }).then(function (response) {
                $scope.$parent.unload();
                $state.go('admin');
            }, function (err) {
                $scope.$parent.unload();
                $scope.message = err.error_description;
            });
        };

        $scope.forgetPwd = function () {
            $state.go('^.forget')
        }
    }]);
})();