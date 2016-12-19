(function () {
    app.controller('TagController', ['$rootScope', '$scope', 'TagService', '$state', function ($rootScope, $scope, TagService, $state) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            TagService.tags().then(function (response) {
                $scope.tags = response;
            }, function (error) {

            })
        });

        $scope.search = function () {
            $rootScope.isLoading = true;
            $state.go('search', { 'title': $scope.title })
        }

    }])
})();