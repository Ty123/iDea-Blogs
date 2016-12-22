(function () {
    app.controller('DeleteTagController', ['$rootScope', '$scope', 'TagService', '$state', '$stateParams', function ($rootScope, $scope, TagService, $state, $stateParams) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            $scope.id = $stateParams.id;
        });

        $scope.delete = function () {
            $rootScope.isLoading = true;

            TagService.delete($scope.id).then(function (response) {
                $rootScope.isLoading = false;
                $state.transitionTo('admin.tags');
            }, function (error) {
                $rootScope.isLoading = false;
            })
        }
    }])
})();