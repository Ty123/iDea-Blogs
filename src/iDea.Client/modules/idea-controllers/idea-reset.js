﻿(function () {
    app.controller('ResetController', ['$scope', 'ResetService', '$http', function ($scope, ResetService, $http) {
        $scope.regex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/i;

        $scope.reset = function () {
            ResetService.reset($scope.username).then(function (response) {
            }, function (error) {
                alert(JSON.stringify(error));
            })
        }
    }])
})();