(function () {
    app.controller('AdminController', ['$scope', '$rootScope', 'CategoriesService', function ($scope, $rootScope, CategoriesService) {
        $scope.loading = function () {
            $scope.$parent.loading();
        }

        $scope.unload = function () {
            $scope.$parent.unload();
        }
    }]);
})();