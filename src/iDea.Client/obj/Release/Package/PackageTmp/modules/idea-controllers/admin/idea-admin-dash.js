(function () {
    app.controller('DashboardController', ['$rootScope', '$scope', '$state', 'PostService', 'CategorieService', 'TagService', 'ContactService', function ($rootScope, $scope, $state, PostService, CategorieService, TagService, ContactService) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            //$rootScope.isLoading = false;
            PostService.posts().then(function (response) {
                $rootScope.posts = response;
            });

            CategorieService.categories().then(function (response) {
                $rootScope.categories = response;
            });

            TagService.tags().then(function (response) {
                $rootScope.tags = response;
            });

            ContactService.contacts().then(function (response) {
                $rootScope.contacts = response;
                $rootScope.isLoading = false;
            })
        });
    }])
})();