app.service('commonservice', function () {
    this.myFunc = function (x) {
        return x.toString(16);
    }
    this.checkitems = function contains(list, obj) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].$$hashKey)
                delete list[i].$$hashKey
            if (JSON.stringify(list[i]) == JSON.stringify(obj)) {
                return true;
            }
        }
        return false;
    }
});