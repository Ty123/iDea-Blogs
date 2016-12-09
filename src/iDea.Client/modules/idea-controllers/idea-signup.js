(function () {

    app.controller('SignupController', ['$scope', '$location', '$timeout', 'AuthService', 'SendEmailService', function ($scope, $location, $timeout, AuthService, SendEmailService) {

        $scope.savedSuccessfully = false;
        $scope.message = "";

        $scope.signUp = function () {
            $scope.$parent.loading();
            AuthService.saveRegistration({ email: $scope.username, password: $scope.password, confirmPassword: $scope.password }).then(function (response) {
                //var userId = response.data.userId,
                //    code = response.data.code,
                //    url = 'http://localhost:53017/#/activate/' + userId + '/' + code;
                //    body = '<p>Please activate your account by click this <a href="' + url + '" target="_blank">activate link</a></p>',
                //    message = {
                //        destination: $scope.username,
                //        subject: 'Verify your account',
                //        body: body
                //    };
                //    console.log(code);
                //var userId = response.data.userId,
                //    url = $location.url(),
                //    body = '<p>Please activate your account by click this <a href="http://localhost:53017/#/activate/2" target="_blank">activate link</a></p>',
                //    message = {
                //        destination: $scope.username,
                //        subject: 'Verify your account',
                //        body: body
                //    };

                var userId = response.data.userId,
                    code = response.data.code,
                    callbackUrlBase = 'http://localhost:53017/#/activate/',
                    destination = $scope.username;

                var message = {
                    userId: userId,
                    callbackUrlBase: callbackUrlBase,
                    code: code,
                    destination: destination
                };

                SendEmailService.send(message).then(function (response) {
                    $scope.message = " Please check your email [ " + $scope.username + " ] activate your account.";

                    $scope.savedSuccessfully = true;
                    $scope.username = undefined;
                    $scope.password = undefined;
                    $scope.signupForm.$setValidity();
                    $scope.signupForm.$setPristine();
                    $scope.signupForm.$setUntouched();
                    $scope.$parent.unload();
                }, function (error) {
                    $scope.$parent.unload();
                });
            }, function (response) {
                $scope.$parent.unload();
                var errors = [];
                for (var key in response.data.modelState) {
                    for (var i = 0; i < response.data.modelState[key].length; i++) {
                        errors.push(response.data.modelState[key][i]);
                    }
                }
                $scope.message = "" + errors.join(' ');
            });
        };
    }]);
})();