var authenticated = false;
var serviceBase = 'http://blog-auth.tyly.co.nz/', dalUrlBase = 'http://blog-resources.tyly.co.nz/';
//var serviceBase = 'http://localhost:65189/', dalUrlBase = 'http://localhost:53453/';

var app = angular.module('idea-blog', ['ui.router', 'ngResource', 'ngMessages', 'ngAnimate', 'LocalStorageModule', 'ui.bootstrap', 'oi.select', 'textAngular'])
// constants
.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    apiDalBaseUri: dalUrlBase,
    clientId: 'ngAuthApp'
})
// configuring authentication
.run(['AuthService', 'PostService', 'CategorieService', 'TagService', 'ContactService', '$rootScope', '$state', function (AuthService, PostService, CategorieService, TagService, ContactService, $rootScope, $state) {
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

    ContactService.contacts().then(function (response) {
        $rootScope.contacts = response;
        $rootScope.isLoading = false;
    }, function (error) { });

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        var requireLogin = toState.data.requiredLogin;

        if (requireLogin && !$rootScope.authentication.isAuth) {
            event.preventDefault();
            $state.go('login')
        }
    });
}]);
