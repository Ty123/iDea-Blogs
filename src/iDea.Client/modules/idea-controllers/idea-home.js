(function () {
    'use strict';
    app.controller('HomeController', ['$rootScope', '$scope', '$state', 'PostService', 'CategorieService', 'TagService', function ($rootScope, $scope, $state, PostService, CategorieService, TagService) {

        $rootScope.$on('$viewContentLoading', function (event, viewName, viewContent) { });

        $scope.search = function () {
            $rootScope.isLoading = true;
            $state.go('search', { 'title': $scope.title })
        }

    }]);
})();