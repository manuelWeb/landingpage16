(function ief_var() {
	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	};
	// recup code kdo ds le cookie codeKdoAffilia
	var code = readCookie('codeKdoAffilia');
	// ajout val dans champ code kdo
	$('#ctl00_ContentPlaceHolder1_TB_CODE_KDO').val(code);
	// ajout attr onclick sur lien ok du code cadeau
	$('#ctl00_ContentPlaceHolder1_A_VALIDER_CODE_KDO').attr('onclick', 'javascript:__doPostBack("ctl00$ContentPlaceHolder1$A_VALIDER_CODE_KDO","")');
	// declenchement evt click du btn OK > indiquez votre code
	// test existence du cookie (éviter de déclencher un click sans ce dernier)
	code ? $('#ctl00_ContentPlaceHolder1_A_VALIDER_CODE_KDO').trigger('click') : alert('noCodeAf')

})();//end ief_var