(function (app) {
    app.controller('ContactController', ['$scope', 'ContactService', function ($scope, ContactService) {
        $scope.submit = function () {
            var data = {
                name: $scope.fullName,
                email: $scope.contactEmail,
                subject: $scope.subject,
                website: $scope.website == undefined ? 'N/A' : $scope.website,
                body: $scope.message
            }

            $scope.$parent.loading();

            ContactService.add(data).then(function (response) {
                $scope.fullName = undefined;
                $scope.contactEmail = undefined;
                $scope.subject = undefined;
                $scope.website = undefined;
                $scope.message = undefined;

                $scope.contactForm.$setValidity();
                $scope.contactForm.$setPristine();
                $scope.contactForm.$setUntouched();

                $scope.$parent.unload(2000);
            }, function (error) {
                console.log(error);
                $scope.$parent.unload(2000);
            })
        }
    }])
})(app);