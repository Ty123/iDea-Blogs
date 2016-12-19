(function () {
    app.controller('ContactController', ['$rootScope', '$scope', 'ContactService', function ($rootScope, $scope, ContactService) {
        $scope.submit = function () {
            $rootScope.isLoading = true;

            var data = {
                name: $scope.fullName,
                email: $scope.contactEmail,
                subject: $scope.subject,
                website: $scope.website == undefined ? 'N/A' : $scope.website,
                body: $scope.message
            }

            ContactService.add(data).then(function (response) {
                $scope.fullName = undefined;
                $scope.contactEmail = undefined;
                $scope.subject = undefined;
                $scope.website = undefined;
                $scope.message = undefined;

                $scope.contactForm.$setValidity();
                $scope.contactForm.$setPristine();
                $scope.contactForm.$setUntouched();

                $rootScope.isLoading = false;

            }, function (error) {
                alert('Error! Unable to submit your message.');
            })
        }
    }])
})();