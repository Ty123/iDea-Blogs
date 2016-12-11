(function () {
    app.controller('ResetController', ['$scope', 'ResetPwdService', '$routeParams', '$window', function ($scope, ResetPwdService, $routeParams, $window) {

        $scope.reset = function () {
            var data = {
                userId: $routeParams.userId,
                code: $routeParams.code,
                newPassword: $scope.password
            }
            $scope.$parent.loading();
            ResetPwdService.reset(data).then(function (response) {
                $scope.$parent.unload();
                $window.location.href = ('#/login');
            }, function (error) {
                alert(JSON.stringify(error));
            })
        }
    }])
})();