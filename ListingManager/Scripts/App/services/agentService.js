app.factory("agentService", ["$http", "$q", "appConfig", function ($http, $q, appConfig) {


    return {
        getAgents: getAgents,
        getAgent: getAgent,
        postAgent: postAgent,
        putAgent: putAgent
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

    function getAgents() {
        var request = $http({
            method: "get",
            url: appConfig().api_url + "/Agent",
            //params: { tabname: tabname, facilityid: facilityid }
        });
        return (request.then(handleSuccess, handleError));
        //return reportPeriod;
    }

    function getAgent(agentId) {
        var request = $http({
            method: "get",
            url: appConfig().api_url + "/Agent/" + agentId,
            params: { id: agentId }
        });
        return (request.then(handleSuccess, handleError));
    }

    function postAgent(agentData) {
        var request = $http({
            method: "post",
            url: appConfig().api_url + "/Agent",
            params: { agent: agentData },
            data: agentData,
            headers: {
                "Content-Type": "application/json"
            }
        });
        return (request.then(handleSuccess, handleError));
    }

    function putAgent(agentId, agentData) {
        console.log(agentId, agentData);
        var request = $http({
            method: "put",
            url: appConfig().api_url + "/Agent/" + agentId,
            params: { id: agentId, agent: agentData },
            data: agentData,
            headers: {
                "Content-Type": "application/json"
            }
        });
        return (request.then(handleSuccess, handleError));
    }

    function deleteAgent(agentId) {
        var request = $http({
            method: "delete",
            url: appConfig().api_url + "/Agent/" + agentId,
            params: { id: agentId }
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