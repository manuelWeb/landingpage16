/**
* Initialisation des fonctionnalités JQuery du site V4
*/
$(document).ready(function() {
    //if ($('#menu').length) iniMenu();
    if ($('#fprod').length) iniFicheProd();
   
    if ($('#produitMoisSlider').length) iniProduitMoisSlider();
});


//-----------------------------------------------------------------------------------
//                                  LES FONCTIONNALITES
//-----------------------------------------------------------------------------------
/**
 * Permet de gérer la touche entrée sur une zone de texte en appelant automatiquement le click du bouton ou lien correspondant.
 */
(function($) {
    $.fn.Entree = function(IdBouton) {

        $(this).bind('keydown', function(event) {
            if ((event.which && event.which == 13) || (event.keyCode && event.keyCode == 13)) {
                $("[id$=" + IdBouton + "]")[0].click();
                
                return false;
            }

            return true;
        });

    };
})(jQuery);

/**
 * Permet de créer un tooltip sous la d'un div transparent sur l'objet concerné
 */
(function($) {
    $.fn.tooltip = function(b) {
        var c = '<div class="ToolTip"><div class="bottom"><div class="content"></div></div></div>';
        var d = 280;
        var e;
        if (!((typeof b == "undefined" || typeof b == "") && $(this).attr("alt") == "")) {
            $(this).hover(function() {
                if (!$(this).hasClass('disableTT')) {
                    $("body").append(c);
                    e = $("div.ToolTip");
                    e.hide();
                    b = typeof b != "undefined" ? b : $(this).attr("alt");
                    $("div.ToolTip .content").html(b);
                    var f = e.height() + 5;
                    var g = (e.width() - 10) / 2 - $(this).width() / 2;
                    var h = $(this).offset();
                    var i = h;
                    i.top = h.top - f;
                    i.left = h.left - g;
                    e.css("position", "absolute").css("z-index", "1000");
                    e.css(i).fadeIn(d);
                }
            }, function() {
                $("div.ToolTip").fadeOut(d, function() {
                    $(this).remove();
                });
            });
        }
    };
})(jQuery);

/**
* Permet d'afficher un tooltip sur un élément passé en paramètre
*/
function ShowToolTip(div) {
    $("[id$=" + div + "]").removeClass('disableTT');
    $("[id$=" + div + "]").trigger('mouseover');
}

/**
* Permet de cacher un tooltip sur un élément passé en paramètre
*/
function HideToolTip(div) {
    $("[id$=" + div + "]").trigger('mouseleave');
    $("[id$=" + div + "]").addClass('disableTT');
}

/*! Tickbox */
function tb_init(b) {
    $(b).click(function() {
        var t = this.title || this.name || null;
        var a = this.href || this.alt;
        var g = this.rel || false;
        tb_show(t, a, g);
        this.blur();
        return false;
    });
}

/**
 * Permet d'afficher un bloc de code html au centre de la page avec un div masquant transparent gris autour
 */
function tb_show(d, f, g, callback) {
    try {
         if (typeof document.body.style.maxHeight === "undefined") {
            $("body", "html").css({
                height: "100%",
                width: "100%"
            });
            $("html").css("overflow", "hidden");
            if (document.getElementById("TB_HideSelect") === null) {
                $("body").append("<iframe id='TB_HideSelect'></iframe><div id='TB_overlay'></div><div id='TB_window'></div>");
                $("#TB_overlay").click(tb_remove);
            }
        } else {
            if (document.getElementById("TB_overlay") === null) {
                $("body").append("<div id='TB_overlay'></div><div id='TB_window'></div>");
                $("#TB_overlay").click(tb_remove);
            }
        }
        if (tb_detectMacXFF()) {
            $("#TB_overlay").addClass("TB_overlayMacFFBGHack");
        } else {
            $("#TB_overlay").addClass("TB_overlayBG");
        }
        if (d === null) {
            d = "";
        }
        var l = f.replace(/^[^\?]+\??/, '');
        var m = tb_parseQuery(l);
        var ajaxContentW = TB_WIDTH = (m['width'] * 1) || 630;
        var ajaxContentH = TB_HEIGHT = (m['height'] * 1) || '';

        if ($("#TB_window").css("display") != "block") {
            if (m['modal'] != "true") {
                $("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>" + d + "</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton'>X</a></div></div><div id='TB_ajaxContent' style='width:" + ajaxContentW + "px;height:" + ajaxContentH + "px'></div>");
            } else {
                $("#TB_overlay").unbind();
                $("#TB_window").append("<div id='TB_ajaxContent' class='TB_modal' style='width:" + ajaxContentW + "px;height:" + ajaxContentH + "px;'></div>");
            }
        } else {
            $("#TB_ajaxContent")[0].style.width = ajaxContentW + "px";
            $("#TB_ajaxContent")[0].style.height = ajaxContentH + "px";
            $("#TB_ajaxContent")[0].scrollTop = 0;
            $("#TB_ajaxWindowTitle").html(d);
        }

        $("#TB_closeWindowButton").click(tb_remove);
       
        if (f.indexOf('TB_inline') != -1) {
            $("#TB_ajaxContent").append($('#' + m['inlineId']).children());
            $("#TB_window").unload(function() {
                if ($('#' + m['inlineId'])[0].innerHTML.trim() == "") {
                    $('#' + m['inlineId']).append($("#TB_ajaxContent").children());
                }
            });
            setTimeout(function() {
                tb_position();
                $("#TB_window").css({
                    display: "block"
                });
            }, 100);
            typeof(callback) == 'function' ? callback() : '';
        } else {
            $("#TB_ajaxContent").load(f += "&random=" + (new Date().getTime()), function() {
                tb_position();
                $("#TB_window").css({
                    display: "block"
                });
                typeof(callback) == 'function' ? callback() : '';
            });
        }
        if (!m['modal']) {
            document.onkeyup = function(e) {
                if (e == null) {
                    keycode = event.keyCode;
                } else {
                    keycode = e.which;
                }
                if (keycode == 27) {
                    tb_remove();
                }
            };
        }
    } catch (e) { }
}

/**
 * Permet de supprimer le div crée par la méthode tb_show
 */
function tb_remove() {
    $("#TB_imageOff").unbind("click");
    $("#TB_closeWindowButton").unbind("click");
    $(".ToolTip").fadeOut("fast");// NL : le 28/11/2012 : On supprime également d'éventuels tooltip visible.
    $("#TB_window").fadeOut("fast", function() {
        $('#TB_window,#TB_overlay,#TB_HideSelect').trigger("unload").unbind().remove();
    });
    if (typeof document.body.style.maxHeight == "undefined") {
        $("body", "html").css({
            height: "auto",
            width: "auto"
        });
        $("html").css("overflow", "");
    }
    document.onkeydown = "";
    document.onkeyup = "";
    return false;
}

/**
 * Permet de positionner le div crée par la méthode tb_show
 */
function tb_position() {
    TB_HEIGHT = (TB_HEIGHT == '' ? $("#TB_window").height() : parseInt(TB_HEIGHT));
    var mTop = (parseInt($(document).scrollTop()) - parseInt((TB_HEIGHT / 2), 10));
    $('#TB_window').css({
        marginLeft: '-' + parseInt((TB_WIDTH / 2), 10) + 'px',
        width: TB_WIDTH + 'px',
        marginTop: mTop + 'px'
    }).css({
        height: parseInt($('#TB_window').height()) + 'px'
    });
}

/**
 *
 */
function tb_parseQuery(a) {
    var b = {};
    if (!a) {
        return b;
    }
    var c = a.split(/[;&]/);
    for (var i = 0; i < c.length; i++) {
        var d = c[i].split('=');
        if (!d || d.length != 2) {
            continue;
        }
        var e = unescape(d[0]);
        var f = unescape(d[1]);
        f = f.replace(/\+/g, ' ');
        b[e] = f;
    }
    return b;
}

/**
 * Permet de récupérer la taille de la page
 */
function tb_getPageSize() {
    var a = document.documentElement;
    var w = window.innerWidth || self.innerWidth || (a && a.clientWidth) || document.body.clientWidth;
    var h = window.innerHeight || self.innerHeight || (a && a.clientHeight) || document.body.clientHeight;
    arrayPageSize = [w, h];
    return arrayPageSize;
}

/**
 * Retourne vrai si le navigateur est firefox ou un mac
 */
function tb_detectMacXFF() {
    var a = navigator.userAgent.toLowerCase();
    if (a.indexOf('mac') != -1 && a.indexOf('firefox') != -1)
        return true;

    return false;
}

/**
 * Permet de contourner le bug Microsoft sur les radiobutton dans un repeater. 
 * Cette fonction va rétablir les check des radiobutton d'un même groupe
 */
function SetUniqueRadioButton(nameregex, current) {
    var re = new RegExp(nameregex);

    for (var i = 0; i < document.forms[0].elements.length; i++) {

        var elm = document.forms[0].elements[i];

        if (elm.type == 'radio') {
            if (re.test(elm.name)) {
                elm.checked = false;
            }
        }
    }

    current.checked = true;
}

/**
 * Permet de valider un email passé en paramètre
 */
function ValideEmail(MailATester) {
    var reg = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');

    if (reg.test(MailATester)) {
        return true;
    }
    else {
        return false;
    }
}
