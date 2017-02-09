/* global newrelic */

let _ = require('underscore');

module.exports = {
    trackBehaviour: function (name, attrs) {
        if (!name) {
            return;
        }

        attrs = _.defaults({}, attrs, {
            role: window.curr_role,
            lang: window.curr_lang,
            hostname: window.location.hostname,
            mode: window.curr_mode
        });

        // The newrelic JS snippet should be included on relevant hosts (i.e.
        // non dev hosts) above the first script tag inside the HEAD tag, or
        // at the bottom of the HEAD tag.
        if (window.newrelic) {
            newrelic.addPageAction(name, attrs);
        }
    }
};
