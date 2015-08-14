window.EmailStore = (function () {
    "use strict";

    /**
     * Contains original item list. Can be sorted
     * @type {window.EmailItem[]}
     */
    var originalList = [];

    /**
     * Contains modified item list. Can be filtered
     * @type {window.EmailItem[]}
     */
    var modifiedList = [];

    //public members
    return {
        /**
         * Returns filtered data
         * @returns {window.EmailItem[]}
         */
        getData: function () {
            return modifiedList;
        },

        /**
         * Sorts original list
         * @param property {String} sorting will be performed by this property
         * @param direction {String}
         * @returns {window.EmailItem[]}
         */
        sortBy: function (property, direction) {
            modifiedList = originalList.sort(function (a, b) {
                if (a[property] > b[property]) {
                    return direction === "ASC" ? 1 : -1;
                } else if (a[property] < b[property]) {
                    return direction === "ASC" ? -1 : 1;
                } else {
                    return 0;
                }
            }).slice();

            return modifiedList;
        },

        /**
         * Filters original list by property value and updates the modified list
         * @param property
         * @param value
         * @returns {Array}
         */
        filterBy: function (property, value) {
            var me = this;

            modifiedList = originalList.filter(function (item) {
                return item[property] === value;
            });

            return modifiedList;
        },

        /**
         * Restores initial sorted content in the modified list
         */
        clearFiltering: function () {
            modifiedList = originalList.slice();
        },

        /**
         * Returns item from modified list by it's index
         * @param index
         * @returns {window.EmailItem|undefined}
         */
        getAt: function (index) {
            return modifiedList[index];
        },

        /**
         * Returns item from original list by it's id
         * @param id
         * @returns {window.EmailItem|null}
         */
        getById: function (id) {
            for (var i = 0, len = originalList.length; i < len; i++) {
                if (originalList[i]._id === id) {
                    return originalList[i];
                }
            }

            return null;
        },

        /**
         * This method loads data from the json
         * @TODO If the http server is being used for this application, please uncomment ajax request and enable CORS (if needed)
         * @param callback
         */
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