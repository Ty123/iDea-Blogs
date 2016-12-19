(function () {
    'use strict';
    app.controller('LoginController', ['$rootScope', '$scope', '$timeout', 'AuthService', '$state', function ($rootScope, $scope, $timeout, AuthService, $state) {

        $scope.message = "";

        $scope.login = function () {
            $rootScope.isLoading = true;
            AuthService.login({ userName: $scope.username, password: $scope.password }).then(function (response) {
                $state.go('admin');
            }, function (err) {
                $scope.message = err.error_description;
            });
        };

        $scope.forgetPwd = function () {
            $state.go('^.forget')
        }

        //$rootScope.$on('$viewContentLoading', function (event, viewName, viewContent) {
        //    $scope.$parent.loading();
        //});

        //$rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
        //    $scope.$parent.unload(3000);
        //});
    }]);
})();