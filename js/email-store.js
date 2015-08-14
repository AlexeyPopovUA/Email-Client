window.EmailStore = (function () {
    "use strict";

    var list = [];
    var groups;


    return {
        getData: function () {
            return list;
        },

        group: function () {

        },

        sort: function () {

        },

        getAt: function (index) {

        },

        getById: function (id) {
            for (var i = 0, len = list.length; i < len; i++) {
                if (list[i]._id === id) {
                    return list[i];
                }
            }

            return null;
        },

        load: function (callback) {
            var xmlhttp = new XMLHttpRequest();
            var url = "json/emails.json";

            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    list = JSON.parse(xmlhttp.responseText);
                    callback(list);
                }
            };
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        }
    }
})();