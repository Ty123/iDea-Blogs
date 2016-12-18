(function () {
    app.controller('PostDetailController', ['$rootScope', '$scope', 'PostService', '$stateParams', function ($rootScope, $scope, PostService, $stateParams) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            $scope.postId = $stateParams.id;

            PostService.getById($scope.postId).then(function (response) {
                $scope.post = response;
            });

            PostService.posts().then(function (response) {
                $scope.posts = response;
            });
        });
    }])
})();