(function () {
    app.controller('CategoriesController', ['$scope', 'CategoriesService', '$window', '$timeout', function ($scope, CategoriesService, $window, $timeout) {
        $scope.categories = [];
        $scope.savedSuccessfully = false;
        $scope.message = "";

        $scope.$on('$routeChangeSuccess', function () {

            CategoriesService.categories().then(function (response) {
                $scope.categories = response;
            }, function (error) {

            });
        });

        $scope.add = function () {
            var data = {
                name: $scope.category,
                description: $scope.description
            }

            $scope.$parent.loading();

            CategoriesService.add(data).then(function (response) {
                $window.location.href = '#/categories';
                $scope.$parent.unload();
            }, function (error) {
                $scope.$parent.unload();
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
            });
        }

        $scope.edit = function () {
            var data = {
                id: $scope.id,
                name: $scope.category,
                description: $scope.description
            }

            CategoriesService.edit(data).then(function (response) {
                $window.location.href = '#/categories';
                $scope.$parent.unload();
            }, function (error) {
                $scope.$parent.unload();
                var errors = [];
                if (response.data.modelState) {
                    for (var key in response.data.modelState) {
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