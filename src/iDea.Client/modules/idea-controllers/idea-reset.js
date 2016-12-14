(function () {
    app.controller('ResetController', ['$scope', 'ResetPwdService', '$stateParams', '$window', function ($scope, ResetPwdService, $stateParams, $window) {

        $scope.reset = function () {
            var data = {
                userId: $stateParams.userId,
                code: $stateParams.code,
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