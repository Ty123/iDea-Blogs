(function () {
    app.controller('AdminController', ['$rootScope', '$scope', '$state', 'PostService', 'CategorieService', 'TagService', function ($rootScope, $scope, $state, PostService, CategorieService, TagService) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            PostService.posts().then(function (respone) {
                $scope.posts = respone;
            });

            CategorieService.categories().then(function (response) {
                $scope.categories = response;
            });

            TagService.tags().then(function (response) {
                $scope.tags = response;
            })
        });
            
    }]);
})();