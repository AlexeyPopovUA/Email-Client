window.EmailList = (function () {
    "use strict";

    function _generateEmailItem(email) {
        return email.renderBrief();
    }

    function _generateSeparator(label) {
        return "<div class='separator'>" + label + "</div>"
    }

    var listContainer;

    var selection;

    return {
        init: function () {
            var me = this;

            listContainer = document.querySelector(".left-sidebar .email-list");
            listContainer.addEventListener("click", function (event) {
                var target = event.target || event.srcElement;
                var emailId;

                while (target != listContainer) {
                    emailId = target.getAttribute("emailId");
                    if (target.getAttribute("emailId")) {
                        break;
                    }
                    target = target.parentNode;
                }

                if (emailId) {
                    me.select(EmailStore.getById(emailId));
                }
            });

            document.querySelector(".read-status").addEventListener("change", function () {
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

                me.renderItems(list);
                me.select(EmailStore.getAt(0));
            });
        },

        renderItems: function (emailList, append) {
            var me = this;
            var lastShortDate;
            var nextShortDate;

            if (append !== true) {
                me.removeAllItems();
            }

            for (var j = 0, emailLen = emailList.length; j < emailLen; j++) {
                console.log(emailList[j].getShortDate());
                nextShortDate = emailList[j].getShortDate();
                if (lastShortDate !== nextShortDate){
                    me.addSeparator(nextShortDate);
                    lastShortDate = nextShortDate;
                }
                me.addEmailItem(emailList[j]);
            }
        },

        addEmailItem: function (email) {
            listContainer.insertAdjacentHTML("beforeend", _generateEmailItem(email));
        },

        addSeparator: function (label) {
            listContainer.insertAdjacentHTML("beforeend", _generateSeparator(label));
        },

        select: function (email) {
            var element = listContainer.querySelector('.email-small[emailId="' + email._id + '"]');

            if (!element.classList.contains("selected")) {
                this.clearSelection();
                element.classList.add("selected");
                selection = element.getAttribute("emailId");

                EmailPreview.open(EmailStore.getById(selection));
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
            var emailElements = listContainer.querySelectorAll(".email-small, .separator");
            for (var i = 0, elemLen = emailElements.length; i < elemLen; i++) {
                listContainer.removeChild(emailElements[i]);
            }
        }
    }
})();