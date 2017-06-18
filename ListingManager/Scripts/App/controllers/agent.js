(function () {
    'use strict'

    /**
    *@ngdoc function
    *@name ListingManger.controller:agentCtrl
    *@descripttion
    * # mainCtrl
    * Controller of the Listing Manager
    */

    app.controller("agentCtrl", ["$scope", "commonData", function ($scope, commonData) {
        $scope.agentList = [];

        $scope.addAgentItem = function () {
            //var scope = this;
            var addItem = { AgentName: $scope.AgentName };
            if (!commonData.checkForDuplicateItems($scope.agentList, addItem)) {
                $scope.agentList.push(addItem);
                $scope.clear();
            }
            else
                alert("The item is already in Agent Item[s]");
        };

        $scope.deleteAgentItem = function (idx) {
            $scope.agentList.splice(idx, 1);
        };

        $scope.clear = function () {
            $scope.AgentName = "";
        };

        $scope.onAgentInIt = function () {
            $scope.clear();
        };

    }]);
})();