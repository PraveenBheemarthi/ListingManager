app.controller("listingCtrl", ["$scope", "commonservice", function ($scope, commonservice) {

    $scope.addListingName = ""; $scope.addListingAddress = "";
    $scope.listingList = [];

    $scope.addListingItem = function () {
        var scope = this;
        var addItem = { ListingName: scope.addListingName, ListingAddress: scope.addListingAddress };
        if (!commonservice.checkitems($scope.listingList, addItem)) {
            $scope.listingList.push(addItem);
            scope.addListingName = ""; scope.addListingAddress = "";
        }
        else
            alert("The item is already in Listing Item[s]");
    };


    $scope.deleteListingItem = function (idx) {
        $scope.listingList.splice(idx, 1);
    };


    //$scope.OnMainInIt = function () {
    //    $scope.addListingName = $scope.addListingAddress = "";
    //    $scope.Listing = [];
    //};
   
}]);