function getXMLHttpRequest() {
    var xhr = null;

    if (window.XMLHttpRequest || window.ActiveXObject) {
        if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        } else {
            xhr = new XMLHttpRequest();
        }
    } else {
        alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
        return null;
    }

    return xhr;
}


function incStat(url, type) {

    try {
        var xhr = getXMLHttpRequest();

        var urlComplete = url + "?typeStat=" + type;

        xhr.open("GET", urlComplete, true);
        xhr.send(null);
    }
    catch (e) {
    }
}

function incStatAvecRedirection(url, type, urlDestination) {
    try {
        var xhr = getXMLHttpRequest();

        var urlComplete = url + "?typeStat=" + type;

        xhr.open("GET", urlComplete, true);
        xhr.send(null);

        document.location.href = urlDestination;
    }
    catch (e) {
    }
    
    
}