(function () {
    app.controller('AdminSidenavController', ['$scope', '$state', function ($scope, $state) {

        $scope.goToTags = function () {
            $state.go('admin.tags', {});
        }

        $scope.goToPost = function () {
            $state.go('admin.posts', {});
        }

        $scope.goToDash = function () {
            $state.go('admin.dashboard', {});
        }

        $scope.goToCateg = function () {
            $state.go('admin.categories', {});
        }

        $scope.goToCont = function () {
            $state.go('admin.contacts', {});
        }
    }])
})();