(function () {
    app.controller('TagDetailController', ['$rootScope', '$scope', 'TagService', '$state', '$stateParams', function ($rootScope, $scope, TagService, $state, $stateParams) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            TagService.getById($stateParams.id).then(function (response) {
                $scope.tag = response;
            }, function (error) {

            })
        });

        $scope.search = function () {
            $rootScope.isLoading = true;
            $state.go('search', { 'title': $scope.title })
        }
    }])
})();