var authenticated = false;
//var serviceBase = 'http://blog-auth.tyly.co.nz/', dalUrlBase = 'http://blog-resources.tyly.co.nz/';
var serviceBase = 'http://localhost:65189/', dalUrlBase = 'http://localhost:53453/';

var app = angular.module('idea-blog', ['ui.router', 'ngMessages', 'ngAnimate', 'LocalStorageModule', 'ui.bootstrap'])
// constants
.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    apiDalBaseUri: dalUrlBase,
    clientId: 'ngAuthApp'
})
//route configurations
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
        // route default admin 
        .when('/admin', ['$state', function ($state) {
            $state.go('admin.dashboard', {});
        }])
        // route default categories
        .when('/admin/categories', ['$state', function ($state) {
            $state.go('admin.categories.dashboard', {});
        }])
        // route default tags
        .when('/admin/tags', ['$state', function ($state) {
            $state.go('admin.tags.dashboard', {});
        }])
        .otherwise('/home');

    $stateProvider
        // add tags
        .state('add-tag', {
            url: '/tags/add',
            views: {
                '': {
                    templateUrl: '/modules/views/tag-add.html',
                    controller: 'AddTagController'
                }
            }
        })
        // admin state
        .state('admin', { // admin main views
            url: '/admin',
            views: {
                '': {
                    templateUrl: '/modules/views/admin/admin.html',
                    controller: 'AdminController'
                },
                'sidenav@admin': {
                    templateUrl: '/modules/views/admin/admin-sidenav.html',
                    controller: 'AdminSidenavController'
                },
                'banner@admin': {
                    templateUrl: '/modules/views/admin/admin-banner.html',
                    controller: 'AdminController'
                }
            }
        })
        // dashboard
        .state('admin.dashboard', {
            url: '/dashboard',
            templateUrl: '/modules/views/admin/admin-dash.html',
            controller: 'DashboardController'
        })
        // categorie  substate
        .state('admin.categories', {
            url: '/categories',
            templateUrl: '/modules/views/category/admin-category.html',
            controller: 'CategoryDashController'
        })
        // categorie dashboard
        .state('admin.categories.dashboard', {
            url: '/dashboard',
            templateUrl: '/modules/views/category/admin-category-dash.html',
            controller: 'CategoryDashController'
        })
        // categorie add
        .state('admin.categories.add', {
            url: '/add',
            templateUrl: '/modules/views/category/category-add.html',
            controller: 'AddCategoryController'
        })
        // categorie details
        .state('admin.categories.details', {
            url: '/details/:id',
            templateUrl: '/modules/views/shared/category-details.html',
            controller: 'CategoryDetailController'
        })
        // categorie edit
        .state('admin.categories.edit', {
            url: '/edit/:id',
            templateUrl: '/modules/views/category/category-edit.html',
            controller: 'EditCategoryController'
        })
        // categorie delete
        .state('admin.categories.delete', {
            url: '/delete/:id',
            templateUrl: '/modules/views/category/category-delete.html',
            controller: 'DeleteCategoryController'
        })
        // tags
        .state('admin.tags', { // tag main views
            url: '/tags',
            templateUrl: '/modules/views/tags/admin-tags.html',
            controller: 'TagDashController'
        })
        // tag dashboard
        .state('admin.tags.dashboard', {
            url: '/dashboard',
            templateUrl: '/modules/views/tags/admin-tag-dash.html',
            controller: 'TagDashController'
        })
        // add tags
        .state('admin.tags.add', {
            url: '/add',
            templateUrl: '/modules/views/tags/tag-add.html',
            controller: 'AddTagController'
        })
        // details tags
        .state('admin.tags.details', {
            url: '/details/:id',
            templateUrl: '/modules/views/shared/tag-details.html',
            controller: 'TagDetailController'
        })
        // details tags
        .state('admin.tags.edit', {
            url: '/edit/:id',
            templateUrl: '/modules/views/tags/tag-edit.html',
            controller: 'EditTagController'
        })
        // details tags
        .state('admin.tags.delete', {
            url: '/delete/:id',
            templateUrl: '/modules/views/tags/tag-delete.html',
            controller: 'DeleteTagController'
        })
        // category substate
        .state('admin.contacts', {
            url: '/contacts',
            templateUrl: '/modules/views/admin-contact.html',
            //controller: 'CategoryDashboard'
        })
        // dashboard
        .state('admin.posts', {
            url: '/posts',
            templateUrl: '/modules/views/admin-post.html',
            controller: 'PostController'
        })
        // login state
        .state('login', {
            url: '/login',
            templateUrl: '/modules/views/login.html',
            controller: 'LoginController'
        })
        // about me state
        .state('about-me', {
            url: '/about-me',
            templateUrl: '/modules/views/about-me.html'
        })
        // search state
        .state('search', {
            url: '/posts/search/:title',
            templateUrl: '/modules/views/search.html',
            controller: 'SearchController'
        })
        // contact state
        .state('contact', {
            url: '/contacts',
            templateUrl: '/modules/views/contact/contact.html',
            controller: 'AddContactController'
        })
        // tags state
        .state('tags', {
            url: '/tags',
            views: {
                '': {
                    templateUrl: '/modules/views/tags.html',
                    controller: 'TagController'
                },
                'search@tags': {
                    templateUrl: '/modules/views/shared/new-search.html',
                    controller: 'TagController'
                }
            }
        })
        // tag details state
        .state('tag-details', {
            url: '/tags/details/:id',
            views: {
                '': {
                    templateUrl: '/modules/views/tag-details.html',
                    controller: 'TagDetailController'
                },
                'search@tag-details': {
                    templateUrl: '/modules/views/shared/new-search.html',
                    controller: 'TagDetailController'
                },
                'details@tag-details': {
                    templateUrl: '/modules/views/shared/tag-details.html',
                    controller: 'TagDetailController'
                }
            }
        })
        // categories state
        .state('categories', {
            url: '/categories',
            views:{
                '': {
                    templateUrl: '/modules/views/categories.html',
                    controller: 'CategorieController'
                },
                'search@categories': {
                    templateUrl: '/modules/views/shared/new-search.html',
                    controller: 'CategorieController'
                }
            }
        })
        // categorie details
        .state('category-details', {
            url: '/categorie/details/:id',
            views: {
                '' : {
                    templateUrl: '/modules/views/category-details.html',
                    controller: 'CategoryDetailController'
                },
                'details@category-details': {
                    templateUrl: '/modules/views/shared/category-details.html',
                    controller: 'CategoryDetailController'
                },
                'search@category-details': {
                    templateUrl: '/modules/views/shared/new-search.html',
                    controller: 'CategoryDetailController'
                }
            }
        })
        // posts state
        .state('posts', {
            url: '/posts',
            templateUrl: '/modules/views/posts.html',
            controller: 'PostController'
        })
        // post details state
        .state('post-details', {
            url: '/posts/details/:id',
            views: {
                '': {
                    controller: 'PostDetailController',
                    templateUrl: '/modules/views/post-details.html'
                },
                'search@post-details': {
                    controller: 'PostDetailController',
                    templateUrl: '/modules/views/shared/new-search.html'
                }
            }           
        })
        // home state
        .state('home', {
            url: '/home',
            views: {
                '': {
                    templateUrl: '/modules/views/home.html',
                    controller: 'HomeController',
                },
                'content@home': {
                    templateUrl: '/modules/views/home-content.html',
                    controller: 'HomeController',
                },
                'sidebar@home': {
                    templateUrl: '/modules/views/home-sidebar.html',
                    controller: 'HomeController',
                }
            }
        });
}])
// configuring authentication interceptor
.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptorService');
}])
// configuring authentication
.run(['AuthService', 'PostService', 'CategorieService', 'TagService', '$rootScope', function (AuthService, PostService, CategorieService, TagService, $rootScope) {
    AuthService.fillAuthData();

    $rootScope.isLoading = true;

    PostService.posts().then(function (response) {
        $rootScope.posts = response;
    });

    CategorieService.categories().then(function (response) {
        $rootScope.categories = response;
    }, function (error) { });

    TagService.tags().then(function (response) {
        $rootScope.tags = response;
        $rootScope.isLoading = false;
    }, function (error) { });

}]);
