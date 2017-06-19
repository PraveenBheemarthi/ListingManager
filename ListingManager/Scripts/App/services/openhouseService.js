app.factory("openhouseService", ["$http", "$q", "appConfig", function ($http, $q, appConfig) {


    return {
        getOpenHouses: getOpenHouses,
        getOpenHouse: getOpenHouse,
        postOpenHouse: postOpenHouse,
        putOpenHouse: putOpenHouse,
        deleteOpenHouse: deleteOpenHouse
    }

    //function ajaxHelper(uri, method, data) {
    //    return $.ajax({
    //        type: method,
    //        url: uri,
    //        dataType: 'json',
    //        contentType: 'application/json',
    //        data: data ? JSON.stringify(data) : null
    //    }).fail(function (jqXHR, textStatus, errorThrown) {
    //        self.error(errorThrown);
    //    });
    //}

    function getOpenHouses() {
        var request = $http({
            method: "get",
            url: appConfig().api_url + "/OpenHouse",
            //params: { tabname: tabname, facilityid: facilityid }
        });
        return (request.then(handleSuccess, handleError));
        //return reportPeriod;
    }

    function getOpenHouse(openhouseId) {
        var request = $http({
            method: "get",
            url: appConfig().api_url + "/OpenHouse/" + openhouseId,
            params: { id: openhouseId }
        });
        return (request.then(handleSuccess, handleError));
    }

    function postOpenHouse(openhouseData) {
        var request = $http({
            method: "post",
            url: appConfig().api_url + "/OpenHouse",
            params: { openhouse: openhouseData },
            data: openhouseData,
            headers: {
                "Content-Type": "application/json"
            }
        });
        return (request.then(handleSuccess, handleError));
    }

    function putOpenHouse(openhouseId, openhouseData) {
        //console.log(openhouseId, openhouseData);
        var request = $http({
            method: "put",
            url: appConfig().api_url + "/OpenHouse/" + openhouseId,
            params: { id: openhouseId, openhouse: openhouseData },
            data: openhouseData,
            headers: {
                "Content-Type": "application/json"
            }
        });
        return (request.then(handleSuccess, handleError));
    }

    function deleteOpenHouse(openhouseId) {
        var request = $http({
            method: "delete",
            url: appConfig().api_url + "/OpenHouse/" + openhouseId,
            params: { id: openhouseId }
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