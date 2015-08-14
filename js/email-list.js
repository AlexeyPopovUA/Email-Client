window.EmailList = (function () {
    "use strict";

    function _generateEmailItem(email) {
        return new EmailItem(email).renderBrief();
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
                var emailId;

                while (target != listContainer) {
                    if (target.getAttribute("emailId")) {
                        break;
                    }
                    target = target.parentNode
                }

                emailId = target.getAttribute("emailId");

                if (emailId) {
                    me.select(target);
                }

            });

            EmailStore.load(function (list) {
                //list.sort();
                //list.group();

                for (var i = 0, len = list.length; i < len; i++) {
                    me.add(list[i]);
                }

                me.select(listContainer.querySelector(".email-small"));
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

                EmailPreview.open(new EmailItem(EmailStore.getById(selection)));
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