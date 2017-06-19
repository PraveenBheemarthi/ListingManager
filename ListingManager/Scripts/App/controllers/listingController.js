(function () {
    'use strict'

    /**
    *@ngdoc function
    *@name ListingManger.controller:listingCtrl
    *@descripttion
    * # mainCtrl
    * Controller of the Listing Manager
    */

    app.controller("listingCtrl", ["$scope", "commonData", "listingService", "agentService", function ($scope, commonData, listingService, agentService) {
        $scope.listingList = [];
        $scope.agentList = [];

        $scope.addListingItem = function () {
            //var scope = this;
            var addItem = { ListingId: $scope.ListingId, ListingName: $scope.ListingName, ListingAddress: $scope.ListingAddress, AgentId: $scope.Agent.AgentId, AgentName: $scope.Agent.AgentName }; // AgentName: $scope.AgentName 
            // if (!commonData.checkForDuplicateItems($scope.listingList, addItem)) {
            listingService.postListing(addItem).then(function (response) {
                addItem.ListingId = response.ListingId;
                addItem.ListingName = response.ListingName;
                addItem.ListingAddress = response.ListingAddress;
                addItem.AgentId = response.AgentId;
                addItem.AgentName = response.AgentName;
                $scope.listingList.push(addItem);
            }, function (error) {
                console.log("postListing Error:" + error);
            });
            $scope.clear();
            //}
            //else
            //    alert("The item is already in Listing Item[s]");
        };

        $scope.updateListingItem = function (index) {
            var updateItem = $scope.listingList[index];
            updateItem.AgentId = $scope.agentEditSelect.AgentId;
            updateItem.AgentName = $scope.agentEditSelect.AgentName;
            listingService.putListing(updateItem.ListingId, updateItem).then(function (response) {
                if (response == "")
                    updateItem.editListingItem = !updateItem.editListingItem;
                else
                    console.log("putListing Success:" + response);
            }, function (error) {
                console.log("putListing Error:" + error);
            });
        };

        $scope.deleteListingItem = function (index) {
            var deleteItem = $scope.listingList[index];
            listingService.deleteListing(deleteItem.ListingId).then(function (response) {
                $scope.listingList.splice(index, 1);
            }, function (error) {
                console.log("deleteListing Error:" + error);
            });
        };

        $scope.clear = function () {
            $scope.ListingId = 0; $scope.ListingName = ""; $scope.ListingAddress = ""; $scope.Agent = [];
        };

        $scope.editItemClick = function (index) {
            $scope.agentEditSelect = $scope.listingList[index];
            // $scope.singleEdit = !$scope.singleEdit;
        };

        $scope.updateEditSelectedItem = function (agentEditSelect) {
            $scope.agentEditSelect.AgentId = agentEditSelect.AgentId;
            $scope.agentEditSelect.AgentName = agentEditSelect.AgentName;
        };
        $scope.onListingInIt = function () {
            $scope.clear();

            listingService.getListings().then(function (response) {
                $scope.listingList = response;
            }, function (error) {
                console.log("getListings:" + error);
            });

            agentService.getAgents().then(function (response) {
                $scope.agentList = response;
            }, function (error) {
                console.log("getAgents:" + error);
            });
        };

    }]);
})();