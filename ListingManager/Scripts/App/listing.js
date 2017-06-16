app.controller("listingCtrl", ["$scope", "commonservice", function ($scope, commonservice) {
    $scope.listingList = [];

    $scope.addListingItem = function () {
        //var scope = this;
        var addItem = { ListingName: $scope.ListingName, ListingAddress: $scope.ListingAddress, AgentId : $scope.AgentId };
        if (!commonservice.checkForDuplicateItems($scope.listingList, addItem)) {
            $scope.listingList.push(addItem);
            $scope.clear();
        }
        else
            alert("The item is already in Listing Item[s]");
    };


    $scope.deleteListingItem = function (idx) {
        $scope.listingList.splice(idx, 1);
    };

    $scope.clear = function () {
        $scope.ListingName = ""; $scope.ListingAddress = ""; $scope.AgentId = "";
    };
    
    $scope.onListingInIt = function () {
        $scope.clear();
    };
   
}]);