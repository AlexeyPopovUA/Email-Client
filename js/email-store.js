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

        sortBy: function (property, direction) {
            list.sort(function (a, b) {
                if (a[property] > b[property]) {
                    return direction === "ASC" ? 1 : -1;
                } else if (a[property] < b[property]) {
                    return direction === "ASC" ? -1 : 1;
                } else {
                    return 0;
                }
            });

            return list;
        },

        getAt: function (index) {
            return list[index];
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