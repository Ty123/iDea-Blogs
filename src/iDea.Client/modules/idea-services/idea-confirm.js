(function () {
    app.factory('ConfirmService', ['$http', '$q', '$log', 'ngAuthSettings', function ($http, $q, $log, ngAuthSettings) {
        var url = ngAuthSettings.apiServiceBaseUri,
            service = {};

        var _send = function (message) {
            var deferred = $q.defer(),
                data = {
                    destination: message.destination,
                    subject: message.subject,
                    body: message.body
                };

            $http.post(url + 'api/Account/SendEmail', data).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        service.send = _send;

        return service;
    }])
})();