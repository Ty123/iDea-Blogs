(function () {
    app.controller('AddTagController', ['$rootScope', '$scope', 'TagService', '$state', function ($rootScope, $scope, TagService, $state) {
        $scope.submit = function () {
            $rootScope.isLoading = true;
            var data = {
                name: $scope.tagName,
                description: $scope.tagDescription
            }

            TagService.add(data).then(function (response) {
                $state.go('admin');
            }, function (error) {
                $rootScope.isLoading = false;
            })
        }
    }])
})();