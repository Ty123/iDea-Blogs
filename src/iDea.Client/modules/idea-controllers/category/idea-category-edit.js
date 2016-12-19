(function (app) {
    app.controller('EditCategoryController', ['$rootScope', '$scope', 'CategorieService', '$state', '$stateParams', function ($rootScope, $scope, CategorieService, $state, $stateParams) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            CategorieService.getById($stateParams.id).then(function (response) {
                $scope.category = response;
                console.log(response);
            }, function (error) {

            })
        });

        $scope.edit = function () {
            $rootScope.isLoading = true;
            var data = {
                id: $scope.category.id,
                name: $scope.category.name,
                description: $scope.category.description
            }

            CategorieService.edit(data).then(function (response) {
                $state.go('admin.categories');
            }, function (error) {
                $rootScope.isLoading = false;
            })
        }
    }])
})(app);