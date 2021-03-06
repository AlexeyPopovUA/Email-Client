window.EmailItem = (function () {
    "use strict";

    /**
     * This is a constructor for email item
     * @param email {Object} simple object from json
     * @constructor
     */
    function EmailItem (email) {
        this.content  = email.content;
        this.subject = email.subject;
        this.fromEmail = email.fromEmail;
        this.fromName = email.fromName;
        this.toName = email.toName;
        this.dateReceived = email.dateReceived;
        this.index = email.index;
        this.read = email.read;
        this._id = email._id;
    }

    /**
     * Displays how long ago this message was received
     * @TODO Mock data should be replaced with calculated value
     * @returns {string}
     */
    EmailItem.prototype.getAge = function () {
        return humanized_time_span(new Date(this.dateReceived));
    };

    /**
     * Returns formatted data
     * @returns {string}
     */
    EmailItem.prototype.getDate = function () {
        return new Date(this.dateReceived).toDateString();
    };

    /**
     * Returns formatted data using formatting dd-mm-YY
     * @returns {string}
     */
    EmailItem.prototype.getShortDate = function () {
        var date = new Date(this.dateReceived);

        var day = date.getDate();
        if (day < 10) day = '0' + day;

        var month = date.getMonth() + 1;
        if (month < 10) month = '0' + month;

        var year = date.getFullYear();

        return day + '-' + month + '-' + year;
    };

    /**
     * Returns view content for brief email rendering mode
     * @returns {string}
     */
    EmailItem.prototype.renderBrief = function () {
        return '' +
            '<div class="email-small opacity-animation" emailId="' + this._id + '">' +
                '<div class="head">' +
                    '<span class="from-name">' + this.fromName + '</span>' +
                    '<span class="date">' + this.getAge() + '</span>' +
                '</div>' +
                '<div class="subject">' + this.subject + '</div>' +
            '</div>';
    };

    /**
     * returns view content for detailed email rendering mode
     * @returns {string}
     */
    EmailItem.prototype.renderPreview = function () {
        return '' +
            '<div class="email-preview opacity-animation">' +
                '<div class="head">' +
                    '<div class="from-name">From: <span>' + this.fromName + '</span></div>' +
                    '<div class="to-names">To: <span>' + this.toName + '</span></div>' +
                    '<div class="date">Received: <span>' + this.getDate() + '</span></div>' +
                '</div>' +
                '<div class="subject">Subject: <span>' + this.subject + '</span></div>' +
                '<div class="content">' + this.content + '</div>' +
            '</div>';
    };

    return EmailItem;
})();