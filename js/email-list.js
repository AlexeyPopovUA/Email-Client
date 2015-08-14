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
                    target = target.parentNode;
                }

                emailId = target.getAttribute("emailId");

                if (emailId) {
                    me.select(EmailStore.getById(emailId));
                }
            });

            listContainer.querySelector(".read-status").addEventListener("change", function () {
                if (this.checked) {
                    EmailStore.clearFiltering();
                    me.renderItems(EmailStore.getData());
                } else {
                    me.renderItems(EmailStore.filterBy("read", false));
                }

                me.select(EmailStore.getAt(0));
            });

            EmailStore.load(function (list) {
                EmailStore.sortBy("dateReceived", "DESC");
                //list.group();

                me.renderItems(list);
                me.select(EmailStore.getAt(0));
            });
        },

        renderItems: function (emailList) {
            var me = this;

            me.removeAllItems();

            for (var j = 0, emailLen = emailList.length; j < emailLen; j++) {
                me.add(emailList[j]);
            }
        },

        add: function (email) {
            listContainer.insertAdjacentHTML("beforeend", _generateEmailItem(email));
        },

        select: function (email) {
            var element = listContainer.querySelector('.email-small[emailId="' + email._id + '"]');

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
        },

        removeAllItems: function () {
            var emailElements = listContainer.querySelectorAll(".email-small");
            for (var i = 0, elemLen = emailElements.length; i < elemLen; i++) {
                listContainer.removeChild(emailElements[i]);
            }
        }
    }
})();