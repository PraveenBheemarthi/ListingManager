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
            var addItem = { OpenHouseId: $scope.OpenHouseId, OpenHouseBeginDate: $scope.OpenHouseBeginDate, OpenHouseEndDate: $scope.OpenHouseEndDate, ListingId: $scope.ListingId.ListingId, ListingName:$scope.ListingName };
            //if (!commonData.checkForDuplicateItems($scope.openHouseList, addItem)) {
            openhouseService.postOpenHouse(addItem).then(function (response) {
                addItem.OpenHouseId =response.OpenHouseId;
                addItem.OpenHouseBeginDate =response.OpenHouseBeginDate;
                addItem.OpenHouseEndDate =response.OpenHouseEndDate;
                addItem.ListingId = response.ListingId;
                addItem.ListingName =response.ListingName;
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
            openhouseService.putOpenHouse(updateItem.OpenHouseId, updateItem).then(function (response) {
                if (response == "")
                    updateItem.editOpenHouseItem = !updateItem.editOpenHouseItem;
                else
                    console.log("putOpenHouseSuccess:" + response);
            }, function (error) {
                console.log("putOpenHouse Error:" + error);
            });
        };

        $scope.deleteOpenHouseListItem = function (index) {
            var deleteItem = $scope.openHouseList[index];
            openhouseService.deleteOpenHouse(deleteItem.OpenHouseId).then(function (response) {
                $scope.openHouseList.splice(idx, 1);
            }, function (error) {
                console.log("deleteOpenHouse Error:" + error);
            });
        };

        $scope.clear = function () {
            $scope.OpenHouseBeginDate = null; $scope.OpenHouseEndDate = null; $scope.ListingId = "";
        };

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