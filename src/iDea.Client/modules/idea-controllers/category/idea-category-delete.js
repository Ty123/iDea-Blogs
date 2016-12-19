(function () {
    app.controller('DeleteCategoryController', ['$rootScope', '$scope', '$state', '$stateParams', 'CategorieService', function ($rootScope, $scope, $state, $stateParams, CategorieService) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            $scope.id = $stateParams.id;
        });

        $scope.delete = function () {
            $rootScope.isLoading = true;

            CategorieService.delete($scope.id).then(function (response) {
                $rootScope.isLoading = false;
                $state.go('admin.categories');
            }, function (error) {
                $rootScope.isLoading = false;
            })
        }
    }])
})();