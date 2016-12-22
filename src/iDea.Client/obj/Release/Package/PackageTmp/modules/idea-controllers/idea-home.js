(function () {
    'use strict';
    app.controller('HomeController', ['$rootScope', '$scope', '$state', function ($rootScope, $scope, $state) {

        $scope.search = function () {
            $rootScope.isLoading = true;
            $state.go('search', { 'title': $scope.title })
        }

    }]);
})();