(function () {
    app.controller('SignupController', ['$scope', '$location', '$timeout', 'AuthService', function ($scope, $location, $timeout, AuthService) {

        $scope.regex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/i;
        $scope.savedSuccessfully = false;
        $scope.message = "";

        $scope.registration = {
            email: "",
            password: "",
            confirmPassword: ""
        };

        $scope.signUp = function () {
            AuthService.saveRegistration({ email: $scope.username, password: $scope.password, confirmPassword: $scope.password }).then(function (response) {

                $scope.savedSuccessfully = true;
                $scope.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
                $timeout(function () {
                    $location.path('#/login')
                }, 2000)

            }, function (response) {
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