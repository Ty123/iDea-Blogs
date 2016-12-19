(function () {
    app.controller('ContactDashController', ['$rootScope', '$scope', '$state', 'ContactService', function ($rootScope, $scope, $state, ContactService) {
        $scope.addReply = function () {
            $state.go('admin.contact.reply')
        }
    }])
})();