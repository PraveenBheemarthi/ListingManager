var app = angular.module("ListingManager", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "templatepages/listing.html",
        controller: "listingCtrl"
    })
    .when("/agent", {
        templateUrl: "templatepages/agent.html",
        controller: "agentCtrl"
    })
    .when("/openhouse", {
        templateUrl: "templatepages/openhouse.html",
        controller: "openhouseCtrl"
    })
    .otherwise({
        templateUrl: "templatepages/listing.html",
        controller: "listingCtrl"
    });
});
