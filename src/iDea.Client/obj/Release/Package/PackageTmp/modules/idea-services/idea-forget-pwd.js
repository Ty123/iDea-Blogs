(function () {
    app.factory('ForgetPwdService', ['$http', '$q', 'ngAuthSettings', function ($http, $q, ngAuthSettings) {
        var url = ngAuthSettings.apiServiceBaseUri;
        var service = {};

        var _reset = function (email) {
            var deferred = $q.defer();

            $http.post(url + 'api/Account/ForgetPassword?email=' + email).success(function (response) {
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