(function () {
    app.controller('CategoryDetailController', ['$rootScope', '$scope', 'CategorieService', '$stateParams', function ($rootScope, $scope, CategorieService, $stateParams) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            CategorieService.getById($stateParams.id).then(function (response) {
                $scope.category = response;
                console.log($scope.category);
            }, function (error) {
                alert(error)
            })
        });
    }])
})();