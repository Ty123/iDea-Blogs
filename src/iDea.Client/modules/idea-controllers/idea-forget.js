(function () {
    'use strict';
    app.controller('ForgetController', ['$scope', 'ForgetPwdService', 'SendEmailService', function ($scope, ForgetPwdService, SendEmailService) {
        $scope.savedSuccessfully == false;

        $scope.reset = function () {
            $scope.$parent.loading(); // display loading page.
            ForgetPwdService.reset($scope.username).then(function (response) {
                console.log((response));
                var message = {
                    userId: response.userId,
                    destination: $scope.username,
                    callbackUrlBase: 'http://localhost:53017/#/reset/',
                    //callbackUrlBase : 'http://blog-admin.tyly.co.nz/#/reset/',
                    code: response.code,
                    subject: 'Reset your password',
                    body: '<p> Please reset your password by clicking the <a href="{0}">this link</a>'
                };

                SendEmailService.send(message).then(function (response) {
                    $scope.message = " Please check your email [ " + $scope.username + " ] to reset your password";
                    $scope.savedSuccessfully = true;
                    $scope.username = undefined;
                    $scope.forgetForm.$setValidity();
                    $scope.forgetForm.$setPristine();
                    $scope.forgetForm.$setUntouched();
                    $scope.$parent.unload();
                }, function (error) {
                    $scope.$parent.unload();
                });
            }, function (error) {
                var errors = [];
                if (error.data.modelState) {
                    for (var key in error.data.modelState) {
                        for (var i = 0; i < response.data.modelState[key].length; i++) {
                            errors.push(response.data.modelState[key][i]);
                        }
                    }
                    $scope.message = "" + errors.join(' ');
                } else {
                    $scope.message = error.error_description;
                }
            })
        }
    }])
})();