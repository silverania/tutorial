border="4px solid orange"
class textArea {
  constructor(){
  }
   create(){
    var area=document.createElement("TEXTAREA");
    area.setAttribute("id","post_comment")
    area.setAttribute("rows","2");
    area.setAttribute("name","messaggio")
    $(area).css("border", border)
    area.setAttribute("title","devi essere autenticato per usare la chat !")
    return area;
  }
}
function buttonCommentActionSelect(id){
  let title=document.getElementsByClassName("blog_title");
  padre=document.getElementById("multiarea");
  // controllo che non sia stata gia creata la textarea per evitare di sovrapporne piu di una
  if (!(typeof(a)=="object"))
  {
    a=new textArea();
    area=a.create(id)
    padre.prepend(area);
    $(area).animate({'width':'100%'},2000);

    return 0;
  }
  // se la textarea esiste e il campo testo non è vuoto : sparo la request xmlhhtprequest al server per i dialoghi asincroni con esso
  else {
    el=document.getElementById(id);
    if(!(area.value=="")) {
      messaggio=area.value;
      console.log("area="+area.value)
    el.setAttribute("type","submit"); // cosicchè parta la request al server
    // AJAX .....il pulito a casa mia
    $.ajax({
      url: '/post/getpost',
      data: {
        'messaggio': messaggio
      },
      dataType: 'json',
      success: function (data) {
        if (messaggio) {
          alert("json is here !");
        }
      }
    });
    console.log("ajax call finished");
    }
    return 1
  }
}
function disableButtonComment(element){
  element.disabled=true;
}

function enableButtonComment(element){
  element.disabled=false;
  //alert('enabled')
}

function writeMsg(id,login){


    let i=buttonCommentActionSelect(id);
    //alert("i="+i+"typeof="+typeof(a))
    enableButtonComment(id)
    var figlio=document.getElementById(id);
    //figlio.setAttribute("click","")
    var id=id;
    var el;
    var padre;
    var area;

}
