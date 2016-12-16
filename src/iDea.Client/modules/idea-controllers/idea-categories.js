(function () {
    app.controller('CategorieController', ['$rootScope', '$scope', 'CategorieService', '$stateParams', function ($rootScope, $scope, CategorieService) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            CategorieService.categories().then(function (response) {
                $scope.categories = response;
            }, function (error) {
                alert(error.error_description);
            })
        });
    }])
})();