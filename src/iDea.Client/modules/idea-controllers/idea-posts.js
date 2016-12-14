(function () {
    app.controller('PostController', ['$scope', 'PostService', function ($scope, PostService) {
        $scope.$on("$routeChangeSuccess", function () {
            PostService.allPosts().then(function (response) {
                $scope.posts = response;
                console.log($scope.posts);
            }, function (error) {

            })
        });

        $scope.addPost = function () {

        }
    }])
})();