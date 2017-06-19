app.factory("listingService", ["$http", "$q", "appConfig", function ($http, $q, appConfig) {


    return {
        getListings: getListings,
        getListing: getListing,
        postListing: postListing,
        putListing: putListing,
        deleteListing: deleteListing
    }

    function getListings() {
        var request = $http({
            method: "get",
            url: appConfig().api_url + "/Listing",
            //params: { tabname: tabname, facilityid: facilityid }
        });
        return (request.then(handleSuccess, handleError));
        //return reportPeriod;
    }

    function getListing(listingId) {
        var request = $http({
            method: "get",
            url: appConfig().api_url + "/Listing/" + listingId,
            params: { id: listingId }
        });
        return (request.then(handleSuccess, handleError));
    }

    function postListing(listingData) {
        var request = $http({
            method: "post",
            url: appConfig().api_url + "/Listing",
            params: { listing: listingData },
            data: listingData,
            headers: {
                "Content-Type": "application/json"
            }
        });
        return (request.then(handleSuccess, handleError));
    }

    function putListing(listingId, listingData) {
        //console.log(listingId, listingData);
        var request = $http({
            method: "put",
            url: appConfig().api_url + "/Listing/" + listingId,
            params: { id: listingId, listing: listingData },
            data: listingData,
            headers: {
                "Content-Type": "application/json"
            }
        });
        return (request.then(handleSuccess, handleError));
    }

    function deleteListing(listingId) {
        var request = $http({
            method: "delete",
            url: appConfig().api_url + "/Listing/" + listingId,
            params: { id: listingId }
        });
        return (request.then(handleSuccess, handleError));
    }

    function handleError(response) {
        //console.log("Error", response.data);
        if (!angular.isObject(response.data) || !response.data.message) {
            return ($q.reject("An unknown error occurred."));
        }
        return ($q.reject(response.data.message));
    }

    function handleSuccess(response) {
        //console.log("Success", response.data);
        return (response.data);
    }
}]);