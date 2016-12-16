///#source 1 1 /modules/idea-controllers/idea-home.js
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
///#source 1 1 /modules/idea-controllers/idea-index.js
(function () {
    'use strict';
    app.controller('IndexController', ['$rootScope', '$scope', 'AuthService', '$timeout', '$state', function ($rootScope, $scope, AuthService, $location, $timeout, $state) {

        $scope.authentication = AuthService.authentication;

        $scope.regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        $scope.loading = function () {
            document.getElementById('idea-loading').classList.add('fadeIn');
        }

        $scope.unload = function () {
            document.getElementById('idea-loading').classList.remove('fadeIn');
        }

        $scope.logout = function () {
            AuthService.logOut();
            $state.go('home.login');
        }

        $rootScope.$on('$viewContentLoading', function (event, viewName, viewContent) {
            $scope.loading();
        });

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            (function(){
                setTimeout(function () {
                    $scope.unload();
                }, 1500);
            })()
        });
    }])
})();
///#source 1 1 /modules/idea-controllers/idea-posts.js
(function () {
    app.controller('PostController', ['$rootScope', '$scope', 'PostService', function ($rootScope, $scope, PostService) {
        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            PostService.posts().then(function (response) {
                $scope.posts = response;
            }, function (error) {
                alert(error.error_description);
            })
        });
    }])
})();
///#source 1 1 /modules/idea-controllers/idea-categories.js
(function () {
    app.controller('CategorieController', ['$rootScope', '$scope', 'CategorieService', '$stateParams', function ($rootScope, $scope, CategorieService) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            CategorieService.categories().then(function (response) {
                $scope.categories = response;
            }, function (error) {
                alert(error.error_description);
            })
        });
    }])
})();
///#source 1 1 /modules/idea-controllers/idea-category-details.js
(function () {
    app.controller('CategoryDetailController', ['$rootScope', '$scope', 'CategorieService', '$stateParams', function ($rootScope, $scope, CategorieService, $stateParams) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            CategorieService.getById($stateParams.id).then(function (response) {
                $scope.category = response;
                console.log($scope.category);
            }, function (error) {
                alert(error)
            })
        });
    }])
})();
///#source 1 1 /modules/idea-controllers/idea-post-detail.js
(function () {
    app.controller('PostDetailController', ['$rootScope', '$scope', 'PostService', '$stateParams', function ($rootScope, $scope, PostService, $stateParams) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            PostService.getById($stateParams.id).then(function (response) {
                $scope.post = response;
            }, function (error) {
                alert(error.error_description);
            })
        });
    }])
})();
