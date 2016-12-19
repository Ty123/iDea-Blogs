(function () {
    app.controller('AddTagController', ['$rootScope', '$scope', 'TagService', '$state', function ($rootScope, $scope, TagService, $state) {

        $scope.submit = function () {
            $rootScope.isLoading = true;
            var data = {
                name: $scope.name,
                description: $scope.description
            }

            TagService.add(data).then(function (response) {
                $state.go('admin.tags');
            }, function (error) {
                $rootScope.isLoading = false;
            })
        }
    }])
})();