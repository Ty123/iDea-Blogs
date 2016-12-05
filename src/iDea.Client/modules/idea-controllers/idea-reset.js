(function () {
    app.controller('ResetController', ['$scope', 'ResetService', '$http',function ($scope, ResetService, $http) {
        $scope.reset = function () {
            //alert('hello, sending a reset link');
            ResetService.reset($scope.username).then(function (response) {
                alert(JSON.stringify(response))
            }, function (error) {
                alert(JSON.stringify(error));
            })
        }
    }])
})();