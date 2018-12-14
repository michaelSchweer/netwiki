var antalPosts = 0;

function getJSON(emne) {
    var minReq = new XMLHttpRequest();
    minReq.onload = function() {
        var minStreng = this.responseText;
        var minTrimmedeStreng = jQuery.trim(minStreng);
        var minSplittedeTrimmedeStreng = minTrimmedeStreng.split("\r\n").reverse();
        antalPosts = minSplittedeTrimmedeStreng.length;
        if (!minSplittedeTrimmedeStreng[0].length) {return;}

        for (i=0; i<minSplittedeTrimmedeStreng.length; i++) {
            let udenKlammer = new Array;
            udenKlammer.push(minSplittedeTrimmedeStreng[i].slice(1,-1));
            parsePost(udenKlammer, i, emne);
        }
    };
    minReq.open("GET", "custom/backend.php?side=" + emne, true);
    minReq.send();
}

function parsePost(post, i, emne) {
    var indholdsStreng = JSON.stringify(post);
    var beskidtStreng = indholdsStreng.replace(/\\\\\\/g, "");
    var renereStreng = beskidtStreng.replace(/\\\\r\\\\n/g, "<br />");
    var renesteStreng = renereStreng.replace(/\\\\\//g, "/");

    var indhold = renesteStreng.split('\\\",\\\"');

    var indholdTitel = indhold[0].substring(4);
    var indholdDato = indhold[1];
    var indholdForfatter = indhold[2];
    var indholdBegrundelse = indhold[3].slice(0,-4);

    var indholdBegrundelseMedUrls = urlLinker(indholdBegrundelse);
    var htmlSletPostKnap = "<button class=\"sletknap\" onclick=\"sletPost('" + emne + "'," + i + ")\">SLET</button>";

    var htmlTitel = "<span class=\"titel\" onclick=\"toggleBegrundelse(" + i + ")\">" + indholdTitel + "</span><br />";
    var htmlForfatter = "<span class=\"forfatter\">" + indholdDato + " af <strong>" + indholdForfatter + "</strong></span><br />";
    var htmlBegrundelse = "<span class=\"begrundelse\">" + indholdBegrundelseMedUrls + "<br />" + htmlSletPostKnap + "</span><br />";

    var htmlAlt = htmlTitel + htmlForfatter + htmlBegrundelse;

    var minDiv = document.createElement("div");
    minDiv.setAttribute("id", "output" + i);
    minDiv.setAttribute("class", "output");
    
    document.getElementById("output").appendChild(minDiv);
    document.getElementById("output" + i).innerHTML = htmlAlt;
}

function toggleBegrundelse(i) {
    mitElement = "#output" + i + " .begrundelse";
    if (jQuery(mitElement).css('display') == 'none') {
        jQuery(mitElement).slideDown(400);
    } else {
        jQuery(mitElement).slideUp(400);
    }
}

function urlLinker(begrundelse) {
    var urlRegex = /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?)/gi;
    var begrundelseMedUrls = begrundelse.replace(urlRegex, "<a class='posturl' href='$1' target='_blank'>$1</a>");
    return begrundelseMedUrls;
}

function sletPost(emne, i) {
    if (confirm('Er du sikker?')) {
    sletteLinie = antalPosts - 1 - i;
    jQuery.post('custom/delete.php', { emne: emne, indeks: sletteLinie })
    location.reload();
    } 
    
}