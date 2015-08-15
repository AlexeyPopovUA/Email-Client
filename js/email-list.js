window.EmailList = (function () {
    "use strict";

    /**
     * Generates email list item
     * @param email {window.EmailItem}
     * @private
     */
    function _generateEmailItem(email) {
        return email.renderBrief();
    }

    /**
     * Generates group separator
     * @param label {String}
     * @returns {String}
     * @private
     */
    function _generateSeparator(label) {
        return "<div class='separator opacity-animation'>" + label + "</div>"
    }

    /**
     * Contains link to the list container
     */
    var listContainer;

    /**
     * Contains selected emailId
     */
    var selection;

    //public properties
    return {
        /**
         * Creates event listeners and starts data loading and rendering
         */
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

        /**
         * This method renders list items with separators
         * @param emailList {window.EmailItem[]}
         * @param {Boolean} [append] if true, items will be appended to the list container
         */
        renderItems: function (emailList, append) {
            var me = this;
            var lastShortDate;
            var nextShortDate;

            if (append !== true) {
                me.removeAllItems();
            }

            for (var j = 0, emailLen = emailList.length; j < emailLen; j++) {
                nextShortDate = emailList[j].getShortDate();
                if (lastShortDate !== nextShortDate){
                    me.addSeparator(nextShortDate);
                    lastShortDate = nextShortDate;
                }
                me.addEmailItem(emailList[j]);
            }
        },

        /**
         * Creates email item content and adds it to the list container
         * @param email {window.EmailItem}
         */
        addEmailItem: function (email) {
            listContainer.insertAdjacentHTML("beforeend", _generateEmailItem(email));
        },

        /**
         * Creates email list separator and adds it to the list container
         * @param label {String} this text will be rendered in the separator
         */
        addSeparator: function (label) {
            listContainer.insertAdjacentHTML("beforeend", _generateSeparator(label));
        },

        /**
         * This method selects item in item list by the email data object
         * @param email {window.EmailItem}
         */
        select: function (email) {
            var element = listContainer.querySelector('.email-small[emailId="' + email._id + '"]');

            if (!element.classList.contains("selected")) {
                this.clearSelection();
                element.classList.add("selected");
                selection = element.getAttribute("emailId");

                EmailPreview.open(EmailStore.getById(selection));
            }
        },

        /**
         * Clears all selections
         */
        clearSelection: function () {
            var selected = listContainer.querySelectorAll(".selected");

            for (var i = 0, len = selected.length; i < len; i++) {
                selected[i].classList.remove("selected");
            }

            selection = null;
        },

        /**
         * Returns selection Id
         * @returns {*}
         */
        getSelection: function () {
            return selection;
        },

        /**
         * Removes all items from the list container
         */
        removeAllItems: function () {
            var emailElements = listContainer.querySelectorAll(".email-small, .separator");
            for (var i = 0, elemLen = emailElements.length; i < elemLen; i++) {
                listContainer.removeChild(emailElements[i]);
            }
        }
    }
})();