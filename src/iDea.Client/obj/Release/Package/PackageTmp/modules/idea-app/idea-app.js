var authenticated = false;
var serviceBase = 'http://blog-auth.tyly.co.nz/', dalUrlBase = 'http://blog-resources.tyly.co.nz/';
//var serviceBase = 'http://localhost:65189/', dalUrlBase = 'http://localhost:53453/';

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
        .when('/admin', ['$state', function ($state) {
            $state.go('admin.dashboard', {});
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
        .state('admin', {
            url: '/admin',
            views: {
                '': {
                    templateUrl: '/modules/views/admin.html',
                    controller: 'AdminController'
                },
                'sidenav@admin': {
                    templateUrl: '/modules/views/admin-sidenav.html',
                    controller: 'AdminSidenavController'
                },
                'banner@admin': {
                    templateUrl: '/modules/views/admin-banner.html',
                    controller: 'AdminController'
                }
            }
        })
        // category substate
        .state('admin.contacts', {
            url: '/contacts',
            templateUrl: '/modules/views/admin-contact.html',
            //controller: 'CategoryDashboard'
        })
        // category substate
        .state('admin.categories', {
            url: '/categories',
            templateUrl: '/modules/views/admin-category.html',
            controller: 'CategoryDashboard'
        })
        // dashboard
        .state('admin.posts', {
            url: '/posts',
            templateUrl: '/modules/views/admin-post.html',
            controller: 'PostController'
        })
        // tags
        .state('admin.tags', {
            url: '/tags',
            templateUrl: '/modules/views/admin-tags.html',
            controller: 'DashboardController'
        })
        // dashboard
        .state('admin.dashboard', {
            url: '/dashboard',
            templateUrl: '/modules/views/admin-dash.html',
            controller: 'DashboardController'
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
            templateUrl: '/modules/views/contact.html',
            controller: 'ContactController'
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
                    templateUrl: '/modules/views/new-search.html',
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
                    templateUrl: '/modules/views/new-search.html',
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
                    templateUrl: '/modules/views/new-search.html',
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
                'search@category-details': {
                    templateUrl: '/modules/views/new-search.html',
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
                    templateUrl: '/modules/views/new-search.html'
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
