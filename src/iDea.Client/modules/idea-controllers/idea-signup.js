(function () {

    app.controller('SignupController', ['$scope', '$location', '$timeout', 'AuthService', 'ConfirmService', function ($scope, $location, $timeout, AuthService, ConfirmService) {

        $scope.regex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/i;
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
                var data = response.data;
                //var body = '<form action="http://localhost:65189/api/Account/SendEmail/" method="post">'
  	            //            +'<inpu type="hidden" name="userId" vlaue="' + data.userId +'"/>'
	            //            +'<inpu type="hidden" name="code" vlaue="' + data.code + '"/>'
  	            //            +'<input type="submit" value="Submit">'
                //         + '</form>';

                //var body = '<p> Please confirm your by click thsis <a href="' + 'http://localhost:65189/api/Account/ConfirmEmail?userId=' + data.userId + '&code=' + data.code + '"> link </a>';
                var body = '<!DOCTYPE html>'
                            + '<html xmlns="http://www.w3.org/1999/xhtml">'
                            + '<head>'
                            + '<title></title>'
                            + '</head>'
                               + '<form action="http://localhost:65189/api/Account/SendEmail/" method="post">'
    	                            + '<inpu type="hidden" name="userId" vlaue="' + data.userId + '"/>'
	                                + '<inpu type="hidden" name="code" vlaue="' + data.code + '"/>'
                                    + '<label> Please confirm your email: </label>'
		                            + '<input type="submit" value="Submit">'
                               + '</form>'
                            + '<body>'
                            + '</body>'
                            + '</html>';

                ConfirmService.send({
                    subject: 'Verify your account',
                    destination: $scope.username,
                    body: body
                }).then(function (response) {
                    $scope.$parent.unload();
                }, function (error) {
                    $scope.$parent.unload();
                });

                //$timeout(function () {
                //    $scope.$parent.unload();
                //    $location.path('#/login')
                //}, 2000)

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