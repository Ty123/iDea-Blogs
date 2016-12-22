(function () {
    app.controller('TagDashController', ['$rootScope', '$scope', 'TagService', '$state', '$stateParams', '$log', function ($rootScope, $scope, TagService, $state, $stateParams, $log) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            TagService.tags().then(function (response) {
                $rootScope.tags = response;
            })
        });

        $scope.addTag = function () {
            $state.go('admin.tags.add')
        }
    }])
})();