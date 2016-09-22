### TODO
- **ajout val si cookie + ajout onclick :**
- $('#ctl00_ContentPlaceHolder1_TB_CODE_KDO').val('M601');
- $('#ctl00_ContentPlaceHolder1_A_VALIDER_CODE_KDO').attr('onclick', 'javascript:__doPostBack("ctl00$ContentPlaceHolder1$A_VALIDER_CODE_KDO","")');
- **declencher evt :**
- $('#ctl00_ContentPlaceHolder1_A_VALIDER_CODE_KDO').trigger('click');
	- ou
- $('#ctl00_ContentPlaceHolder1_A_VALIDER_CODE_KDO').get(0).click()

### DONE
- html + style done do cp img and **zip all** 
- **gulp scraping html**
  + test gulp-dom
- renommer
    + styleZoneLibre.scss en index.css 
    + changer dir/dest/ par dir/prod/
    + modifier url par regex supp **../images/imgZL/**
    + dans index.html supp src="**images/imgZL/**
- zipper le contenu de dir/prod (index.html + index.css + img + js + typo)
- alléger les task css (pas de compilation styleV4.scss à chaque fois)
- piste npm install --save-dev gulp-changed
    + compiler uniquement ce qui change (module à charger sur PC home)
- gulp dev
    + fct sass slim img
- branch creaZL merge avec master
- install de gulp-changed ok fctlle
    + [@see gulp-changed](https://www.npmjs.com/package/gulp-changed) 

### projet site under

- construire le app.rb > nok
- épurer le fond de site > ok
- créer .scss pour indexC.slim >ok 

### architecture HTML
- form O_o >
- \#shadow>\#contentBG>\#header + \#menu + .zoneLibre
    + +
- zone1 + 2 + 3 + 4 + div(adult)
- attention aux **&nbsp;** non comatible CP850 ant UTF-8 et aux **&#233;**

### dom parser (web scraping) with node.js
- voir du coté de npm cheerio
- [Quelle techno pour faire du web scraping ?](https://forum.humancoders.com/t/quelle-techno-pour-faire-du-web-scraping/1306)

### nettoyage du cache .gitignore
- git rm -r --cached
  + archiver tous les fichier à conserver
  + supprime tous de l'index
- git add .
  + reimporte tout dans l'index (.gitignore est pris en compte)
- git co -m ".gitignore est maintenant fctlle"
  + archiver (pour supprimer tous ce qui est ignoré)