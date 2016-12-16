(function () {
    app.controller('ActivateController', ['$scope', '$stateParams', 'ActivateService', '$state', function ($scope, $stateParams, ActivateService, $state) {
        $scope.userId = $stateParams.userId;
        $scope.code = $stateParams.code;
        $scope.activate = function () {
            $scope.$parent.loading();
            var data = {
                userId: $scope.userId,
                code: $scope.code
            };

            ActivateService.activate(data).then(function (response) {
                $scope.$parent.unload();             
                //$window.location.href = ('#/login');
                $state.go('home');
            }, function (error) {
                $scope.$parent.unload();
                alert(JSON.stringify(error));
            })
        }
    }])
})();