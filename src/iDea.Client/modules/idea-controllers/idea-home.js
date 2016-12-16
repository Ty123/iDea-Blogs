(function () {
    'use strict';
    app.controller('HomeController', ['$rootScope', '$scope', '$state', 'HomeServices', function ($rootScope, $scope, $state, HomeServices) {

        $rootScope.$on('$viewContentLoading', function (event, viewName, viewContent) {
            HomeServices.posts().then(function (response) {
                $scope.posts = response;
            }, function (error) { });
            HomeServices.categories().then(function (response) {
                $scope.categories = response;
            }, function (error) {});
            HomeServices.tags().then(function (response) {
                $scope.tags = response;
            }, function (error) { })
        });
    }]);
})();