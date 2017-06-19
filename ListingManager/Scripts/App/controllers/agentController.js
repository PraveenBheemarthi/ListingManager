(function () {
    'use strict'

    /**
    *@ngdoc function
    *@name ListingManger.controller:agentCtrl
    *@descripttion
    * # mainCtrl
    * Controller of the Listing Manager
    */

    app.controller("agentCtrl", ["$scope", "commonData", "agentService", function ($scope, commonData, agentService) {
        $scope.agentList = [];

        $scope.addAgentItem = function () {
            //var scope = this;
            var addItem = { AgentId: $scope.AgentId, AgentName: $scope.AgentName };
           // if (!commonData.checkForDuplicateItems($scope.agentList, addItem)) {
                agentService.postAgent(addItem).then(function (response) {
                    addItem.AgentId = response.AgentId;
                    addItem.AgentName = response.AgentName;
                    $scope.agentList.push(addItem);
                }, function (error) {
                    console.log("postAgent Error:" + error);
                });
                $scope.clear();
            //}
            //else
            //    alert("The item is already in Agent Item[s]");
        };

        $scope.updateListingItem = function (index) {debugger
            var updateItem = $scope.agentList[index];
            agentService.putAgent(updateItem.AgentId, updateItem).then(function (response) {
                if (response == "")
                    updateItem.editAgentItem = !updateItem.editAgentItem;
                else
                    console.log("putAgent Success:" + response);
            }, function (error) {
                console.log("putAgent Error:" + error);
            });

        };

        $scope.deleteAgentItem = function (index) {
            var deleteItem = $scope.agentList[index];
            agentService.deleteAgent(deleteItem.AgentId).then(function (response) {
                $scope.agentList.splice(index, 1);
            }, function (error) {
                console.log("deleteAgents Error:" + error);
            });
        };

        $scope.clear = function () {
            $scope.AgentId = 0;
            $scope.AgentName = "";
        };

        $scope.onAgentInIt = function () {
            $scope.clear();
            agentService.getAgents().then(function (response) {
                $scope.agentList = response;
            }, function (error) {
                console.log("getAgents:" + error);
            });
        };

    }]);
})();