(function () {
    app.controller('PostController', ['$scope', 'PostService', function ($scope, PostService) {
        //$scope.on("$routeChangeSuccess", function () {
        //    PostService.allPosts().then(function (response) {
        //        console.log(response);
        //    }, function (error) {

        //    })
        //});

        (function (PS) {
            PS.allPosts().then(function (response) {
                console.log(response);
            }, function (error) {

            })
        })(PostService);
    }])
})();