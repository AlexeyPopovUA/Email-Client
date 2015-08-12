window.EmailStore = (function () {
    "use strict";

    var list = [];
    var groups;


    return {
        group: function () {

        },

        sort: function () {

        },

        getAt: function (index) {

        },

        getById: function (id) {

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