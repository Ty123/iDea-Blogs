(function () {
    app.factory('ResetService', ['$http', '$q', 'ngAuthSettings', function ($http, $q, ngAuthSettings) {
        var url = ngAuthSettings.apiServiceBaseUri;
        var service = {};

        var _reset = function (obj) {
            var deferred = $q.defer();

            $http.post(url + 'api/Account/SendForgetPassword?email=' + obj).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        service.reset = _reset;

        return service;

    }]);
})();