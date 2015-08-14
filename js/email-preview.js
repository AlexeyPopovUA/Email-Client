window.EmailPreview = (function () {
    "use strict";


    var emailContainer;

    return {
        clear: function () {

        },

        open: function (emailItem) {
            if (!emailContainer) {
                emailContainer = document.querySelector(".preview");
            }

            emailContainer.insertAdjacentHTML("beforeend", emailItem.renderPreview());
        }
    }
})();