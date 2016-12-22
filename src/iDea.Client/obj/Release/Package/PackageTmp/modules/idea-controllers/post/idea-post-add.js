(function () {
    app.controller('AddPostController', ['$rootScope', '$scope', 'PostService', 'CategorieService', 'TagService', '$state', function AddPostController($rootScope, $scope, PostService, CategorieService, TagService, $state) {

        $scope.selectTags = [];
        $scope.selectCategory = {};

        $scope.body = '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li style="color: blue;">Super Easy <b>Theming</b> Options</li><li>Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li>Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE9+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p>';

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            TagService.tags().then(function (response) {
                $rootScope.tags = response;
            });

            CategorieService.categories().then(function (response) {
                $rootScope.categories = response;
            });
        });
    }])
})();
