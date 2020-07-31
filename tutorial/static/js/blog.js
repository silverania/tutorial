var borderPost="1px solid orange";
var borderResponse="2px solid blue";
var id=id
var el
var padre
var user
var loginis=false
var bbutton=document.createElement("Button");
var divFormChild=document.createElement("DIV");
var bH5=document.createElement("h5")
var post=new Object();
var empty;
var bSection=document.createElement("SECTION");
var bSpan=document.createElement("SPAN");
var bSpanChild=document.createElement("SPAN");
var bdiv=document.createElement("DIV");
var bIcon=document.createElement("I");
var bForm=document.createElement("FORM");

function createSectionDivSpan(parent){

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
  bbutton.setAttribute("class","btn btn-block btn-lg btn-outline-info")
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

// la classe che astrae il post
class Post{
  constructor(){
    this.sent=false
  }
  sendToServer(type,msg,user){
      if(type=="post"){
      el=document.getElementById("post_response");
      }
      else if (type=="resp"){
        el=document.getElementsByClassName("post_response");
      }
      if(!msg=="") {
        let messaggio=msg;
        alert("read msg="+messaggio)

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
      return 0
    }
}


class postArea {
  constructor(post){
    this.type=post
    this.postarea=document.createElement("TEXTAREA");
    this.empty=true
    this.disabled=false
    this.msg=""
  }
   createButton(){
     if(this.type=="resp"){
       alert("resp")
       var bbutton2=document.createElement("Button");
       bbutton2.setAttribute("type","button")
       bbutton2.setAttribute("id","button_resp")
       bbutton2.setAttribute("class","button_resp btn btn-block btn-lg btn-outline-info")
       bbutton2.textContent="Rispondi Ad"+loginis
       divFormChild.appendChild(bbutton2)
     }
   }
   create(){
     if(this.type=="post"){
       this.postarea.setAttribute("id","post_response")
      }
    else{
      this.postarea.setAttribute("class","post_response")
    }
     this.postarea.setAttribute("rows","2");
     this.postarea.setAttribute("name","messaggio")
     $(this.postarea).css("border", borderPost)
     this.postarea.setAttribute("title","devi essere autenticato per usare la chat !")
     $(this.postarea).animate({'width':'100%'},2000);
     return this.postarea;
  }

  disable(){
    this.disabled=true
    this.postarea.setAttribute('disabled','true')

  }
  }


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


/*function setPostarea()*/


/* make textarea for comments */


/* EVENT SECTION */
$(bbutton).click(function(){
  if (!(post instanceof postArea ))
  {
    post=new postArea("post") // passo post come argomento
    mess=new Post()
    $(divFormChild).prepend(post.create())
  }
  else if (post instanceof postArea ) {
    let result
    alert("istance")
    if (post.postarea.value==''){
      alert("empty msg")
    }
    else {
      /* la modifica della textarea e l' animazione non deve partire se la textarea e disabled ! */
      /* sotto , gestione evento di invio post */
      if(!(post.disabled==true)){
        alert("active enabled"+post.disabled)
        post.msg=post.postarea.value
        $('#post_response').css("border", "3px solid blue")
        bH5.textContent=loginis+" , ha scritto ...  "
        $('#multiarea').prepend(bH5)
        bbutton.textContent="Rispondi a ..."+loginis
      /* mando xml asincrono al server . congelo la textarea in quanto è stata usata */
        post.disable()
      if ((result=mess.sendToServer("resp",post.postarea.value,loginis)==0)) {
      mess.sent=true
      }
      alert("result="+mess.sent)
    }
    else {
      if (!(post.postarea.value=="") && mess.sent==true) {
      alert("creo text per rispondere")
        //post.postarea.setAttribute('type','submit'); // cosicchè parta la request al server
      //divFormChild.appendChild(new postArea().create())
      post2=new postArea("resp")
      bbutton.parentNode.insertBefore(post2.create(),bbutton.nextSibiling);
      post2.createButton()
    }
  }
  }
  }

}
);
