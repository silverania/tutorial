const MAX_TEXTAREA_NUMBER=21
const BASE_PHOTO_DIR="/media/"
var borderPost="none";
var borderResponse="1px solid grey";
var id;
var el
var padre
var user
var loginis
var lastUpdate
var bbutton=document.createElement("Button");
//var bUserImg=document.createElement("IMG");
var divFormChild=document.createElement("DIV");
var bdiv=document.createElement("DIV");
var divUserBlog=document.createElement("DIV");
var divCommentIcon=document.createElement("DIV");
var firstDivHead=document.createElement("DIV");
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
//var bH5=document.createElement("span")
//var spanUserName=document.createElement("SPAN");
var post,post2=new Object();
var empty;
var bSection=document.createElement("SECTION");
//var bSpan=document.createElement("SPAN");
//var bSpanChild=document.createElement("SPAN");
var bIcon=document.createElement("IMG");
var bForm=document.createElement("FORM");
var wait=true
var postTitle
var tutorial
var bbutton2=new Object();
var id=0

function createSectionDivSpan(parent){
  bForm.setAttribute("action","post/getpost");
  //divUserBlog.setAttribute("style","width:45%;display:inline-block;")
  firstDivHead.setAttribute("style","width:45%;display:inline;")
  firstDivHead.setAttribute("id","firstDivHead")
  divExitLogin.setAttribute("style","width:45%;display:inline;")
  divCommentIcon.setAttribute("style","position:relative;width:10%;display:inline;left:45%;")
  divCommentIcon.setAttribute("id","div_comment_icon")
  divRespTitle.setAttribute("class","div_resp")
  //divEmpty.setAttribute("style","width:20%;display:inline-block;")
  divFormChild.setAttribute("id","multiarea");
  //divFormChild.setAttribute("class","form-group");
  divExitLogin.setAttribute("id","d_blog_reg")
  divExitLogin.setAttribute("style","width:45%;display:inline-block")
  bdiv.setAttribute("id","bdiv")
  bIcon.setAttribute('src',"../../../static/images/blog_comment.gif")
  bIcon.setAttribute("WIDTH","50px")
  //bIcon.setAttribute("style","display:block;margin:0 auto;")
  bIcon.setAttribute("id","blog_icon")
  bSection.setAttribute("id","blog");
  bSection.setAttribute("style","width:100%");
  //bSpan.setAttribute("id","s_blog_icon")
  aBlogEntra.setAttribute("style","display:block;width:auto;text-align:right;")
  aBlogReg.setAttribute("style","display:block;width:auto;text-align:right;")
  aBlogReg.setAttribute("href","user/register")
  aBlogEntra.setAttribute("href","user/login")
  aBlogEsci.setAttribute("href","user/logout")
  liBlogEntra.setAttribute("style","display:inline;width:auto;margin-right:0px;")
  //bSpanChild.setAttribute("id","s_blog_text")
  bbutton.setAttribute("id","button_post")
  //bH5.setAttribute("id","span_blog_entra")
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
  bdiv.appendChild(firstDivHead)
  bdiv.appendChild(divCommentIcon)
  bdiv.appendChild(divExitLogin)
  divCommentIcon.appendChild(bIcon)
  //divUserBlog.appendChild(bSpan)
  //bSpan.appendChild(bSpanChild)
  bSection.appendChild(bForm)
  bForm.appendChild(divFormChild)
  $(parent).prepend(divCommentIcon)
  divFormChild.appendChild(bbutton)
}




class Resp{
  constructor(author,body,publish,post){
    this.sent=false
    this.author=author
    this.post=post
    this.body=body
    this.publish=publish
  }
}

class Post{
  constructor(type="none",author="anonimo",title1){
    this.sent=false
    this.type=type
    this.author=author  //post[i,y]=new postArea("resp",resp[y]).create() // passo post come argomento
            //console.log(mess[indexX].body+"|"+"|risposta:"+resp[indexX][indexY].body)
    this.titled=title1
    this.risposte=new Array()
    this.publish=""
  }
  getTitle(){
    return this.titled
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
  constructor(post,bod=""){
    this.postarea=document.createElement("TEXTAREA");
    this.postarea.value=bod
    this.postType=post.type
    if (this.postType=="resp"){
      this.postarea.setAttribute("id","resp_"+loginis+"_"+id)
      console.log("textarea di resposta")
    }
    else { post.type=="post" }
    this.empty=true
    this.disabled=false
    if (this.postarea.value==""){
      this.postarea.setAttribute("style","border:solid 2px orange;")
    }
  }
  makeHeadBlog(mess,userPhoto,post,datePostResp){
    id=id+1
    //divAfterMainSection.setAttribute("id","blog_title");
    //divAfterMainSection.setAttribute("style","width:100%");
    //var divBlog=document.createElement("DIV");
    var divPostTitle=document.createElement("DIV");
    var spanInDivPostTitle=document.createElement("SPAN")
    var divUserBlog=document.createElement("DIV");
    var spanUserName=document.createElement("SPAN");
    var bH5=document.createElement("span")
    //var bSpan=document.createElement("SPAN");
    //var bSpanChild=document.createElement("SPAN");
    var tagUserImg=document.createElement("IMG");
    tagUserImg.setAttribute("style","border-radius:50%")
    tagUserImg.setAttribute("src",userPhoto)
    spanUserName.textContent=" | "+mess.publish

    //divBlog.setAttribute("id","divblog_"+id.toString())
    divUserBlog.appendChild(tagUserImg)
    bH5.textContent=datePostResp
    spanUserName.setAttribute("style","color:grey;display:inline;")
    spanInDivPostTitle.setAttribute("style","color:grey;display:inline;")

    divPostTitle.appendChild(spanInDivPostTitle)
    bH5.setAttribute("style","margin-left:3%;color:blue;display:inline;")
    bH5.setAttribute("id","bh5_span"+id.toString())
    bH5.appendChild(spanUserName)
    divUserBlog.appendChild(bH5)
    divUserBlog.appendChild(divPostTitle)
    //divUserBlog.appendChild(bSpan)
    //bSpan.appendChild(bSpanChild)
    //divUserBlog.appendChild(bSpan)
    bdiv.appendChild(divUserBlog)
    //bSpanChild.setAttribute("id","s_blog_text_"+id.toString())
  //  bSpan.settextarea di respAttribute("id","s_blog_icon_"+id.toString())
    tagUserImg.setAttribute("id","img_user_"+id.toString())
    spanUserName.setAttribute("id","span_user_"+id.toString())
    divUserBlog.setAttribute("id","divuserblog_"+id.toString())
    if(mess instanceof Resp){
      alert("resp")
      spanInDivPostTitle.textContent=" | Risposta a :"+mess.post.titled
      //divBlog.setAttribute("style","width:100%;height:auto;display:inline-block;position:relative;top:-0%;left:20%")
      divUserBlog.setAttribute("style","margin-left:20%")
      console.log("is resp ")
    //  post.postarea.insertAdjacentElement("beforebegin",divBlog)
      //$(post).insertBefore(mainElement,$(post).childNodes[0])
    }
    else {
      if(!(post.disabled==true)){
        spanInDivPostTitle.textContent=" | "+mess.titled
        //divBlog.setAttribute("style","width:100%;height:auto;display:inline-block;position:relative;top:-20px;left:0")
        //divUserBlog.setAttribute("style","width:45%;height:auto;display:inline-block;position:absolute;top:-20px;left:0%;")
      //  divCommentIcon.setAttribute("style","position:absolute;width:10%;left:45%;display:inline;margin:-40px auto;")
        //divBlog.appendChild(divCommentIcon)
        console.log("thispost.disabled")
        //$(bSection).prepend(divBlog)
        $('#post_response').css("border", "1px solid grey")
        bbutton.textContent="Rispondi"
        /* mando xml asincrono al server . congelo la textarea in quanto è stata usata */
        //thispost.disable()
        var idWherePutElement="button_post"
        console.log(idWherePutElement)
      }
    }
    var objectToAppendChild="divuserblog_"+id.toString()
    var elementToAppendArea=document.getElementById(objectToAppendChild)
    //elementToAppendArea.insertAdjacentElement("beforebegin",post.create())
    elementToAppendArea.appendChild(post.create())
    return objectToAppendChild
  }
  //To append Postarea

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
    //$('#multiarea').prepend(divCommentIcon)
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
  var checkValidity=false
  modalConfirmButton.setAttribute('id','but_confirm_title')
  modalConfirmButton.setAttribute('type','button')
  divModalMain.setAttribute('class','modal')
  divModalMain.setAttribute('id','myModal')
  divInMain.setAttribute('class','modal-content')
  textAreaInDivInMain.setAttribute("id","p_text")
  textAreaInDivInMain.setAttribute("rows","1")
  textAreaInDivInMain.setAttribute("padding","0")
  textAreaInDivInMain.textContent="Titolo Post ?"
  divInMain.appendChild(textAreaInDivInMain)
  divInMain.appendChild(modalConfirmButton)
  divModalMain.appendChild(divInMain)
  body.appendChild(divModalMain)
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
  document.getElementById('but_confirm_title').onclick = function(event) {
    try{
      if (!(textAreaInDivInMain.value=="Titolo Post ?")){
        alert("it good")
        validity=true
          return textAreaInDivInMain.value ;
      }
    else{
    alert("Devi inserire un titolo Valido")
    validity=false
    }
      }
    catch(Error){
      console.log("qualcosa è andato storto nel recupero del titolo")
    }
  }
  $('#but_confirm_title').click(function() {
    if(validity){
    modal.style.display = "none";
  }
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
  let indexX=0
  var initial_y
  var y=0
  let mess=new Array()
  let resp=new Array()
  let post = new Array()
  bForm.setAttribute("action","post/showposts");
  $.ajax({
    url: '/post/showposts',
    data: {
      'loginis': loginis,'tutorial':tutorial,
    },
    dataType: 'json',
    success: function (data) {
      let z=0
      s = cleanJson(data)
      var obj = JSON.parse(s);
      //alert("from ajax dat.post.msg,user,data"+obj.data_l5+obj.tu_serialized+"SSSSS===")
      var obj2 = JSON.parse(obj.data_l5);
      var obj3 = JSON.parse(obj.data_l6);
      var obj4 = JSON.parse(obj.data_l7);
      var obj5_photo = obj.anonymousPhoto;
      var photoPost , photoResp
      console.log(obj.data_l5)
      console.log(obj3)
      console.log(obj.data_l7)
      //console.log(obj.data_l5)
      var i=0
      //initial_y=(parseInt(obj3.length))-1
      for (i;i<=parseInt(obj2.length)-1;i=i+1){
        mess.push(new Post("post",obj2[i].fields.authorname,obj2[i].fields.title))
        mess[indexX].body=obj2[i].fields.body
        mess[indexX].type="post"
        mess[indexX].publish=obj2[i].fields.publish
        for (z=0;z<=obj4.length-1;z=z+1){
          if(obj4[z].fields.user==obj2[i].fields.author){
            if (obj2[i].fields.authorname=="anonimo"){
              photoPost=obj5_photo
            }
            else{
              photoPost=BASE_PHOTO_DIR+obj4[z].fields.photo
            }
          }

        }

        // creo la textarea per il post e con l head .
        if(mess[indexX].getTitle()){
          var pa=new postArea(mess[indexX])
      }
      idtoPut=pa.makeHeadBlog(mess[indexX],photoPost,pa,obj2[i].fields.authorname)
      // qui dovrei creare le risposte per il post specifico
        for (y;y<=obj3.length-1;y=y+1){
          if(obj2[i].pk==obj3[y].fields.commento){
            var resp=new Resp(obj3[y].fields.authorname,obj3[y].fields.body,obj3[y].fields.publish,mess[indexX])
            mess[indexX].risposte.push(resp.body)
            var paResp=new postArea(resp)
            //la textarea viene creata nella funzione makeheadblog

            // cerca autore in json user object
            for (var z2=0;z2<=obj4.length-1;z2=z2+1){
              if(obj4[z2].fields.user==obj3[y].fields.author){
                if (obj3[y].fields.authorname=="anonimo"){
                  photoResp=obj5_photo
                }
                else{
                  photoResp=BASE_PHOTO_DIR+obj4[z2].fields.photo
                }
              }
            }
            idtoPutResp=paResp.makeHeadBlog(resp,photoResp,paResp,obj3[y].fields.authorname)
          }
        }

        y=0
        indexX=indexX+1
      }
    }
  });
});
$("#post_response").change(function(){
  alert("textarea di risposta....evento change in corso .............")
});
