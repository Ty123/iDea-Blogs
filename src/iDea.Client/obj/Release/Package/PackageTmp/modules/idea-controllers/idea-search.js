(function () {
    app.controller('SearchController', ['$rootScope', '$scope', 'PostService', '$stateParams', function ($rootScope, $scope, PostService, $stateParams) {
        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            $scope.title = $stateParams.title;
            PostService.getByName($scope.title).then(function (response) {
                $scope.posts = response;
            }, function (error) {
                $scope.unload(2000);
            });
        });

        $scope.search = function () {
            $scope.$parent.loading();
            PostService.getByName($scope.title).then(function (response) {
                $scope.posts = response;
                $scope.unload(2000);
            }, function (error) {
                $scope.unload(2000);
            });
        }
    }])
})();