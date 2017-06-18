var app = angular.module("ListingManager", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "Views/templates/agent.tpl.html",
        controller: "agentCtrl"
    })
    .when("/listing", {
        templateUrl: "Views/templates/listing.tpl.html",
        controller: "listingCtrl"
    })
    .when("/openhouse", {
        templateUrl: "Views/templates/openhouse.tpl.html",
        controller: "openhouseCtrl"
    })
    .otherwise({
        templateUrl: "Views/templates/agent.tpl.html",
        controller: "agentCtrl"
    });
});
