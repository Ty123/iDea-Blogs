(function () {
    app.controller('PostController', ['$rootScope', '$scope', '$state', 'PostService', function ($rootScope, $scope, $state, PostService) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            PostService.posts().then(function (response) {
                $scope.posts = response;
            }, function (error) {
               
            })
        });

        $scope.search = function () {
            $state.go('search', { 'title': $scope.title })
        }
    }])
})();