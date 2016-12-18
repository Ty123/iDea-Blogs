(function () {
    'use strict';
    app.controller('HomeController', ['$rootScope', '$scope', '$state', 'PostService', 'CategorieService', 'TagService', function ($rootScope, $scope, $state, PostService, CategorieService, TagService) {

        $rootScope.$on('$viewContentLoading', function (event, viewName, viewContent) {

            PostService.posts().then(function (response) {
                $scope.posts = response;
            }, function (error) { });

            CategorieService.categories().then(function (response) {
                $scope.categories = response;
            }, function (error) { });

            TagService.tags().then(function (response) {
                $scope.tags = response;
            }, function (error) { })
        });

        $scope.search = function () {
            $state.go('search', { 'title': $scope.title })
        }
    }]);
})();