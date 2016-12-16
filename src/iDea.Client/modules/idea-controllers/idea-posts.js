(function () {
    app.controller('PostController', ['$rootScope', '$scope', 'PostService', function ($rootScope, $scope, PostService) {
        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            PostService.posts().then(function (response) {
                $scope.posts = response;
            }, function (error) {
                alert(error.error_description);
            })
        });
    }])
})();