window.EmailStore = (function () {
    "use strict";

    var originalList = [];
    var modifiedList = [];
    var groups;

    return {
        getData: function () {
            return modifiedList;
        },

        group: function () {

        },

        sortBy: function (property, direction) {
            modifiedList = originalList.sort(function (a, b) {
                if (a[property] > b[property]) {
                    return direction === "ASC" ? 1 : -1;
                } else if (a[property] < b[property]) {
                    return direction === "ASC" ? -1 : 1;
                } else {
                    return 0;
                }
            });

            return modifiedList;
        },

        filterBy: function (property, value) {
            var me = this;

            modifiedList = originalList.filter(function (item) {
                return item[property] === value;
            });

            return modifiedList;
        },

        clearFiltering: function () {
            modifiedList = originalList.slice();
        },

        getAt: function (index) {
            return modifiedList[index];
        },

        getById: function (id) {
            for (var i = 0, len = originalList.length; i < len; i++) {
                if (originalList[i]._id === id) {
                    return originalList[i];
                }
            }

            return null;
        },

        load: function (callback) {
            //Uncomment when using server
            /*
            var xmlhttp = new XMLHttpRequest();
            var url = "json/emails.json";

            xmlhttp.onreadystatechange = function() {
                debugger;
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    list = JSON.parse(xmlhttp.responseText);
                    callback(list);
                }
            };
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
            */

            //Quick solution to load local json wrapped by js file
            for (var i = 0, len = EmailData.length; i < len; i++) {
                originalList.push(new EmailItem(EmailData[i]));
            }
            callback(originalList);
        }
    }
})();