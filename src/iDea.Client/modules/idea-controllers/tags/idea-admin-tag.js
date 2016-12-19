(function () {
    app.controller('TagDashController', ['$rootScope', '$scope', 'TagService', '$state', '$stateParams', function ($rootScope, $scope, TagService, $state, $stateParams) {

        $scope.addTag = function () {
            $state.go('admin.tags.add')
        }
    }])
})();