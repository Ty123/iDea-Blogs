(function () {

    app.controller('SignupController', ['$scope', '$location', '$timeout', 'AuthService', 'SendEmailService', function ($scope, $location, $timeout, AuthService, SendEmailService) {

        $scope.savedSuccessfully = false;
        $scope.message = "";

        $scope.signUp = function () {
            $scope.$parent.loading();
            AuthService.saveRegistration({ email: $scope.username, password: $scope.password, confirmPassword: $scope.password }).then(function (response) {

                var userId = response.data.userId,
                    code = response.data.code,
                    //callbackUrlBase = 'http://localhost:53017/#/activate/',
                    callbackUrlBase = 'http://blog-admin.tyly.co.nz/#/activate/',
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