///#source 1 1 /modules/idea-controllers/idea-home.js
(function () {
    'use strict';
    app.controller('HomeController', ['$rootScope', '$scope', '$state', 'PostService', 'CategorieService', 'TagService', function ($rootScope, $scope, $state, PostService, CategorieService, TagService) {

        $rootScope.$on('$viewContentLoading', function (event, viewName, viewContent) { });

        $scope.search = function () {
            $state.go('search', { 'title': $scope.title })
        }

    }]);
})();
///#source 1 1 /modules/idea-controllers/idea-index.js
(function () {
    'use strict';
    app.controller('IndexController', ['$rootScope', '$scope', 'AuthService', '$timeout', '$state', function ($rootScope, $scope, AuthService, $location, $timeout, $state) {

        $scope.opening = false;
        $scope.animation = '';
        $scope.loading = false;

        $scope.authentication = AuthService.authentication;

        $scope.regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        $scope.logout = function () {
            AuthService.logOut();
            $state.go('home');
        }

        $scope.toggle = function () {
            $scope.opening = $scope.opening == true ? false : true;
        }

        $rootScope.$on('$viewContentLoading', function (event, viewName, viewContent) {
            
        });

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
        });

    }])
})();
///#source 1 1 /modules/idea-controllers/idea-login.js
(function () {
    'use strict';
    app.controller('LoginController', ['$rootScope', '$scope', '$timeout', 'AuthService', '$state', function ($rootScope, $scope, $timeout, AuthService, $state) {

        $scope.message = "";

        $scope.login = function () {
            AuthService.login({ userName: $scope.username, password: $scope.password }).then(function (response) {
                $state.go('admin');
            }, function (err) {
                $scope.message = err.error_description;
            });
        };

        $scope.forgetPwd = function () {
            $state.go('^.forget')
        }

        //$rootScope.$on('$viewContentLoading', function (event, viewName, viewContent) {
        //    $scope.$parent.loading();
        //});

        //$rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
        //    $scope.$parent.unload(3000);
        //});
    }]);
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
    app.controller('PostDetailController', ['$rootScope', '$scope', 'PostService', '$state', '$stateParams', function ($rootScope, $scope, PostService, $state, $stateParams) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            $scope.postId = $stateParams.id;

            PostService.getById($scope.postId).then(function (response) {
                $scope.post = response;
            });

            PostService.posts().then(function (response) {
                $scope.posts = response;
            });
        });

        $scope.search = function () {
            $state.go('search', { 'title': $scope.title })
        }
    }])
})();
///#source 1 1 /modules/idea-controllers/idea-categories.js
(function () {
    app.controller('CategorieController', ['$rootScope', '$scope', 'CategorieService', '$state', function ($rootScope, $scope, CategorieService, $state) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            CategorieService.categories().then(function (response) {
                $scope.categories = response;
            }, function (error) {
                
            })
        });

        $scope.search = function () {
            $state.go('search', { 'title': $scope.title })
        }
    }])
})();
///#source 1 1 /modules/idea-controllers/idea-category-details.js
(function () {
    app.controller('CategoryDetailController', ['$rootScope', '$scope', 'CategorieService', '$state', '$stateParams', function ($rootScope, $scope, CategorieService,  $state, $stateParams) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            CategorieService.getById($stateParams.id).then(function (response) {
                $scope.category = response;
            }, function (error) {
               
            })
        });

        $scope.search = function () {
            $state.go('search', { 'title': $scope.title })
        }
    }])
})();
///#source 1 1 /modules/idea-controllers/idea-admin.js
(function () {
    app.controller('AdminController', ['$rootScope', '$scope', '$state', 'PostService', 'CategorieService', 'TagService', function ($rootScope, $scope, $state, PostService, CategorieService, TagService) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            PostService.posts().then(function (respone) {
                $scope.posts = respone;
            });

            CategorieService.categories().then(function (response) {
                $scope.categories = response;
            });

            TagService.tags().then(function (response) {
                $scope.tags = response;
            })
        });
            
    }]);
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
    app.controller('TagDetailController', ['$rootScope', '$scope', 'TagService', '$state', '$stateParams', function ($rootScope, $scope, TagService, $state, $stateParams) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            TagService.getById($stateParams.id).then(function (response) {
                $scope.tag = response;
            }, function (error) {

            })
        });

        $scope.search = function () {
            $state.go('search', { 'title': $scope.title })
        }
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
            });
        });

        $scope.search = function () {
            $rootScope.isLoading = true;
            PostService.getByName($scope.title).then(function (response) {
                $scope.posts = response;
                $rootScope.isLoading = false;
            }, function (error) {
                $rootScope.isLoading = false;
            });
        }
    }])
})();
///#source 1 1 /modules/idea-controllers/idea-contacts.js
(function () {
    app.controller('ContactController', ['$scope', 'ContactService', function ($scope, ContactService) {
        $scope.submit = function () {
            var data = {
                name: $scope.fullName,
                email: $scope.contactEmail,
                subject: $scope.subject,
                website: $scope.website == undefined ? 'N/A' : $scope.website,
                body: $scope.message
            }

            ContactService.add(data).then(function (response) {
                $scope.fullName = undefined;
                $scope.contactEmail = undefined;
                $scope.subject = undefined;
                $scope.website = undefined;
                $scope.message = undefined;

                $scope.contactForm.$setValidity();
                $scope.contactForm.$setPristine();
                $scope.contactForm.$setUntouched();

            }, function (error) {
                console.log(error);
            })
        }
    }])
})();
