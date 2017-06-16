app.controller("agentCtrl", ["$scope", "commonservice", function ($scope, commonservice) {

    
    $scope.addAgentName = "";
    $scope.agentList = [];

    $scope.addAgentItem = function () {
        var scope = this;
        var addItem = { AgentName: scope.addAgentName };
        if (!commonservice.checkitems($scope.agentList, addItem)) {
            $scope.agentList.push(addItem);
            scope.addAgentName = "";
        }
        else
            alert("The item is already in Agent Item[s]");
    };

    $scope.deleteAgentItem = function (idx) {
        $scope.agentList.splice(idx, 1);
    };

    //$scope.OnAgentInit = function () {
    //    $scope.addAgentName = "";
    //    $scope.AgentList = [];
    //};

}]);