﻿(function () {
    app.factory('SendEmailService', ['$http', '$q', '$log', 'ngAuthSettings', function ($http, $q, $log, ngAuthSettings) {
        var url = ngAuthSettings.apiServiceBaseUri,
            service = {};

        var _send = function (message) {
            var deferred = $q.defer(),
                data = {
                    userId: message.userId,
                    destination: message.destination,
                    callbackUrlBase: message.callbackUrlBase,
                    code: message.code,
                    body: message.body,
                    subject: message.subject
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