window.EmailItem = (function () {
    "use strict";

    function EmailItem (email) {
        this.content  = email.content;
        this.subject = email.subject;
        this.fromEmail = email.fromEmail;
        this.fromName = email.fromName;
        this.dateReceived = email.dateReceived;
        this.index = email.index;
        this.read = email.read;
        this._id = email._id;
    }

    EmailItem.prototype.getAge = function () {
        return "5 mins ago";
    };

    EmailItem.prototype.getDate = function () {
        return new Date(this.dateReceived).toDateString();
    };

    EmailItem.prototype.renderBrief = function () {
        return '' +
            '<div class="email-small" emailId="' + this._id + '">' +
                '<div class="head">' +
                    '<span class="from-name">' + this.fromName + '</span>' +
                    '<span class="date">' + this.getAge() + '</span>' +
                '</div>' +
                '<div class="subject">' + this.subject + '</div>' +
            '</div>';
    };

    EmailItem.prototype.renderPreview = function () {
        return '' +
            '<div class="email-preview">' +
                '<div class="head">' +
                    '<div class="from-name">From: <span>' + this.fromName + '</span></div>' +
                    '<div class="to-names">To: <span>' + 'mock "to" ' + '</span></div>' +
                    '<div class="date">Received: <span>' + this.getDate() + '</span></div>' +
                '</div>' +
                '<div class="subject">Subject: <span>' + this.subject + '</span></div>' +
                '<div class="content">' + this.content + '</div>' +
            '</div>';
    };

    return EmailItem;
})();