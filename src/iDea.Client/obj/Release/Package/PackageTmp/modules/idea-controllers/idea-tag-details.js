(function () {
    app.controller('TagDetailController', ['$rootScope', '$scope', 'TagService', '$stateParams', function ($rootScope, $scope, TagService, $stateParams) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            TagService.getById($stateParams.id).then(function (response) {
                $scope.tag = response;
            }, function (error) {

            })
        });
    }])
})();