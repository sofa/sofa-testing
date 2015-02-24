sofa.define('sofa.mocks.httpService', function ($q) {

    'use strict';

    var mocks,
        requestQueue    = [],
        requestCount    = 0,
        responseCount   = 0;

    var self = function (config) {
        requestCount++;
        config.method = config.method && config.method.toLowerCase();
        requestQueue.push(config);
        var deferred = $q.defer();


        var responseMock = mocks[config.method][config.url];
        var configData = config.data || config.params;
        if (responseMock === undefined && configData !== undefined) {
            var endpointKey = createEndpointKey(config.url, configData);
            responseMock = mocks[config.method][endpointKey];
        }

        if (responseMock && typeof responseMock.responseTime === 'number') {
            setTimeout(function () {
                deferred.resolve(generateResponse(responseMock, configData));
                responseCount++;
            }, responseMock.responseTime);
        } else if (responseMock) {
            deferred.resolve(generateResponse(responseMock, configData));
            responseCount++;
        }

        return deferred.promise;
    };

    var generateResponse = function (responseMock, configData) {
        return {
            data: responseMock.data,
            config: {
                data: configData || {}
            }
        };
    };

    self.clearCounter = function() {
        requestCount    = 0;
        responseCount   = 0;
    };

    self.getCounter = function() {
        return {
            requestCount: requestCount,
            responseCount: responseCount
        };
    };

    self.getLastCallParams = function () {
        return requestQueue.length > 0 ? requestQueue[requestQueue.length - 1] : null;
    };

    self.getRequestQueue = function () {
        return requestQueue;
    };

    self.when = function (method, endpoint, data) {

        endpoint = createEndpointKey(endpoint, data);

        return {
            respond: function (data, responseTime) {
                method = method.toLowerCase();
                mocks[method][endpoint] = {
                    data: data,
                    responseTime: responseTime
                };
            }
        };
    };

    var createEndpointKey = function (endpoint, data) {
        return data !== undefined ? endpoint + '_' + md5Object(data) : endpoint;
    };

    /**
     * clear the mocked data so that the service is in it's initial state
     *
     */
    self.clear = function () {
        requestQueue.length = 0;
        mocks = {
            get: {},
            post: {},
            put: {},
            jsonp: {},
            'delete': {}
        };
    };

    self.clear();

    return self;
});
