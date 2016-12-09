(function () {
    app.controller('ActivateController', ['$scope', '$routeParams', 'ActivateService', '$window', function ($scope, $routeParams, ActivateService, $window) {
        $scope.userId = $routeParams.userId;
        $scope.code = $routeParams.code;
        $scope.activate = function () {
            $scope.$parent.loading();
            var data = {
                userId: $scope.userId,
                code: $scope.code
            };

            ActivateService.activate(data).then(function (response) {
                $scope.$parent.unload();
                $window.location.href = ('#/login');
            }, function (error) {
                $scope.$parent.unload();
                alert(JSON.stringify(error));
            })
        }
    }])
})();