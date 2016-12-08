(function () {
    app.controller('ActivateController', ['$scope', '$routeParams', function ($scope, $routeParams) {
        $scope.userId = $routeParams.userId;

        console.log($scope.userId);
    }])
})();