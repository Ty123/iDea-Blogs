(function () {

    app.controller('SignupController', ['$scope', '$location', '$timeout', 'AuthService', 'ConfirmService', function ($scope, $location, $timeout, AuthService, ConfirmService) {

        $scope.savedSuccessfully = false;
        $scope.message = "";

        $scope.defaultUser = {
            email: "",
            password: "",
            confirmPassword: ""
        };

        $scope.signUp = function () {
            $scope.$parent.loading();
            AuthService.saveRegistration({ email: $scope.username, password: $scope.password, confirmPassword: $scope.password }).then(function (response) {
                var userId = response.data.userId,
                    url = $location.url(),
                    body = '<p>Please activate your account by click this <a href="http://localhost:53017/#/activate/2" target="_blank">link</a></p>',
                    message = {
                        destination: $scope.username,
                        subject: 'Verify your account',
                        body: body
                    };

                ConfirmService.send(message).then(function (response) {
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