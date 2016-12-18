(function () {
    app.controller('PostDetailController', ['$rootScope', '$scope', 'PostService', '$state', '$stateParams', function ($rootScope, $scope, PostService, $state, $stateParams) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            $scope.postId = $stateParams.id;

            PostService.getById($scope.postId).then(function (response) {
                $scope.post = response;
            });

            PostService.posts().then(function (response) {
                $scope.posts = response;
            });
        });

        $scope.search = function () {
            $state.go('search', { 'title': $scope.title })
        }
    }])
})();