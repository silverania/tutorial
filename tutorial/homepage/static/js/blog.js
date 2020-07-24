var borderPost="1px solid orange";
var borderResponse="2px solid blue";
var id=id
var el
var padre
var user
var loginis=false
var bbutton=document.createElement("Button");
var area=document.createElement("TEXTAREA");
var divFormChild=document.createElement("DIV");
var bH5=document.createElement("h5")
var post;


function createSectionDivSpan(parent){
  var bSection=document.createElement("SECTION");
  var bSpan=document.createElement("SPAN");
  var bSpanChild=document.createElement("SPAN");
  var bdiv=document.createElement("DIV");
  var bIcon=document.createElement("I");
  var bForm=document.createElement("FORM");
  bH5.setAttribute("class","text-left");
  bForm.setAttribute("action","post/getpost");
  divFormChild.setAttribute("id","multiarea");
  divFormChild.setAttribute("class","form-group");
  bIcon.setAttribute("class","fas fa-comments");
  bdiv.setAttribute("id","blog_title");
  bSection.setAttribute("id","blog");
  bSpan.setAttribute("id","s_blog_icon")
  bSpan.setAttribute("class","badge badge-info badge-outlined-info")
  bSpanChild.setAttribute("id","s_blog_text")
  bbutton.setAttribute("id","button_post")
  bbutton.setAttribute("type","button")
  bbutton.setAttribute("class","btn btn-block btn-outline-info")
  bbutton.textContent="Commenta"
  document.getElementById(parent).appendChild(bSection);
  bSection.appendChild(bdiv)
  bdiv.appendChild(bSpan)
  bSpan.appendChild(bIcon)
  bSpan.appendChild(bSpanChild)
  bSection.appendChild(bForm)
  bForm.appendChild(divFormChild)
  divFormChild.appendChild(bbutton)
}


class postArea {
   create(){
   area.setAttribute("id","post_response")
   area.setAttribute("rows","2");
   area.setAttribute("name","messaggio")
   $(area).css("border", borderPost)
   area.setAttribute("title","devi essere autenticato per usare la chat !")
   $(area).animate({'width':'100%'},2000);
   return area;
  }
}

class respArea {
   create(){
    var area=document.createElement("TEXTAREA");
   area.setAttribute("id","post_response")
   area.setAttribute("rows","2");
   area.setAttribute("name","messaggio")
   $(area).css("border", borderResponse)
   area.setAttribute("title","devi essere autenticato per usare la chat !")
   $(area).animate({'width':'100%'},2000);
   return area;
  }
}



/*class responseArea {
   create(){
    var area=document.createElement("TEXTAREA");
    area.setAttribute("id","post_response")
    area.setAttribute("rows","2");
    area.setAttribute("name","messaggio")
    $(area).css("border", border)
    area.setAttribute("title","devi essere autenticato per usare la chat !")
    $(area).animate({'width':'100%'},2000);
    return area;
  }
}*/


/*function buttonCommentActionSelect(id,login){
  let title=document.getElementsByClassName("blog_title");
  padre=document.getElementById(id);
  // controllo che non sia stata gia creata la textarea per evitare di sovrapporne piu di una
  if (!(typeof(a)=="object"))
  {
    a=new postArea();
    area=a.create(id)
    padre.prepend(area);
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
}*/


/*function disableButtonComment(element){
  element.disabled=true;
}


function enableButtonComment(element){
  element.disabled=false;
}*/


function initBlogSGang(id,login){
    if(login=="False"||login=="false"||login=="none"){
      login="Commento Anonimo"
    }
    else{
      loginis=login
    }
    idis=id;
    //let i=buttonCommentActionSelect(id,login);
  //  enableButtonComment()
    //var figlio=document.getElementById(id);
    createSectionDivSpan(idis);
}

/* make textarea for comments */


/* EVENT SECTION */
$(bbutton).click(function(){
  if (!(post instanceof postArea ))
  {
    post=new postArea()
    $(divFormChild).prepend(post.create())
  }
  else{
    /*alert("textarea gia creata !")
    resp=new respArea()
    $('#multiarea').prepend(resp.create())
    bH5.textContent=loginis+" , ha scritto ...  "
      $('#multiarea').prepend(bH5)*/
      $('#post_response').animate({"width":"10%"},200)
      $('#post_response').animate({"width":"100%"},200)
       $('#post_response').css("border", "3px solid blue")
       bH5.textContent=loginis+" , ha scritto ...  "
         $('#multiarea').prepend(bH5)
         bbutton.textContent="Rispondi a ..."+loginis
  }
return area
});
