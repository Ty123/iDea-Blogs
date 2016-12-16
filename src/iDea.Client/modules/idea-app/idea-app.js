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
            //.when('/admin', '/admin/dashboard')
            .otherwise('/home');

        $stateProvider
            // about me state
            .state('about-me', {
                url: '/about-me',
                templateUrl: '/modules/views/about-me.html'
            })
            // contact state
            .state('contact', {
                url: '/contacts',
                templateUrl: '/modules/views/contact.html'
            })
            // categories state
            .state('categories', {
                url: '/categories',
                templateUrl: '/modules/views/categories.html',
                controller: 'CategorieController'
            })
            // categorie details
            .state('categorie-details', {
                url: '/categorie/details/:id',
                templateUrl: '/modules/views/category-details.html',
                controller: 'CategoryDetailController'
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
                templateUrl: '/modules/views/post-details.html',
                controller: 'PostDetailController'
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
        //// login state
        //.state('login', {
        //    url: '/login',
        //    templateUrl: '/modules/views/login.html',
        //    controller: 'LoginController'
        //})
        //// forget pwd state
        //.state('forget', {
        //    url: '/forget',
        //    templateUrl: '/modules/views/forget.html',
        //    controller: 'ForgetController'
        //})
        //// sign up state
        //.state('signup', {
        //    url: '/signup',
        //    templateUrl: '/modules/views/signup.html',
        //    controller: 'SignupController'
        //})
        //// activate state
        //.state('activate', {
        //    url: '/activate/{userId: int}/{code}',
        //    templateUrl: '/modules/views/activate.html',
        //    controller: 'ActivateController'
        //})
        //// reset pwd state
        //.state('reset', {
        //    url: '/reset/{userId: int}/{code}',
        //    templateUrl: '/modules/views/reset.html',
        //    controller: 'ResetController'
        //})
        //// admin state
        //.state('admin', {
        //    url: '/admin',
        //    views: {
        //        '': {
        //            templateUrl: '/modules/views/admin.html',
        //            controller: 'AdminController'
        //        },
        //        'sidenav@admin': {
        //            templateUrl: '/modules/views/admin-sidenav.html'
        //        }
        //    }
        //})
        //// dashboard nested state
        //.state('admin.dashboard', {
        //    url: '/dashboard',
        //    templateUrl: '/modules/views/dashboard.html',
        //    controller: 'DashboardController'
        //})
        //// category nested state
        //.state('admin.categories', {
        //    url: '/categories',
        //    templateUrl: '/modules/views/categories.html',
        //    controller: 'CategoriesController'
        //})
        //// tag nested state
        //.state('admin.tags', {
        //    url: '/tags',
        //    templateUrl: '/modules/views/tags.html'
        //})
        //// post nested state
        //.state('admin.posts', {
        //    url: '/posts',
        //    templateUrl: '/modules/views/posts.html',
        //    controller: 'PostsController'
        //});
    }])
//// route configurations
//.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
//    // edit category
//    $stateProvider.state("categories/edit", {
//        url: "categories/edit",
//        templateUrl: '/modules/views/category-edit.html',
//        controller: 'CategoriesController'
//    });
//    // add category
//    $stateProvider.state('categories/add', {
//        url: "/categories/add",
//        templateUrl: '/modules/views/category-add.html',
//        controller: 'CategoriesController'
//    });
//    // post categories
//    $stateProvider.state("categories", {
//        url: "/categories",
//        templateUrl: '/modules/views/categories.html',
//        controller: 'CategoriesController'
//    });
//    // post routes
//    $stateProvider.state("posts", {
//        url: "/posts",
//        templateUrl: '/modules/views/post.html',
//        controller: 'PostController'
//    });
//    // activate routes
//    $stateProvider.state("activate", {
//        url: "/activate/:userId/:code/",
//        templateUrl: '/modules/views/activate.html',
//        controller: 'ActivateController'
//    });
//    // reset pwd route
//    $stateProvider.state("reset", {
//        url: "/reset/:userId/:code",
//        controller: "ResetController",
//        templateUrl: "/modules/views/reset.html"
//    });
//    // forget pwd routes
//    $stateProvider.state("forget", {
//        url: "/forget",
//        controller: "ForgetController",
//        templateUrl: "/modules/views/send-forget.html"
//    });
//    //// signup route
//    //$stateProvider.state("signup", {
//    //    url: "/signup",
//    //    controller: "SignupController",
//    //    templateUrl: "/modules/views/signup.html"
//    //});
//    // login route
//    //$stateProvider
//    // home route
//    //$stateProvider.state("home", {
//    //    url: "/home",
//    //    controller: "HomeController",
//    //    templateUrl: "/modules/views/home.html"
//    //});

//    $stateProvider.state("home", {
//        url: "/home",
//        views: {
//            "": {
//                templateUrl: "/modules/views/home.html",
//                controller: "HomeController",
//            },
//            "nav@home": {
//                templateUrl: "/modules/views/home-nav.html",
//            }
//        }
//    })
//    //.state("home.login", {
//    //    url: "/login",
//    //    controller: "LoginController",
//    //    templateUrl: "/modules/views/login.html"
//    //});

//    // default route
//    $urlRouterProvider.otherwise('/login');
//}])
//// configuration routes
//.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
//    // edit post routes
//    $routeProvider.when('/categories/edit', {
//        templateUrl: '/modules/views/category-edit.html',
//        controller: 'CategoriesController'
//    });
//    // add post routes
//    $routeProvider.when('/categories/add', {
//        templateUrl: '/modules/views/category-add.html',
//        controller: 'CategoriesController'
//    });
//    // post routes
//    $routeProvider.when('/categories', {
//        templateUrl: '/modules/views/categories.html',
//        controller: 'CategoriesController'
//    });
//    // post routes
//    $routeProvider.when('/posts', {
//        templateUrl: '/modules/views/post.html',
//        controller: 'PostController'
//    });
//    // activate routes
//    $routeProvider.when('/activate/:userId/:code/', {
//        templateUrl: '/modules/views/activate.html',
//        controller: 'ActivateController'
//    });
//    // reset pwd route
//    $routeProvider.when("/reset/:userId/:code", {
//        controller: "ResetController",
//        templateUrl: "/modules/views/reset.html"
//    });
//    // forget pwd routes
//    $routeProvider.when("/forget", {
//        controller: "ForgetController",
//        templateUrl: "/modules/views/send-forget.html"
//    });
//    // signup route
//    $routeProvider.when("/signup", {
//        controller: "SignupController",
//        templateUrl: "/modules/views/signup.html"
//    });
//    // login route
//    $routeProvider.when("/login", {
//        controller: "LoginController",
//        templateUrl: "/modules/views/login.html"
//    });
//    // home route
//    $routeProvider.when("/home", {
//        controller: "HomeController",
//        templateUrl: "/modules/views/home.html"
//    });
//    // default route
//    $routeProvider.otherwise({ redirectTo: "/login" });

//}])
// configuring authentication interceptor
.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptorService');
}])
// configuring authentication
.run(['AuthService', function (authService) {
    authService.fillAuthData();
}]);
