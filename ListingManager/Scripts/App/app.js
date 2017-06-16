var app = angular.module("ListingManager", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "templatepages/agent.html",
        controller: "agentCtrl"
    })
    .when("/listing", {
        templateUrl: "templatepages/listing.html",
        controller: "listingCtrl"
    })
    .when("/openhouse", {
        templateUrl: "templatepages/openhouse.html",
        controller: "openhouseCtrl"
    })
    .otherwise({
        templateUrl: "templatepages/agent.html",
        controller: "agentCtrl"
    });
});
