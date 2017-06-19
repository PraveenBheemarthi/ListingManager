(function () {
    'use strict'

    /**
    *@ngdoc function
    *@name ListingManger.service:commonData
    *@descripttion
    * # commonData
    * Service of the Listing Manager
    */
    app.service('commonData', function () {
        this.checkForDuplicateItems = function contains(list, obj) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].$$hashKey)
                    delete list[i].$$hashKey
                if (JSON.stringify(list[i]) == JSON.stringify(obj)) {
                    return true;
                }
            }
            return false;
        }
    });
})();