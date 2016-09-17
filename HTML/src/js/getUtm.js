// fct getUtm(argument-after-utm_)
function getUtm(arg) {
  var regex   = new RegExp('[\?&]utm_' + arg + '=([^&]*)'),
      results = regex.exec(location.search);
  return results === null ? "" : results[1];
}
// Give the URL parameters variable names
var campaign = getUtm('campaign');
var medium   = getUtm('medium'); // etc