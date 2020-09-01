var borderPost="1px solid orange";
var borderResponse="1px solid grey";
var id=id
var el
var padre
var user
var loginis
var photo
var lastUpdate
var bbutton=document.createElement("Button");
//var bUserImg=document.createElement("IMG");
var divFormChild=document.createElement("DIV");
var bdiv=document.createElement("DIV");
var divUserBlog=document.createElement("DIV");
var divCommentIcon=document.createElement("DIV");
var divRespTitle=document.createElement("DIV");
var divExitLogin=document.createElement("DIV");
var divEmpty=document.createElement("DIV");
//var divBlogReg=document.createElement("DIV");
var ulBlogReg=document.createElement("UL");
var liBlogReg=document.createElement("LI");
var aBlogReg=document.createElement("A");
var spanBlogReg=document.createElement("SPAN");
var liBlogEntra=document.createElement("LI");
var aBlogEntra=document.createElement("A");
var spanBlogEntra=document.createElement("SPAN");
var liBlogEsci=document.createElement("LI");
var aBlogEsci=document.createElement("A");
var spanBlogEsci=document.createElement("SPAN");
var bH5=document.createElement("span")
var spanUserName=document.createElement("SPAN");
var post,post2=new Object();
var empty;
var bSection=document.createElement("SECTION");
var bSpan=document.createElement("SPAN");
var bSpanChild=document.createElement("SPAN");

var bIcon=document.createElement("IMG");
var bForm=document.createElement("FORM");
var wait=true
var postTitle
var tutorial
var bbutton2=document.createElement("Button");


function createSectionDivSpan(parent){
  bForm.setAttribute("action","post/getpost");
  //bUserImg.setAttribute("WIDTH","43px")
  //bUserImg.setAttribute("style","border-radius:50%")
  //bUserImg.setAttribute("id","img_user")
  divUserBlog.setAttribute("style","width:45%;display:inline-block;")
  divExitLogin.setAttribute("style","width:45%;display:inline-block;")
  divCommentIcon.setAttribute("style","width:10%;display:inline-block;")
  divRespTitle.setAttribute("class","div_resp")
  //divEmpty.setAttribute("style","width:20%;display:inline-block;")
  divFormChild.setAttribute("id","multiarea");
  //divFormChild.setAttribute("class","form-group");
  divExitLogin.setAttribute("id","d_blog_reg")
  divExitLogin.setAttribute("style","width:45%;display:inline-block")
  bIcon.setAttribute('src',"../../../static/images/blog_comment.png")
  bIcon.setAttribute("WIDTH","50px")
  bIcon.setAttribute("style","display:block;margin:0 auto;")

  bSection.setAttribute("id","blog");
  bSpan.setAttribute("id","s_blog_icon")
  aBlogEntra.setAttribute("style","display:block;width:auto;text-align:right;")
  aBlogReg.setAttribute("style","display:block;width:auto;text-align:right;")
  aBlogReg.setAttribute("href","user/register")
  aBlogEntra.setAttribute("href","user/login")
  aBlogEsci.setAttribute("href","user/logout")
  liBlogEntra.setAttribute("style","display:inline;width:auto;margin-right:0px;")
  bSpanChild.setAttribute("id","s_blog_text")
  bbutton.setAttribute("id","button_post")
  bH5.setAttribute("id","span_blog_entra")
  bbutton.setAttribute("type","button")
  bbutton.setAttribute("class","mybut mybut-outline-info ")
  spanBlogEntra.setAttribute("id","span_entra")
  spanBlogReg.setAttribute("id","span_reg")
  bbutton.textContent="Commenta"
  spanBlogReg.textContent="Registrati"
  spanBlogEntra.textContent="Entra"

  spanBlogEsci.textContent="Esci"
  ulBlogReg.setAttribute("id","ul_blog")
  ulBlogReg.setAttribute("style","list-style: none;padding: 0;margin: 0;")
  document.getElementById(parent).appendChild(bSection);
  if(loginis=="MisterX"){
    aBlogReg.appendChild(spanBlogReg)
    liBlogReg.appendChild(aBlogReg)
    aBlogEntra.appendChild(spanBlogEntra)
    liBlogEntra.appendChild(aBlogEntra)
    ulBlogReg.appendChild(liBlogReg)
    ulBlogReg.appendChild(liBlogEntra)
    divExitLogin.appendChild(ulBlogReg)
    //bSection.appendChild(divBlogReg)
  }
  else {
    aBlogEsci.appendChild(spanBlogEsci)
    aBlogEsci.setAttribute("style","display:block;width:auto;text-align:right")
    liBlogEsci.appendChild(aBlogEsci)
    ulBlogReg.appendChild(liBlogEsci)
    divExitLogin.appendChild(ulBlogReg)
    //bSection.appendChild(divBlogReg)
  }
  bH5.appendChild(spanUserName)
  bSection.appendChild(bdiv)
  bdiv.appendChild(divUserBlog)
  bdiv.appendChild(divCommentIcon)
  bdiv.appendChild(divExitLogin)
  divCommentIcon.appendChild(bIcon)
  divUserBlog.appendChild(bSpan)
  bSpan.appendChild(bSpanChild)
  bSection.appendChild(bForm)
  bForm.appendChild(divFormChild)
  divFormChild.appendChild(bbutton)
}

function makeHeadBlog(tagUserImg,divAfterMainSection,userPhoto,post,datePostResp){

  divAfterMainSection.setAttribute("id","blog_title");
  divAfterMainSection.setAttribute("style","width:100%");

  tagUserImg.setAttribute("WIDTH","43px")
  tagUserImg.setAttribute("style","border-radius:50%")
  tagUserImg.setAttribute("id","img_user")
  this.photo=userPhoto
  tagUserImg.setAttribute("src",this.photo)
  spanUserName.textContent=" | "+datePostResp
  if(!(post.disabled==true)){
    $('#post_response').css("border", "1px solid grey")
    divUserBlog.prepend(tagUserImg)
    bbutton.textContent="Rispondi a ..."+loginis
    /* mando xml asincrono al server . congelo la textarea in quanto è stata usata */
    post.disable()
  }
}

class Post{
  constructor(type){
    this.sent=false
    this.type=type
  }
  sendToServer(post="null",tutorial,user){
    if(post.type=="post"){
      el=document.getElementById("post_response");
    }
    else if (post.type=="resp"){
      el=document.getElementsByClassName("post_response");
    }
    if(!post.msg=="") {

      if(!tutorial=="") {
        let content=tutorial;
        // AJAX .....il pulito a casa mia
        $.ajax({
          url: '/post/getpost',
          data: {
            'messaggio': post.msg,'type':post.type,'tutorial':tutorial,'username':user
          },
          onComplete:function(){
              alert("oncomplete happen")
          },
          dataType: 'json',
          success: function (data) {
          var bUserImg=document.createElement("IMG");
          var bdiv=document.createElement("DIV");
          var userPhoto=data.photo
          makeHeadBlog(bUserImg,bdiv,data.photo,post,userPhoto,data.aggiornato)
          }
          });
          console.log("ajax call finished");

        }
        return 0
      }
    }
  }



  class postArea {
    constructor(post){
      this.postarea=document.createElement("TEXTAREA");
      if(post=="post"){
        this.title = makeModalWindow(this);
        if (postTitle != null) {
          parent.innerHTML =
          "Ok hai inserito :" + postTitle + "Non dire cazzate!";
          return postTitle
        }
      }
      else if (post=="resp"){
      console.log("textarea di resposta")
      }
      this.type=post
      this.empty=true
      this.disabled=false
      this.msg=""
      Post.title=this.title
    }
    createButton(){
      if(this.type=="resp"){
        bbutton2.setAttribute("type","button")
        bbutton2.setAttribute("class","button_resp btn btn-block btn-sm btn-outline-info")
        bbutton2.textContent="Rispondi"
        //bbutton2.animate({'width':'80%'},1000);
        divFormChild.appendChild(bbutton2)
      }
    }
    create(){
      if(this.type=="post"){
        this.postarea.setAttribute("id","post_response")
        $(this.postarea).animate({'width':'100%'},1000);
      }
      else{
        this.postarea.setAttribute("class","post_response")
        $(this.postarea).animate({'width':'70%'},1000);
      }
      this.postarea.setAttribute("rows","2");
      this.postarea.setAttribute("name","messaggio")
      $(this.postarea).css("border", borderPost)
      this.postarea.setAttribute("title","Autenticarsi NON è Obbligatorio !")
      return this.postarea;
    }
    disable(){
      this.disabled=true
      this.postarea.setAttribute('disabled','true')
    }
  }



  function initBlogSGang(id,login,tut){
    if(login=="False"||login=="false"||login=="none"||login=="AnonymousUser"){
      loginis="MisterX"
    }
    else{
      loginis=login
    }
    idis=id;
    tutorial=tut
    createSectionDivSpan(idis);
  }

  /* EVENT SECTION */
  $(bbutton2).click(function(){
    if(post2 instanceof postArea){
        post2.msg=post2.postarea.value
        //post2.disable()
        mess=new Post("resp")
        alert("post2,mess"+post2.msg)
        if ((result=mess.sendToServer(post2,tutorial,loginis)==0)) {
          alert("inviato messaggio rispost")
        }
    }
  });



  $(bbutton).click(function(){
    let result
    // caso del primo click su comment , in cui la textarea non è visibile e quindi anche = empty
    if (!(post instanceof postArea ))
    {
      post=new postArea("post") // passo post come argomento
      mess=new Post("post")
      $(divFormChild).prepend(post.create())
    }
    // caso click su textarea esistente
    else if (post instanceof postArea ) {
      if (post.postarea.value==''){
        alert("is empty")
      }
      // caso click su textarea esistente e con testo all interno
      else {
        /* la modifica della textarea e l' animazione non deve partire se la textarea e disabled ! */
        /* sotto , gestione evento di invio post */
        if(!(post.disabled==true)){
          post.msg=post.postarea.value
          $('#post_response').css("border", "1px solid grey")
          if ((result=mess.sendToServer(post,tutorial,loginis)==0)) {
            mess.sent=true

            bH5.textContent=loginis
            spanUserName.setAttribute("style","color:grey;display:inline;")
            bH5.setAttribute("style","margin-left:3%;color:blue;display:inline;")
            bH5.appendChild(spanUserName)
            divUserBlog.appendChild(bH5)
          }
        }
        else {
          if (!(post.postarea.value=="") && mess.sent==true) {
            //post.postarea.setAttribute('type','submit'); // cosicchè parta la request al server
            //divFormChild.appendChild(new postArea().create())
            if (wait==true){
              callResult=makeTextAreaResp()
              if(callResult==0){
                this.setAttribute("disabled","true")
              }
            }
          }
          function makeTextAreaResp(){
            post2=new postArea("resp")
            postresp=new Post("resp")
            bbutton.parentNode.insertBefore(post2.create(),bbutton.nextSibiling);
            post2.createButton()
            //bbutton.prepend(bUserImg)
            return 0
          }
        }
      }
    }
  }
);
/* MODAL WINDOW */
function makeModalWindow(post){
  var divModalMain=document.createElement("DIV");
  var divInMain=document.createElement("DIV");
  var textAreaInDivInMain=document.createElement("TEXTAREA");
  var modalConfirmButton=document.createElement("Button");
  modalConfirmButton.setAttribute('id','but_confirm_title')
  divModalMain.setAttribute('class','modal')
  divModalMain.setAttribute('id','myModal')
  divInMain.setAttribute('class','modal-content')
//  .setAttribute("class","close")

  textAreaInDivInMain.setAttribute("id","p_text")
  textAreaInDivInMain.setAttribute("rows","1")
  textAreaInDivInMain.textContent="Inserisci Un Titolo Per Il Tuo Post"
  divInMain.appendChild(textAreaInDivInMain)
  divInMain.appendChild(modalConfirmButton)
  divModalMain.appendChild(divInMain)
  body.appendChild(divModalMain)
  var modal = document.getElementById("myModal");
  modal.style.display = "block";

// When the user clicks on <span> (x), close the modal
$(but_confirm_title).click = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
}
/* END MODAL  */
$(bbutton).click(function(){
    $(bbutton).css("border","5px solid grey")
})
$(document).ready(function(){
  $("#post_response").change(function(){
    alert("textarea di risposta....evento change in corso .............")
  });
});
