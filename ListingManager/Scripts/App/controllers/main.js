(function () {
    'use strict'

    /**
    *@ngdoc function
    *@name ListingManger.controller:mainCtrl
    *@descripttion
    * # mainCtrl
    * Controller of the Listing Manager
    */
    app.controller("mainCtrl", ["$scope", "$location", function ($scope, $location) {
        $scope.date = new Date();

        $scope.OnInIt = function () {
            if ($location.$$path.indexOf('listing') > -1)
                this.activeClass = '2';
            else if ($location.$$path.indexOf('openhouse') > -1)
                this.activeClass = '3';
            else
                this.activeClass = '1';
        };
    }]);
})();