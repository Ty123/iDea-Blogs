(function () {
    app.factory('ActivateService', ['$http', '$q', '$log', 'ngAuthSettings', function ($http, $q, $log, ngAuthSettings) {
        var url = ngAuthSettings.apiServiceBaseUri,
            service = {};

        var _activate = function (data) {
            var deferred = $q.defer();

            $http.post(url + 'api/Account/ConfirmEmail?userId='+ data.userId + '&code=' + data.code).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        service.activate = _activate;

        return service;
    }])
})();