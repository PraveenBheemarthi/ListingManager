(function () {
    'use strict'

    /**
    *@ngdoc function
    *@name ListingManger.config:appConfig
    *@descripttion
    * # appConfig
    * Configuration of the Listing Manager
    */
    app.constant('appConfig', function () {
        return {
            'api_url': 'http://localhost:50922/api/'
        }
    });
})();