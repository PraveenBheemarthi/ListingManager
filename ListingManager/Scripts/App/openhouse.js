app.controller("openhouseCtrl", ["$scope", "commonservice", function ($scope,commonservice) {

    $scope.addOpenHouseBeginDate = null; $scope.addOpenHouseEndDate = null;
    $scope.openHouseList = [];

    $scope.addOpenHouseListItem = function () {
        var scope = this;
        var addItem = { OpenHouseBeginDate: scope.addOpenHouseBeginDate, OpenHouseEndDate: scope.addOpenHouseEndDate };
        if (!commonservice.checkitems($scope.openHouseList, addItem)) {
            $scope.openHouseList.push(addItem);
            scope.addOpenHouseBeginDate = null; scope.addOpenHouseEndDate = null;
        }
        else
            alert("The item is already in Open House Item[s]");
    };

    $scope.deleteOpenHouseListItem = function (idx) {
        $scope.openHouseList.splice(idx, 1);
    };

    //$scope.addItem = function () {
    //    $scope.errortext = "";
    //    if (!$scope.addMe) { return; }
    //    if ($scope.products.indexOf($scope.addMe) == -1) {
    //        $scope.products.push($scope.addMe);
    //    } else {
    //        $scope.errortext = "The item is already in your shopping list.";
    //    }
    //}
    //$scope.removeItem = function (x) {
    //    $scope.errortext = "";
    //    $scope.products.splice(x, 1);
    //}

    //$scope.OnOpenHouseInIt = function () {
    //    $scope.addOpenHouseBeginDate = $scope.addOpenHouseEndDates = null;
    //    $scope.OpenHouseList = [];
    //};

}]);