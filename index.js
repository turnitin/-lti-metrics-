module.exports = {
  trackBehaviour = function(name, attrs) {
    if (!name) {
      return;
    }

    attrs = _.defaults({}, attrs, {
      role: window.curr_role,
      lang: window.curr_lang,
      hostname: window.location.hostname,
      mode: window.curr_mode
    });

    if (window.newrelic) {
      newrelic.addPageAction(name, attrs)
    }
  }
};