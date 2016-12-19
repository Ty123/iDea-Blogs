(function () {
    app.controller('DashboardController', ['$scope', '$rootScope', function ($scope, $rootScope) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            $rootScope.isLoading = false;
        });
    }])
})();