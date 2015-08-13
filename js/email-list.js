window.EmailList = (function () {
    "use strict";

    function _generateEmailItem(email) {
        return '' +
            '<div class="email-small">' +
                '<div class="head">' +
                    '<span class="from-name">' + email.fromName + '</span>' +
                    '<span class="date">5 mins ago</span>' +
                '</div>' +
                '<div class="subject">' + email.subject + '</div>' +
            '</div>';
    }

    function _generateSeparator(date) {

    }

    var listContainer;

    return {
        init: function () {
            var me = this;

            listContainer = document.querySelector(".left-sidebar");

            EmailStore.load(function (list) {
                //list.sort();
                //list.group();

                for (var i = 0, len = list.length; i < len; i++) {
                    me.add(list[i]);
                }
            });
        },

        add: function (email) {
            listContainer.insertAdjacentHTML("beforeend", _generateEmailItem(email));
        },

        select: function () {

        }
    }
})();