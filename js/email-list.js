window.EmailList = (function () {
    "use strict";

    function _generateEmailItem(email) {
        return '' +
            '<div class="email-small" emailId="' + email._id + '">' +
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

    var selection;

    return {
        init: function () {
            var me = this;

            listContainer = document.querySelector(".left-sidebar");
            listContainer.addEventListener("click", function (event) {
                var target = event.target || event.srcElement;

                while(target != listContainer) {
                    if (target.getAttribute("emailId")) {
                        break;
                    }
                    target = target.parentNode
                }
                console.log(target.getAttribute("emailId"));
                me.select(target);
            });

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

        select: function (element) {
            if (!element.classList.contains("selected")) {
                this.clearSelection();
                element.classList.add("selected");
                selection = element.getAttribute("emailId");
            }
        },

        clearSelection: function () {
            var selected = listContainer.querySelectorAll(".selected");

            for (var i = 0, len = selected.length; i < len; i++) {
                selected[i].classList.remove("selected");
            }

            selection = null;
        },

        getSelection: function () {
            return selection;
        }
    }
})();