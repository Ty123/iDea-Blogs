(function () {
    app.controller('CategoryDetailController', ['$rootScope', '$scope', 'CategorieService', '$state', '$stateParams', function ($rootScope, $scope, CategorieService,  $state, $stateParams) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            CategorieService.getById($stateParams.id).then(function (response) {
                $scope.category = response;
            }, function (error) {
               
            })
        });

        $scope.search = function () {
            $rootScope.isLoading = true;
            $state.go('search', { 'title': $scope.title })
        }
    }])
})();