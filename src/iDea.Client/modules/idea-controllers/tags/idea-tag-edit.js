(function () {
    app.controller('EditTagController', ['$rootScope', '$scope', 'TagService', '$state', '$stateParams', function ($rootScope, $scope, TagService, $state, $stateParams) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            TagService.getById($stateParams.id).then(function (response) {
                $scope.tag = response;
            }, function (error) {

            })
        });

        $scope.edit = function () {
            $rootScope.isLoading = true;
            var data = {
                id: $scope.tag.id,
                name: $scope.tag.name,
                description: $scope.tag.description
            }

            TagService.edit(data).then(function (response) {
                $state.go('admin.tags');
            }, function (error) {
                $rootScope.isLoading = false;
            })
        }
    }])
})();