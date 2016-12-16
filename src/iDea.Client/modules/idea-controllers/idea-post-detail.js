(function () {
    app.controller('PostDetailController', ['$rootScope', '$scope', 'PostService', '$stateParams', function ($rootScope, $scope, PostService, $stateParams) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            PostService.getById($stateParams.id).then(function (response) {
                $scope.post = response;
            }, function (error) {
                alert(error.error_description);
            })
        });
    }])
})();