﻿app.controller("mainCtrl", ["$scope", "$location", function ($scope, $location) {
    $scope.date = new Date();
    
    $scope.OnInIt = function () {
        if ($location.$$path.indexOf('agent') > -1)
            this.activeClass = '2';
        else if ($location.$$path.indexOf('openhouse') > -1)
            this.activeClass = '3';
        else
            this.activeClass = '1';
    };
}]);