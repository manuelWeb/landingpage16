var isPlayerInit = false;
var baseURL = "http://download.viewontv.com/domoti/overlay/idhomme/";
var playerPositionId = 0;
var initBoxHeight = 0;


function player_fermer() {
    obj_close("overlay");
    obj_close("content_player");
}

function obj_close(name) {
    var obj = document.getElementById(name);
    if (obj != null && obj.style.display != "none")
        obj.style.display = "none";
    var iframe = document.getElementById("flplayer");
    iframe.src = baseURL + "index.html";
    if (playerPositionId != 0)
        clearInterval(playerPositionId);
}

function player_visible(votvUrl, _height) {
    var overlay = document.getElementById("overlay");
    if (overlay == null)
        return;

    if (_height != null) {
        initBoxHeight = _height;
    }

    overlay.style.display = "block";
    var overlay_header = document.getElementById("content_player");
    if (overlay_header == null)
        return;
    overlay_header.style.display = "block";

    var iframe = document.getElementById("flplayer");
    iframe.src = "http://download.viewontv.com/domoti/player/get.html?file=" + votvUrl + "&autorun=1";

    var arrayPageSize = getPageSize();
    var arrayPageScroll = getPageScroll();
    var lightboxTop = Math.round(arrayPageScroll[1] + (arrayPageSize[3] / 5));
    if (initBoxHeight > 0)
        overlay.style.height = initBoxHeight + "px";
    else
        overlay.style.height = arrayPageSize[1] + "px";
    overlay_header.style.top = lightboxTop + "px";

}

function player_init(_height) {
    if (isPlayerInit)
        return;

    if (_height != null) {
        initBoxHeight = _height;
    }

    var arrayPageSize = getPageSize();
    var arrayPageScroll = getPageScroll();
    var lightboxTop = Math.round(arrayPageScroll[1] + (arrayPageSize[3] / 10));
    // conteneur central
    var overlay = document.createElement('div');
    overlay.id = "overlay";
    overlay.style.display = "none";

    if (initBoxHeight > 0)
        overlay.style.height = initBoxHeight + "px";
    else
        overlay.style.height = arrayPageSize[1] + "px";



    var content_player = document.createElement('div');
    content_player.id = "content_player";
    content_player.style.display = "none";
    content_player.style.top = lightboxTop + "px";




    var overlay_player = document.createElement('div');
    overlay_player.id = "overlay_player";
    var iframe = document.createElement('iframe');
    iframe.id = "flplayer";
    iframe.name = "flplayer";
    iframe.width = 332;
    iframe.height = 249;
    iframe.frameBorder = "0";
    iframe.scrolling = "no";

    // header
    var overlay_header_img = document.createElement('img');
    overlay_header_img.border = 0;
    overlay_header_img.src = baseURL + "bt_fermer.png";
    overlay_header_img.align = "right";
    var overlay_header_link = document.createElement('a');
    overlay_header_link.href = "javascript:player_fermer();";
    overlay_header_link.appendChild(overlay_header_img);
    var overlay_header = document.createElement('div');
    overlay_header.id = "overlay_header";
    overlay_header.appendChild(overlay_header_link);


    document.body.appendChild(overlay);

    overlay_player.appendChild(iframe);
    content_player.appendChild(overlay_header);
    content_player.appendChild(overlay_player);
    document.body.appendChild(content_player);
    isPlayerInit = true;
    //DIV_InitScroll();
}

function getPageScroll() {

    var yScroll;

    if (self.pageYOffset) {
        yScroll = self.pageYOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) {	 // Explorer 6 Strict
        yScroll = document.documentElement.scrollTop;
    } else if (document.body) {// all other Explorers
        yScroll = document.body.scrollTop;
    }

    arrayPageScroll = new Array('', yScroll)
    return arrayPageScroll;
}


function getPageSize() {

    var xScroll, yScroll;

    if (window.innerHeight && window.scrollMaxY) {
        xScroll = document.body.scrollWidth;
        yScroll = window.innerHeight + window.scrollMaxY;
    } else if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac
        xScroll = document.body.scrollWidth;
        yScroll = document.body.scrollHeight;
    } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
        xScroll = document.body.offsetWidth;
        yScroll = document.body.offsetHeight;
    }

    var windowWidth, windowHeight;
    if (self.innerHeight) {	// all except Explorer
        windowWidth = self.innerWidth;
        windowHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
        windowWidth = document.documentElement.clientWidth;
        windowHeight = document.documentElement.clientHeight;
    } else if (document.body) { // other Explorers
        windowWidth = document.body.clientWidth;
        windowHeight = document.body.clientHeight;
    }

    // for small pages with total height less then height of the viewport
    if (yScroll < windowHeight) {
        pageHeight = windowHeight;
    } else {
        pageHeight = yScroll;
    }

    // for small pages with total width less then width of the viewport
    if (xScroll < windowWidth) {
        pageWidth = windowWidth;
    } else {
        pageWidth = xScroll;
    }

    arrayPageSize = new Array(pageWidth, pageHeight, windowWidth, windowHeight)
    return arrayPageSize;
}


