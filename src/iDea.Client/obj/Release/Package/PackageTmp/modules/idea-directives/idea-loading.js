(function () {
    app.directive('loading', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/modules/views/loading.html',
            link: function (scope, element, attr) {
                scope.$watch('loading', function (val) {
                    if (val)
                        $(element).show();
                    else
                        $(element).hide();
                });
            }
        }
    })
})();