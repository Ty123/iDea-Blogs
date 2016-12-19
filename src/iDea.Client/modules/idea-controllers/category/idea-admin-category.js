(function () {
    app.controller('CategoryDashController', ['$rootScope', '$scope', 'CategorieService', '$state', function ($rootScope, $scope, CategorieService, $state) {
        $scope.addCategory = function () {
            $state.go('admin.categories.add')
        }
    }])
})();