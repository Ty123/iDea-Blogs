(function () {
    app.factory('ResetPwdService', ['$http', '$q', 'ngAuthSettings', function ($http, $q, ngAuthSettings) {
        var url = ngAuthSettings.apiServiceBaseUri;
        var service = {};

        var _reset = function (data) {
            var deferred = $q.defer();

            $http.post(url + 'api/Account/ResetPassword', data).success(function (response) {
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