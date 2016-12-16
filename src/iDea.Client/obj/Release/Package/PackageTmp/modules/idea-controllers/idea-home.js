(function () {
    'use strict';
    app.controller('HomeController', ['$scope', 'AuthService', function ($scope, AuthService) {
        //$scope.authentication = AuthService.authentication;
        $scope.loading = function () {
            $scope.$parent.loading();
        }

        $scope.unload = function () {
            $scope.$parent.unload();
        }
    }]);
})();