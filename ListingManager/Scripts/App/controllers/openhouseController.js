(function () {
    'use strict'

    /**
    *@ngdoc function
    *@name ListingManger.controller:openhouseCtrl
    *@descripttion
    * # mainCtrl
    * Controller of the Listing Manager
    */
    app.controller("openhouseCtrl", ["$scope", "commonData", "openhouseService", "listingService", function ($scope, commonData, openhouseService, listingService) {

        $scope.openHouseList = [];

        $scope.listingList = [];

        $scope.addOpenHouseListItem = function () {
            var addItem = { OpenHouseId: $scope.OpenHouseId, OpenHouseBeginDate: $scope.OpenHouseBeginDate, OpenHouseEndDate: $scope.OpenHouseEndDate, ListingId: $scope.Listing.ListingId, ListingName: $scope.Listing.ListingName };
            //if (!commonData.checkForDuplicateItems($scope.openHouseList, addItem)) {
            openhouseService.postOpenHouse(addItem).then(function (response) {
                addItem.OpenHouseId = response.OpenHouseId;
                addItem.OpenHouseBeginDate = new Date(response.OpenHouseBeginDate);
                addItem.OpenHouseEndDate = new Date(response.OpenHouseEndDate);
                addItem.ListingId = response.ListingId;
                addItem.ListingName = response.ListingName;
                $scope.openHouseList.push(addItem);
            }, function (error) {
                console.log("postListing Error:" + error);
            });
            $scope.clear();
            //}
            //else
            //    alert("The item is already in Open House Item[s]");
        };

        $scope.updateOpenHouseItem = function (index) {
            var updateItem = $scope.openHouseList[index];
            updateItem.ListingId = $scope.openHouseList[index].openhouseEditSelect.ListingId;
            updateItem.ListingName = $scope.openHouseList[index].openhouseEditSelect.ListingName;
            openhouseService.putOpenHouse(updateItem.OpenHouseId, updateItem).then(function (response) {
                if (response == "")
                    updateItem.editOpenHouseListItem = !updateItem.editOpenHouseListItem;
                else
                    console.log("putOpenHouseSuccess:" + response);
            }, function (error) {
                console.log("putOpenHouse Error:" + error);
            });
        };

        $scope.deleteOpenHouseListItem = function (index) {
            var deleteItem = $scope.openHouseList[index];
            openhouseService.deleteOpenHouse(deleteItem.OpenHouseId).then(function (response) {
                $scope.openHouseList.splice(index, 1);
            }, function (error) {
                console.log("deleteOpenHouse Error:" + error);
            });
        };

        $scope.clear = function () {
            $scope.OpenHouseBeginDate = null; $scope.OpenHouseEndDate = null; $scope.Listing = [];
        };

        $scope.editItemClick = function (index) {
            $scope.openHouseList[index].openhouseEditSelect = {
                ListingId: $scope.openHouseList[index].ListingId, ListingName: $scope.openHouseList[index].ListingName, ListingAddress: $scope.openHouseList[index].ListingAddress,
                AgentId: $scope.openHouseList[index].AgentId, AgentName: $scope.openHouseList[index].AgentName
            };
            // $scope.singleEdit = !$scope.singleEdit;
        };

        //$scope.updateEditSelectedItem = function (openhouseEditSelect) {
        //    $scope.listtingEditSelect.ListingId = openhouseEditSelect.ListingId;
        //    $scope.listtingEditSelect.ListingName = openhouseEditSelect.ListingName;
        //    $scope.openhouseEditSelect.ListingAddress = openhouseEditSelect.ListingAddress;
        //};

        $scope.onOpenHouseInIt = function () {
            $scope.clear();

            openhouseService.getOpenHouses().then(function (response) {
                angular.forEach(response, function (v, i) {
                    v.OpenHouseBeginDate = new Date(v.OpenHouseBeginDate);
                    v.OpenHouseEndDate = new Date(v.OpenHouseEndDate);
                });
                $scope.openHouseList = response;
            }, function (error) {
                console.log("getOpenHouses:" + error);
            });

            listingService.getListings().then(function (response) {
                $scope.listingList = response;
            }, function (error) {
                console.log("getListings:" + error);
            });
        };

    }]);
})();