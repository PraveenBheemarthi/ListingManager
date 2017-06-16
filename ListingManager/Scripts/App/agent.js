app.controller("agentCtrl", ["$scope", "commonservice", function ($scope, commonservice) {
    $scope.agentList = [];

    $scope.addAgentItem = function () {
        //var scope = this;
        var addItem = { AgentName: $scope.AgentName };
        if (!commonservice.checkForDuplicateItems($scope.agentList, addItem)) {
            $scope.agentList.push(addItem);
            $scope.clear();
        }
        else
            alert("The item is already in Agent Item[s]");
    };

    $scope.deleteAgentItem = function (idx) {
        $scope.agentList.splice(idx, 1);
    };

    $scope.clear = function () {
        $scope.AgentName = "";
    };

    $scope.onAgentInIt = function () {
        $scope.clear();
    };

}]);