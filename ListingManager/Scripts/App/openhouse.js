app.controller("openhouseCtrl", ["$scope", "commonservice", function ($scope,commonservice) {

    $scope.openHouseList = [];

    $scope.addOpenHouseListItem = function () {
        var addItem = { OpenHouseBeginDate: $scope.OpenHouseBeginDate, OpenHouseEndDate: $scope.OpenHouseEndDate, ListingId: $scope.ListingId };
        if (!commonservice.checkForDuplicateItems($scope.openHouseList, addItem)) {
            $scope.openHouseList.push(addItem);
            $scope.clear();
        }
        else
            alert("The item is already in Open House Item[s]");
    };

    $scope.clear = function () {
        $scope.OpenHouseBeginDate = null; $scope.OpenHouseEndDate = null; $scope.ListingId = "";
    };

    $scope.deleteOpenHouseListItem = function (idx) {
        $scope.openHouseList.splice(idx, 1);
    };
 
    $scope.onOpenHouseInIt = function () {
        $scope.clear();
    };

}]);