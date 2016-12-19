(function () {
    app.controller('ContactDetailController', ['$rootScope', '$scope', 'ContactService', '$state', '$stateParams', function ($rootScope, $scope, ContactService,  $state, $stateParams) {

        $rootScope.$on('$viewContentLoaded', function (event, viewName, viewContent) {
            ContactService.getById($stateParams.id).then(function (response) {
                $scope.contact = response;
            }, function (error) {
               
            })
        });

        $scope.search = function () {
            $rootScope.isLoading = true;
            $state.go('search', { 'title': $scope.title })
        }
    }])
})();