const txt = "Wake up, Neo...                                                  |--REDACTED-- has you...                                                  |Knock, knock, Neo...";
const speed = 80;
let i = 0;
function matrix() {
   
   if (i < txt.length) {
     if (txt.charAt(i) != "|") {
     document.getElementById("myPara").innerHTML += txt.charAt(i);
     i++;
     setTimeout(matrix, speed);
     }
     else {
     document.getElementById("myPara").innerHTML += "<br />";
     i++;
     setTimeout(matrix, speed);
     
     }
  }
}

window.onload = matrix;