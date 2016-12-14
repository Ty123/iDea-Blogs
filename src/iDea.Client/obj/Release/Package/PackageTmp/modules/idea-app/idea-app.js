﻿var authenticated = false;
var serviceBase = 'http://blog-auth.tyly.co.nz/', dalUrlBase = 'http://blog-resources.tyly.co.nz/';
//var serviceBase = 'http://localhost:65189/', dalUrlBase = 'http://localhost:53453/';

var app = angular.module('howzit', ['ngRoute', 'ngMessages', 'ngAnimate', 'LocalStorageModule', 'ui.bootstrap'])
// constants
.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    apiDalBaseUri: dalUrlBase,
    clientId: 'ngAuthApp'
})
// configuration routes
.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    // post routes
    $routeProvider.when('/posts', {
        templateUrl: '/modules/views/post.html',
        controller: 'PostController'
    });
    // activate routes
    $routeProvider.when('/activate/:userId/:code/', {
        templateUrl: '/modules/views/activate.html',
        controller: 'ActivateController'
    });
    // reset pwd route
    $routeProvider.when("/reset/:userId/:code", {
        controller: "ResetController",
        templateUrl: "/modules/views/reset.html"
    });
    // forget pwd routes
    $routeProvider.when("/forget", {
        controller: "ForgetController",
        templateUrl: "/modules/views/send-forget.html"
    });
    // signup route
    $routeProvider.when("/signup", {
        controller: "SignupController",
        templateUrl: "/modules/views/signup.html"
    });
    // login route
    $routeProvider.when("/login", {
        controller: "LoginController",
        templateUrl: "/modules/views/login.html"
    });
    // home route
    $routeProvider.when("/home", {
        controller: "HomeController",
        templateUrl: "/modules/views/home.html"
    });
    // default route
    $routeProvider.otherwise({ redirectTo: "/login" });

}])
// configuring authentication interceptor
.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptorService');
}])
// configuring authentication
.run(['AuthService', function (authService) {
    authService.fillAuthData();
}]);
