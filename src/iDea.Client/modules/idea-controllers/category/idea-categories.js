(function () {
    app.controller('CategorieController', ['$rootScope', '$scope', 'CategorieService', '$state', function ($rootScope, $scope, CategorieService, $state) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            CategorieService.categories().then(function (response) {
                $scope.categories = response;
            }, function (error) {
                
            })
        });

        $scope.search = function () {
            $rootScope.isLoading = true;
            $state.go('search', { 'title': $scope.title })
        }
    }])
})();