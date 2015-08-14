window.EmailPreview = (function () {
    "use strict";


    var emailContainer;

    return {
        clear: function () {
            emailContainer.innerHTML = "";
        },

        open: function (emailItem) {
            if (!emailContainer) {
                emailContainer = document.querySelector(".preview");
            }

            this.clear();

            emailContainer.insertAdjacentHTML("beforeend", emailItem.renderPreview());
        }
    }
})();