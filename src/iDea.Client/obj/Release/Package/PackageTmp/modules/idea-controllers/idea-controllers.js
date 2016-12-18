﻿///#source 1 1 /modules/idea-controllers/idea-home.js
(function () {
    'use strict';
    app.controller('HomeController', ['$rootScope', '$scope', '$state', 'PostService', 'CategorieService', 'TagService', function ($rootScope, $scope, $state, PostService, CategorieService, TagService) {

        $rootScope.$on('$viewContentLoading', function (event, viewName, viewContent) {

            PostService.posts().then(function (response) {
                $scope.posts = response;
            }, function (error) { });

            CategorieService.categories().then(function (response) {
                $scope.categories = response;
            }, function (error) { });

            TagService.tags().then(function (response) {
                $scope.tags = response;
            }, function (error) { })
        });

        $scope.search = function () {
            $state.go('search', { 'title': $scope.title })
        }
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

        $scope.unload = function (duration) {
            (function (duration) {
                setTimeout(function () {
                    document.getElementById('idea-loading').classList.remove('fadeIn');
                }, duration);
            })(duration)
        }

        $scope.logout = function () {
            AuthService.logOut();
            $state.go('home.login');
        }

        $rootScope.$on('$viewContentLoading', function (event, viewName, viewContent) {
            $scope.loading();
        });

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            $scope.unload(2000);
        });
    }])
})();
///#source 1 1 /modules/idea-controllers/idea-posts.js
(function () {
    app.controller('PostController', ['$rootScope', '$scope', '$state', 'PostService', function ($rootScope, $scope, $state, PostService) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            PostService.posts().then(function (response) {
                $scope.posts = response;
            }, function (error) {
               
            })
        });

        $scope.search = function () {
            $state.go('search', { 'title': $scope.title })
        }
    }])
})();
///#source 1 1 /modules/idea-controllers/idea-post-details.js
(function () {
    app.controller('PostDetailController', ['$rootScope', '$scope', 'PostService', '$stateParams', function ($rootScope, $scope, PostService, $stateParams) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            $scope.postId = $stateParams.id;

            PostService.getById($scope.postId).then(function (response) {
                $scope.post = response;
            });

            PostService.posts().then(function (response) {
                $scope.posts = response;
            });
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
            }, function (error) {
               
            })
        });
    }])
})();
///#source 1 1 /modules/idea-controllers/idea-tags.js
(function () {
    app.controller('TagController', ['$rootScope', '$scope', 'TagService', function ($rootScope, $scope, TagService) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            TagService.tags().then(function (response) {
                $scope.tags = response;
            }, function (error) {

            })
        });
    }])
})();
///#source 1 1 /modules/idea-controllers/idea-tag-details.js
(function () {
    app.controller('TagDetailController', ['$rootScope', '$scope', 'TagService', '$stateParams', function ($rootScope, $scope, TagService, $stateParams) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            TagService.getById($stateParams.id).then(function (response) {
                $scope.tag = response;
            }, function (error) {

            })
        });
    }])
})();
///#source 1 1 /modules/idea-controllers/idea-search.js
(function () {
    app.controller('SearchController', ['$rootScope', '$scope', 'PostService', '$stateParams', function ($rootScope, $scope, PostService, $stateParams) {
        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            $scope.title = $stateParams.title;
            PostService.getByName($scope.title).then(function (response) {
                $scope.posts = response;
            }, function (error) {
                $scope.unload(2000);
            });
        });

        $scope.search = function () {
            $scope.$parent.loading();
            PostService.getByName($scope.title).then(function (response) {
                $scope.posts = response;
                $scope.unload(2000);
            }, function (error) {
                $scope.unload(2000);
            });
        }
    }])
})();
///#source 1 1 /modules/idea-controllers/idea-contacts.js
(function (app) {
    app.controller('ContactController', ['$scope', 'ContactService', function ($scope, ContactService) {
        $scope.submit = function () {
            var data = {
                name: $scope.fullName,
                email: $scope.contactEmail,
                subject: $scope.subject,
                website: $scope.website == undefined ? 'N/A' : $scope.website,
                body: $scope.message
            }

            $scope.$parent.loading();

            ContactService.add(data).then(function (response) {
                $scope.fullName = undefined;
                $scope.contactEmail = undefined;
                $scope.subject = undefined;
                $scope.website = undefined;
                $scope.message = undefined;

                $scope.contactForm.$setValidity();
                $scope.contactForm.$setPristine();
                $scope.contactForm.$setUntouched();

                $scope.$parent.unload(2000);
            }, function (error) {
                console.log(error);
                $scope.$parent.unload(2000);
            })
        }
    }])
})(app);
