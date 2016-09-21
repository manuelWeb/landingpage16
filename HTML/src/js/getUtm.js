// 1-campaign utm_campaign de l'URL
// 2-mailArray définition manuel pour comparaison
var campaign  = getUtm('campaign'),
    mailArray = ['boitesSweetAlice','jardiniere','secheCheveux'];
// fct recup argument aprés:utm_arg dans l'URL
function getUtm(arg) {
  // filtre la chaine location.search entre utm_ et &
  var regex   = new RegExp('[\?&]utm_' + arg + '=([^&]*)'),
      results = regex.exec(location.search);
  return results === null ? "utm_"+arg+" non renseigné" : results[1];
}
// fct masquage(elements à masquer)
function hide (elements) {
  elements = elements.length ? elements : [elements];
  for (var index = 0; index < elements.length; index++) {
    elements[index].style.display = 'none';
  }
}
// fct affichage(elmnt display:block)
function show (element) {
  element = '#'+element;
  // element = document.querySelectorAll(element)
  element = $(element);
  element[0].style.display = 'block';
}

$(function() {
   // masque tous les elmnts
   hide($('#boitesSweetAlice, #jardiniere ,#secheCheveux'));
    // comparaison ID et utm
    for (var i = 0; i < mailArray.length; i++) {
      var campaignexist = false
      // campaign === mailArray[i] ? show(mailArray[i]) : show(mailArray[0])
      if(campaign === mailArray[i]){
        show(mailArray[i]);
      }else if(campaign ===""){
        show(mailArray[0])
      }
    };
});
// alternative JS vanilla à jquery $(document).ready() 
// document.addEventListener('DOMContentLoaded', function() {
// }, false);
