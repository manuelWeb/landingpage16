
// fct getUtm(argument-after-utm_)
function getUtm(arg) {
  var regex   = new RegExp('[\?&]utm_' + arg + '=([^&]*)'),
      results = regex.exec(location.search);
  return results === null ? "" : results[1];
}
// Give the URL parameters variable names
var campaign = getUtm('campaign');
var medium   = getUtm('medium'); // etc

// console.log(campaign);
var mail1 = "boitesSweetAlice",
		mail2 = "jardiniere",
		mail3 = "secheCheveux",
		mailArray = ['boitesSweetAlice','jardiniere','secheCheveux'];
// mask tous les kdo
function hide (elements) {
  elements = elements.length ? elements : [elements];
  for (var index = 0; index < elements.length; index++) {
    elements[index].style.display = 'none';
  }
}
function show (element) {
  // element ? elements : [elements];
  element = '#'+element;
  element = document.querySelectorAll(element)
  console.log(element[0])
  element[0].style.display = 'block';
}
// alternative jquery $(document).ready() 
window.onload = function() {
	hide(document.querySelectorAll('#boitesSweetAlice, #jardiniere ,#secheCheveux'));
	for (var i = 0; i < mailArray.length; i++) {
		if (campaign === mailArray[i]){
			show(mailArray[i]);
		}
	}
	// if(campaign == mail2){
	// 	show(mail2);
	// };
};
// if(campaign == mail1){
// 	show('#'+mail1)
// }else if(campaign == mail2) {
// 	show('#'+mail2)
// 	// alert(mail2)
// }else if(campaign == mail3){
// 	show('#'+mail3)
// 	// alert(mail3)
// }else if(campaign == ""){
// 	alert('campaign nok')
// }