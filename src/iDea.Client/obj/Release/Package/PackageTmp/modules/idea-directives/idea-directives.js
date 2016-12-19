///#source 1 1 /modules/idea-directives/idea-loading.js
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
