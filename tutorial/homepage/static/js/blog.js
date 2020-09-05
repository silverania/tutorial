const MAX_TEXTAREA_NUMBER=21
var borderPost="1px solid orange";
var borderResponse="1px solid grey";
var id;
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
  var bbutton2=new Object();
var id=0

function createSectionDivSpan(parent){
  bForm.setAttribute("action","post/getpost");
  //bUserImg.setAttribute("WIDTH","43px")
  //bUserImg.setAttribute("style","border-radius:50%")
  //bUserImg.setAttribute("id","img_user")
  divUserBlog.setAttribute("style","width:45%;display:inline-block;")
  divExitLogin.setAttribute("style","width:45%;display:inline-block;")
  divCommentIcon.setAttribute("style","width:10%;display:inline;margin:0 auto;")
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
//  bH5.appendChild(spanUserName)
  //bSection.appendChild(bdiv)
  bdiv.appendChild(divUserBlog)
  bdiv.appendChild(divCommentIcon)
  bdiv.appendChild(divExitLogin)
  divCommentIcon.appendChild(bIcon)
  //divUserBlog.appendChild(bSpan)
  //bSpan.appendChild(bSpanChild)
  bSection.appendChild(bForm)
  bForm.appendChild(divFormChild)
  divFormChild.appendChild(divCommentIcon)
  divFormChild.appendChild(bbutton)
}

function makeHeadBlog(postType,userPhoto,post,datePostResp){
  thispost=post
  if(id<21){
    id=id+1
  }
  console.log("entry in makeHeadBlog......post="+thispost.msg)
  //divAfterMainSection.setAttribute("id","blog_title");
  //divAfterMainSection.setAttribute("style","width:100%");
  var divBlog=document.createElement("DIV");
  var divUserBlog=document.createElement("DIV");
  var spanUserName=document.createElement("SPAN");
  var bH5=document.createElement("span")
  var bSpan=document.createElement("SPAN");
  var bSpanChild=document.createElement("SPAN");
  var tagUserImg=document.createElement("IMG");
  //tagUserImg.setAttribute("src",userPhoto)
  tagUserImg.setAttribute("style","border-radius:50%")
  tagUserImg.setAttribute("src",userPhoto)
  spanUserName.textContent=" | "+datePostResp
  divBlog.setAttribute("id","divblog_"+id.toString())
  divUserBlog.appendChild(tagUserImg)
  bH5.textContent=loginis
  spanUserName.setAttribute("style","color:grey;display:inline;")
  bH5.setAttribute("style","margin-left:3%;color:blue;display:inline;")
  bH5.setAttribute("id","bh5_span"+id.toString())
  bH5.appendChild(spanUserName)
  divUserBlog.appendChild(bH5)
  divUserBlog.appendChild(bSpan)
  bSpan.appendChild(bSpanChild)
  divUserBlog.appendChild(bSpan)
  divBlog.appendChild(divUserBlog)

  bSpanChild.setAttribute("id","s_blog_text_"+id.toString())
  bSpan.setAttribute("id","s_blog_icon_"+id.toString())
  tagUserImg.setAttribute("id","img_user_"+id.toString())
  spanUserName.setAttribute("id","span_user_"+id.toString())
  divUserBlog.setAttribute("id","divuserblog_"+id.toString())
  if(postType=="resp"){
      divBlog.setAttribute("style","width:100%;height:auto;display:inline-block;position:relative;top:-0%;left:20%")
    divUserBlog.setAttribute("style","width:45%;height:auto;display:inline-block;position:absolute;top:0%;left:0%")
    console.log("is resp ")
      post.postarea.insertAdjacentElement("beforebegin",divBlog)
      //$(post).insertBefore(mainElement,$(post).childNodes[0])
  }
  else {
  if(!(thispost.disabled==true)){
    divBlog.setAttribute("style","width:100%;height:auto;display:inline-block;position:relative;top:-20px;left:0")
    divUserBlog.setAttribute("style","width:45%;height:auto;display:inline-block;position:absolute;top:-20px;left:0%")
    divCommentIcon.setAttribute("style","position:absolute;width:10%;left:45%;display:inline;margin:-40px auto;")
    divBlog.appendChild(divCommentIcon)
    console.log("thispost.disabled")
    $(bSection).prepend(divBlog)
    $('#post_response').css("border", "1px solid grey")
    bbutton.textContent="Rispondi a ..."+loginis
    /* mando xml asincrono al server . congelo la textarea in quanto è stata usata */
    thispost.disable()
  }
}
}

class Post{
  constructor(type,author){
    this.sent=false
    this.type=type
    this.author=author
  }
  sendToServer(post="null",tutorial,user){
    if(post.type=="post"){
      el=document.getElementById("post_response");
    }
    else if (post.type=="resp"){
      el=document.getElementsByClassName("post_response");
    }
      if(!tutorial=="" && (!post.msg=="")) {
        let content=tutorial;
        // AJAX .....il pulito a casa mia
        $.ajax({
          url: '/post/getpost',
          data: {
            'messaggio': post.msg,'type':post.type,'tutorial':tutorial,'username':user,'title': post.title
          },

          dataType: 'json',
          success: function (data) {
            var userPhoto=data.photo
              makeHeadBlog(data.type,data.photo,post,data.aggiornato)
        }
        }
      );
      console.log("ajax call finished");
    }
    return 0
  }
}




class postArea {
  constructor(post){
    this.postarea=document.createElement("TEXTAREA");
    alert(id)
    this.postarea.setAttribute("id","resp_"+loginis+"_"+id)
    if(post=="post"){
    postTitle=makeModalWindow(this);
      if (postTitle != null) {
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
  }
  createButton(button){
    if(this.type=="resp"){
      button.setAttribute("type","button")
      button.setAttribute("class","button_resp btn btn-block btn-sm btn-outline-info")
      button.textContent="Rispondi"
      bbutton2=button
      //bbutton2.animate({'width':'80%'},1000);
      divFormChild.appendChild(button)
    }
    $(bbutton2).click(function(){
      let result
      if(post2 instanceof postArea){
        post2.msg=post2.postarea.value
        //post2.disable()
        if(!(mess.type=="resp")){
          mess=new Post("resp",loginis)
          if(!mess.sent==true) {
          alert("sent,:"+mess.author)
        if ((result=mess.sendToServer(post2,tutorial,loginis)==0)) {
          mess.sent=true
          post2.disable()
          bbutton2.setAttribute("disabled","true")
          bbutton2.innerHTML="rispondimi"
        }
      }
        }
      }
    }
  );

  }
  disableButton(button){
    button.setAttribute("disabled","true")
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



$(bbutton).click(function(){
  let result
  // caso del primo click su comment , in cui la textarea non è visibile e quindi anche = empty
  if (!(post instanceof postArea ))
  {
    post=new postArea("post") // passo post come argomento
    mess=new Post("post")
    $(divFormChild).prepend(post.create())
    $('#multiarea').prepend(divCommentIcon)
  }
  // caso click su textarea esistente
  else if (post instanceof postArea ) {
    if (post.postarea.value==''){
      alert("is empty")
    }
    // caso click su textarea esistente e con testo all interno
    else {
      /* la modifica della textarea e l' animazione non deve partire se la textarea e disabled ! */
      if(!(post.disabled==true)){
        post.msg=post.postarea.value
        $('#post_response').css("border", "1px solid grey")
        if ((result=mess.sendToServer(post,tutorial,loginis,Post.title)==0)) {
          mess.sent=true

        }
      }
      else {
        if (!(post.postarea.value=="") && mess.sent==true) {
          makeTextAreaResp()
        }
        function makeTextAreaResp(){
          if(id < MAX_TEXTAREA_NUMBER){
            var bbut2=document.createElement("Button");
            bbutton2=bbut2
            id=id+1
            post2=new postArea("resp")
            postresp=new Post("resp")
            bbutton.parentNode.insertBefore(post2.create(),bbutton.nextSibiling);
            post2.createButton(bbutton2)
          }
          //bbutton.prepend(bUserImg)
          return 0
        }
      }
    }
  }
}
);
$('#but_confirm_title').click(function() {
  modal.style.display = "none";
});
/* MODAL WINDOW */
function makeModalWindow(post){
  var divModalMain=document.createElement("DIV");
  var divInMain=document.createElement("DIV");
  var textAreaInDivInMain=document.createElement("TEXTAREA");
  var modalConfirmButton=document.createElement("Button");
  modalConfirmButton.setAttribute('id','but_confirm_title')
  modalConfirmButton.setAttribute('type','button')
  divModalMain.setAttribute('class','modal')
  divModalMain.setAttribute('id','myModal')
  divInMain.setAttribute('class','modal-content')
  textAreaInDivInMain.setAttribute("id","p_text")
  textAreaInDivInMain.setAttribute("rows","1")
  textAreaInDivInMain.textContent="Inserisci Un Titolo Per Il Tuo Post"
  divInMain.appendChild(textAreaInDivInMain)
  divInMain.appendChild(modalConfirmButton)
  divModalMain.appendChild(divInMain)
  body.appendChild(divModalMain)
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
  document.getElementById('but_confirm_title').onclick = function(event) {
    try{
      post.title=Post.title=textAreaInDivInMain.innerHTML
    }
    catch(Error){
      console.log("qualcosa è andato storto nel recupero del titolo")
    }
    modal.style.display = "none";
    return Post.title
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
