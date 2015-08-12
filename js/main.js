(function () {
    "use strict";

    window.onload = function () {
        EmailStore.load(function (list) {
            //list.sort();
            EmailList.add()
        });
    }
})();