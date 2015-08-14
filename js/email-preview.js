window.EmailPreview = (function () {
    "use strict";

    /**
     * Contains link to the email detailed information container
     */
    var emailContainer;

    //public methods
    return {
        /**
         * Removes content from the email container
         */
        clear: function () {
            emailContainer.innerHTML = "";
        },

        /**
         * Opens detailed view of email item
         * @param emailItem {window.EmailItem}
         */
        open: function (emailItem) {
            if (!emailContainer) {
                emailContainer = document.querySelector(".preview");
            }

            this.clear();

            emailContainer.insertAdjacentHTML("beforeend", emailItem.renderPreview());
        }
    }
})();