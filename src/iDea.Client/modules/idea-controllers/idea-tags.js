(function () {
    app.controller('TagController', ['$rootScope', '$scope', 'TagService', function ($rootScope, $scope, TagService) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            TagService.tags().then(function (response) {
                $scope.tags = response;
            }, function (error) {

            })
        });
    }])
})();