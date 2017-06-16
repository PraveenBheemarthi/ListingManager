var app = angular.module("ListingManager", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "templatepages/main.html"
    })
    .when("/agent", {
        templateUrl: "templatepages/agent.html"
    })
    .when("/openhouse", {
        templateUrl: "templatepages/openhouse.html"
    })
    .otherwise({
        templateUrl: "main.html"
    });
});
app.controller("myCtrl", ["$scope", function ($scope) {
    //$scope.Listing = [{ ListingName: "Park", ListingAddress: "H.No. 379, Avenue Park, NY" }, { ListingName: "Mark", ListingAddress: "H.No. 810, Silicon Park, NY" }];
    $scope.date = new Date();
   
    $scope.addListingName = ""; $scope.addListingAddress = "";
    $scope.listingList = [];

    $scope.addAgentName = "";
    $scope.agentList = [];

    $scope.addOpenHouseBeginDate = null; $scope.addOpenHouseEndDate = null;
    $scope.openHouseList = [];

    $scope.addListingItem = function () {
        var scope = this;
        var addItem = { ListingName: scope.addListingName, ListingAddress: scope.addListingAddress };
        if (!$scope.checkitems($scope.listingList, addItem)) {
            $scope.listingList.push(addItem);
            scope.addListingName = ""; scope.addListingAddress = "";
        }
        else
            alert("The item is already in Listing Item[s]");
        
    };

    $scope.addAgentItem = function () {
        var scope = this;
        var addItem = { AgentName: scope.addAgentName };
        if (!$scope.checkitems($scope.agentList, addItem)) {
            $scope.agentList.push(addItem);
            scope.addAgentName = "";
        }
        else
            alert("The item is already in Agent Item[s]");
    };
    $scope.addOpenHouseListItem = function () {
        var scope = this;
        var addItem = { OpenHouseBeginDate: scope.addOpenHouseBeginDate, OpenHouseEndDate: scope.addOpenHouseEndDate };
        if (!$scope.checkitems($scope.openHouseList, addItem)) {
            $scope.openHouseList.push(addItem);
            scope.addOpenHouseBeginDate = null; scope.addOpenHouseEndDate = null;
        }
        else
            alert("The item is already in Open House Item[s]");
    };

    $scope.deleteListingItem = function (idx) {
        $scope.listingList.splice(idx, 1);
    };

    $scope.deleteAgentItem = function (idx) {
        $scope.agentList.splice(idx, 1);
    };

    $scope.deleteOpenHouseListItem = function (idx) {
        $scope.openHouseList.splice(idx, 1);
    };

    $scope.checkitems = function contains(list, obj) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].$$hashKey)
                delete list[i].$$hashKey
            if ( JSON.stringify(list[i]) ==  JSON.stringify(obj)) {
                return true;
            }
        }
        return false;
    }
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

   

    //$scope.OnMainInIt = function () {
    //    $scope.addListingName = $scope.addListingAddress = "";
    //    $scope.Listing = [];
    //};
    //$scope.OnAgentInit = function () {
    //    $scope.addAgentName = "";
    //    $scope.AgentList = [];
    //};
    //$scope.OnOpenHouseInIt = function () {
    //    $scope.addOpenHouseBeginDate = $scope.addOpenHouseEndDates = null;
    //    $scope.OpenHouseList = [];
    //};
    $scope.OnInIt = function () {
        if (location.hash.indexOf('agent') > -1)
            this.activeClass = '2';
        else if (location.hash.indexOf('openhouse') > -1)
            this.activeClass = '3';
        else
            this.activeClass = '1';
    };
}]);