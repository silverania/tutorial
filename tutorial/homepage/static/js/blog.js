const MAX_TEXTAREA_NUMBER=21
const BASE_PHOTO_DIR="/media/"
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
var divBlogReg=document.createElement("DIV");
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
  divCommentIcon.setAttribute("id","div_comment_icon")
  divRespTitle.setAttribute("class","div_resp")
  //divEmpty.setAttribute("style","width:20%;display:inline-block;")
  divFormChild.setAttribute("id","multiarea");
  //divFormChild.setAttribute("class","form-group");
  divExitLogin.setAttribute("id","d_blog_reg")
  divExitLogin.setAttribute("style","width:45%;display:inline-block")
  bIcon.setAttribute('src',"../../../static/images/blog_comment.png")
  bIcon.setAttribute("WIDTH","50px")
  bIcon.setAttribute("style","display:block;margin:0 auto;")
  bIcon.setAttribute("id","blog_icon")
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
  divBlogReg.setAttribute("id","div_blog_reg")
  bbutton.textContent="Commenta"
  spanBlogReg.textContent="Registrati"
  spanBlogEntra.textContent="Entra"

  spanBlogEsci.textContent="Esci"
  ulBlogReg.setAttribute("id","ul_blog")
  ulBlogReg.setAttribute("style","list-style: none;padding: 0;margin: 0;")
  document.getElementById(parent).appendChild(bSection);
  if(loginis=="MisterX"){
    console.log(loginis)
    aBlogReg.appendChild(spanBlogReg)
    liBlogReg.appendChild(aBlogReg)
    aBlogEntra.appendChild(spanBlogEntra)
    liBlogEntra.appendChild(aBlogEntra)
    ulBlogReg.appendChild(liBlogReg)
    ulBlogReg.appendChild(liBlogEntra)
    divExitLogin.appendChild(ulBlogReg)
    //bSection.appendChild(divExitLogin)
  }
  else {
    aBlogEsci.appendChild(spanBlogEsci)
    aBlogEsci.setAttribute("style","display:block;width:auto;text-align:right")
    liBlogEsci.appendChild(aBlogEsci)
    ulBlogReg.appendChild(liBlogEsci)
    divExitLogin.appendChild(ulBlogReg)
    bSection.appendChild(divBlogReg)
  }
  //bH5.appendChild(spanUserName)
  bSection.appendChild(bdiv)
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
  id=id+1
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
  spanUserName.textContent=" | "+post.publish
  divBlog.setAttribute("id","divblog_"+id.toString())
  divUserBlog.appendChild(tagUserImg)
  bH5.textContent=datePostResp
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
    divUserBlog.setAttribute("style","width:45%;height:auto;display:inline-block;position:absolute;top:0%;left:0%;margin-bottom:20px;")
    console.log("is resp ")
    post.postarea.insertAdjacentElement("beforebegin",divBlog)
    //$(post).insertBefore(mainElement,$(post).childNodes[0])
  }
  else {
    if(!(thispost.disabled==true)){
      divBlog.setAttribute("style","width:100%;height:auto;display:inline-block;position:relative;top:-20px;left:0")
      divUserBlog.setAttribute("style","width:45%;height:auto;display:inline-block;position:absolute;top:-20px;left:0%;")
      divCommentIcon.setAttribute("style","position:absolute;width:10%;left:45%;display:inline;margin:-40px auto;")
      divBlog.appendChild(divCommentIcon)
      console.log("thispost.disabled")
      $(bSection).prepend(divBlog)
      $('#post_response').css("border", "1px solid grey")
      bbutton.textContent="Rispondi"
      /* mando xml asincrono al server . congelo la textarea in quanto è stata usata */
      thispost.disable()
      idWherePutElement=divBlog.id
      console.log(idWherePutElement)
    }
  }
  return idWherePutElement
}

class Resp{
  constructor(author,body,post){
    this.sent=false
    this.author=author
    this.post=post
    this.body=body
  }
}

class Post{
  constructor(type="none",author="anonimo",title){
    this.sent=false
    this.type=type
    this.author=author
    this.title=title
    this.risposte=[]
    this.publish=""
  }
  getTitle(){
    return this.title
  }
  disable(){
    this.disabled=true
  }
  sendToServer(post="null",tutorial,user,postTitle){
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
          'messaggio': post.msg,'type':post.type,'tutorial':tutorial,'username':user,'title': postTitle,
        },

        dataType: 'json',
        success: function (data) {
          var userPhoto=data.photo
          alert("data aggiornato from ajax"+data.aggiornato)
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
  constructor(postType,bod){
    this.postarea=document.createElement("TEXTAREA");
    this.postarea.value=bod.body
    if (postType=="resp"){
      this.postarea.setAttribute("id","resp_"+loginis+"_"+id)
      console.log("textarea di resposta")
    }
    else { postType=="post" }
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
            if(!post2.msg==''){
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
    }
  );

}
disableButton(button){
  button.setAttribute("disabled","true")
}
create(){
//if (mess.getTitle()==false){
  //  if(this.type=="post" ){
      $(this.postarea).animate({'width':'100%'},1000);
    //}
    //else {
      //this.postarea.setAttribute("class","post_response")
      //$(this.postarea).animate({'width':'70%'},1000);
    //}
    this.postarea.setAttribute("rows","2");
    this.postarea.setAttribute("name","messaggio")
    $(this.postarea).css("border", borderPost)
    this.postarea.setAttribute("title","Autenticarsi NON è Obbligatorio !")
    return this.postarea;
  }
//}
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


/* Primo funzione eseguita nel flusso di codice , ...... l' entrypoint.... */
$(bbutton).click(function(){
  let result
  // caso del primo click su comment , in cui la textarea non è visibile e quindi anche = empty
  if (!(post instanceof postArea ))
  {
    post=new postArea("post") // passo post come argomento
    mess=new Post("post",loginis,makeModalWindow())
    $(divFormChild).prepend(post.create())
    $('#multiarea').prepend(divCommentIcon)
  }
  // caso click su textarea esistente
  else if (post instanceof postArea ) {
    if (post.postarea.value=='' || post.postarea.value.trim().length < 1){
      alert("il silenzio in questi casi vuol dir poco !")
    }
    // caso click su textarea esistente e con testo all interno
    else {
      /* la modifica della textarea e l' animazione non deve partire se la textarea e disabled ! */
      if(!(post.disabled==true)){
        post.msg=post.postarea.value
        $('#post_response').css("border", "1px solid grey")
        alert("Post.title="+postTitle)
        if ((result=mess.sendToServer(post,tutorial,loginis,postTitle)==0)) {
          mess.sent=true
        }
      }
      else {
        if (!(post.postarea.value=="") && mess.sent==true) {
          makeTextAreaResp()
          this.setAttribute("disabled","true")
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

/* MODAL WINDOW */

function makeModalWindow(){
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
      //postTitle=textAreaInDivInMain.value
      return textAreaInDivInMain.value ;
    }
    catch(Error){
      console.log("qualcosa è andato storto nel recupero del titolo")
    }
  }
  $('#but_confirm_title').click(function() {
    modal.style.display = "none";
  });
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

}

/* END MODAL  */
function cleanJson(json){
  this.data=json.toString()
  s = this.data.replace(/\\n/g, "\\n")
  .replace(/\\'/g, "\\'")
  .replace(/\\"/g, '\\"')
  .replace(/\\&/g, "\\&")
  .replace(/\\r/g, "\\r")
  .replace(/\\t/g, "\\t")
  .replace(/\\b/g, "\\b")
  .replace(/\\f/g, "\\f")
  // remove non-printable and other non-valid JSON chars
  .replace(/[\u0000-\u0019]+/g,"");
  return s
}

$(document).ready(function(){
  let mess=[],resp=[]
  let post = new Array()
  bForm.setAttribute("action","post/showposts");
  $.ajax({
    url: '/post/showposts',
    data: {
      'loginis': loginis,'tutorial':tutorial,
    },
    dataType: 'json',
    success: function (data) {
      let i=0,y=0,z=0
      s = cleanJson(data)
      var obj = JSON.parse(s);
      //alert("from ajax dat.post.msg,user,data"+obj.data_l5+obj.tu_serialized+"SSSSS===")
      var obj2 = JSON.parse(obj.data_l5);
      var obj3 = JSON.parse(obj.data_l6);
      var obj4 = JSON.parse(obj.data_l7);
      console.log(obj.data_l5)
      console.log(obj.data_l6)
      console.log(obj.data_l7)
      //console.log(obj.data_l5)
      for (i=0;i<=obj2.length-1;i=i+1){
        mess.push(new Post("post",obj2[i].fields.authorname,obj2[i].fields.title))
        mess[i].body=obj2[i].fields.body
        mess[i].type="post"
        mess[i].publish=obj2[i].fields.publish
        for (z=0;z<=obj4.length-1;z=z+1){
          if(obj4[z].fields.user==obj2[i].fields.author){
              mess[i].photo=BASE_PHOTO_DIR+obj4[z].fields.photo
              if(!(mess[i].getTitle()==""&& !(mess[i].getTitle()))){
              idParent=makeHeadBlog(mess[i].type,mess[i].photo,mess[i],obj2[i].fields.authorname)
            }
          }
        }
        post[i,0]=new postArea("post",mess[i]) // passo post come argomento
        alert(mess[i].body)
        $('#'+idParent).prepend(post[i,0].create())
        for (y=0;y<=obj3.length-1;y=y+1){
          if(obj2[i].pk.toString()==obj3[y].fields.commento.toString()){
            resp.push(new Resp(obj3[y].fields.authorname,obj3[y].fields.body,mess[i]))
            resp[y].body=obj3[y].fields.body
            //post[i,y]=new postArea("resp",resp[y]).create() // passo post come argomento
            console.log(mess[i].body+"|"+"|risposta:"+resp[y].body)
          }
        }
      }
      //const obj2 = JSON.parse(s);
      //alert(s)
      //console.log(obj.count);
      // expected output: 42

    }
  });

});
$("#post_response").change(function(){
  alert("textarea di risposta....evento change in corso .............")
});
