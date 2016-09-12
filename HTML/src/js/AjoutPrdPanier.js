//-----------------------------------------------------------------------------------
//                                  LES FONCTIONNALITES
//-----------------------------------------------------------------------------------
/** 
* Pose d'un écouteur sur l'évènement click "Ajouter au panier".
* Cela va afficher un DIV de confirmation d'ajout au panier
*/
function AffichageDivAjoutPanier(libelle, montant, nomPhoto) {

    $("[id$=LAB_QTEPRODUIT]").text("1");
    $("[id$=LAB_LIBELLEPRD_DIV]").text(libelle);
    $("[id$=LAB_PRIX_PRODUIT_DIV]").text(montant);
    $("#IMG_DIALOGUE_PRD").attr("src", $("#IMG_DIALOGUE_PRD").attr("src") + nomPhoto);
    
    $(".next").click(tb_remove); // Gestion du bouton "poursuivre vos achats"
    tb_show('', '#TB_inline?height=250&width=600&inlineId=layerAjout&modal=false', ''); // Affichage de la popup d'ajout au panier
}

/** 
 * Permet d'afficher un DIV d'accès à du contenu adulte
 */
function AffichageDivAccesAdulte() {
   
    $(".next").click(tb_remove);
    tb_show('', '#TB_inline?height=150&width=383&inlineId=layerAccesAdulte&modal=true', '');
}