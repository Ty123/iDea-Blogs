var authenticated = false;
var serviceBase = 'http://blog-auth.tyly.co.nz/';

var app = angular.module('howzit', ['ngRoute', 'ngMessages', 'ngAnimate', 'LocalStorageModule', 'ui.bootstrap'])
// configuration routes
.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    // reset pwd route
    $routeProvider.when("/reset", {
        controller: "ResetController",
        templateUrl: "/modules/views/reset.html"
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
.config(['$httpProvider',function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptorService');
}])
// configuring authentication
.run(['AuthService', function (authService) {
    authService.fillAuthData();
}])
// constants
.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngAuthApp'
});