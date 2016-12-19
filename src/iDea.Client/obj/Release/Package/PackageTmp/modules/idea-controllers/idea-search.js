(function () {
    app.controller('SearchController', ['$rootScope', '$scope', 'PostService', '$stateParams', function ($rootScope, $scope, PostService, $stateParams) {
        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            $scope.title = $stateParams.title;
            PostService.getByName($scope.title).then(function (response) {
                $scope.posts = response;
                $rootScope.isLoading = false;
            });

            $rootScope.isLoading = false;
        });

        $scope.search = function () {
            $rootScope.isLoading = true;
            PostService.getByName($scope.title).then(function (response) {
                $scope.posts = response;
                $rootScope.isLoading = false;
            }, function (error) {
                $rootScope.isLoading = false;
            });
        }
    }])
})();