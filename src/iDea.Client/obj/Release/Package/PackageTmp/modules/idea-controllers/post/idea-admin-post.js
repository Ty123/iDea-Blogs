(function () {

    app.controller('PostDashController', ['$rootScope', '$scope', '$state', 'PostService', function ($rootScope, $scope, $state, PostService) {

        $scope.addPost = function () {
            $state.go('admin.posts.add', {})
        }
    }])
})();