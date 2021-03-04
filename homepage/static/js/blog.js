const MAX_TEXTAREA_NUMBER=21
const BASE_PHOTO_DIR="/media/"
var borderPost="none";
var borderResponse="1px solid grey";
var id=0
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
  constructor(author,body,publish,post,photo){
    this.sent=false
    this.author=author
    this.post=post
    this.body=body
    this.titled=""
    this.type=post.type
    this.publish=publish
    this.photo=photo
  }
}

class Profile{
  constructor(author="anonimo",photo=""){
    this.photo=photo
  }
}

class Post{
  constructor(type="none",author="anonimo",title1,comment,date,photo){
    this.sent=false
    this.type=type
    this.author=author  //post[i,y]=new postArea("resp",resp[y]).create() // passo post come argomento
            //console.log(mess[indexX].body+"|"+"|risposta:"+resp[indexX][indexY].body)
    this.titled=title1
    this.risposte=new Array()
    this.body=comment
    this.titled=title1
    this.publish=getDateFromDjangoDate(date)
    this.photo=photo
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
    else if (post.type=="newpost"){
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
  constructor(post=Object()){
    this.postarea=document.createElement("TEXTAREA");
    var mess=""
   if (post.type=="resp"){
      this.postarea.setAttribute("id","resp_"+loginis+"_"+id)
      this.id=id+1
      console.log("textarea di resposta")
      this.postarea.value=post.body
    }
    else if  (post.type=="post"){
    this.postarea.setAttribute("id","post_"+loginis+"_"+id)
    this.empty=true
    this.disabled=false
    this.postarea.value=post.body
    if (this.postarea.value==""){
      this.postarea.setAttribute("style","border:solid 2px orange;")
    }
  }
  else{
    makeModalWindow(this)
  }
}
  makeHeadBlog(mess,post){
    id=post.id
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
    tagUserImg.setAttribute("src",mess.photo)
    spanUserName.textContent=" | "+mess.author

    //divBlog.setAttribute("id","divblog_"+id.toString())
    divUserBlog.appendChild(tagUserImg)
    bH5.textContent=mess.publish
    spanUserName.setAttribute("style","color:grey;display:inline;")
    spanInDivPostTitle.setAttribute("style","color:grey;display:inline;")
    spanInDivPostTitle.setAttribute("id","post_title_"+id)
    divPostTitle.setAttribute("id","d_post_title")
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
    this.mess=mess
    if(mess instanceof Resp){
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
        bbutton.textContent="Nuovo Post"
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
  if(this.mess instanceof Post){
if (this.mess.titled){
  //  if(this.type=="post" ){
      $(this.postarea).animate({'width':'100%'},1000);
    }}
  else if(this.mess instanceof Resp){
    if (this.mess.titled){
      $(this.postarea).animate({'width':'100%'},1000);
  }
}
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

function instancePostarea(mess){
  if(mess.titled){
  post=new postArea() // passo post come argomento
  post.id=id+1
  value=post.makeHeadBlog(mess,data.photo,post,data.username)
  return post
}
}
/* Primo funzione eseguita nel flusso di codice , ...... l' entrypoint.... */
$(bbutton).click(function(){
  var mess=Post,post;
  let result
  // caso del primo click su comment , in cui la textarea non è visibile e quindi anche = empty
  function instancePost(){
    //var titleNewPost=makeModalWindow(this.post=instancePostarea())
    mess= new Post("newpost",loginis)
    mess.titled=makeModalWindow(mess)
    this.mess=mess
    return this.mess
  }

  if (!(post instanceof postArea ))
  {
    //post=instancePostarea()
    post=instancePost()
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

function makeModalWindow(mess=Object()){
  this.mess=mess
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
        validity=true
        mess.titled=textAreaInDivInMain.value
        instancePostarea(mess)
        //$(divFormChild).prepend(post.create())
        return mess.titled ;
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
  $('#p_text').focus( function() {
    if (textAreaInDivInMain.value.search("Titolo Post ?")>=0){
      console.log("canche")
      textAreaInDivInMain.value=""
    }
    });
}

function getDateFromDjangoDate(data){
  let day=data.slice("8","10")
  let month=data.slice("5","7")
  month=getMonthFromData(month)
  let year=data.slice("0","4")
  let hour=data.slice("11","15")
  //data=data.replace("T"," ore ")
  data=day+"-"+month+"-"+year+" alle "+hour
  return data
}

function getMonthFromData(mese){
  switch(mese){
    case "01": mese="Gennaio"
    case "03": mese="Marzo"
    case "02": mese="febbraio"
    return mese;
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
  //s=this.data.replace(/[\u0000-\u0019]+/g,"");
  //alert("s="+s);
  return s
}

$(document).ready(function(){
  var obj
  let indexX=0
  var initial_y
  var y=0,s
  let mess=new Array()
  let resps=new Array()
  let post = new Array()
  let profiles=new Array()
  let z=0
  let comments_json;
  //bForm.setAttribute("action","post/showposts");
  $.ajax({
    url: '/post/showposts',
    data: {
      'loginis': loginis,'tutorial':tutorial,
    },
    dataType: 'json',
    success: function (data) {
      s = cleanJson(data)
      try {
        obj = JSON.parse(s);
        comments_json = JSON.parse(obj.data_comm);// blog.comment
        resps_json = JSON.parse(obj.resps);
        profiles_json = JSON.parse(obj.profiles);
        }
        catch(SyntaxError){
          console.log("error in json!")
        }
          //alert("from ajax dat.post.msg,user,data"+obj.data_l5+obj.tu_serialized+"SSSSS===")

          //alert(obj3);
          //var obj4 = obj.photos
          //var obj5_photo = obj.profile;
          //var user_post_parsed=JSON.parse(obj5_photo);
          //var user_pk=user_post_parsed.pk
          var photoPost , photoResp
          //console.log(obj.data_l5)

          //console.log(obj.data_l7)
          //console.log(obj.data_l5)
          var i=0
          //initial_y=(parseInt(obj3.length))-1
          for (i;i<=comments_json.length-1;i=i+1){
            for (z=0;z<=profiles_json.length-1;z=z+1){
             // if(obj5_photo[z].fields.user==obj2[i].fields.author){
               if(profiles_json[z].pk==comments_json[i].fields.author){
                 alert(profiles_json[z].pk+"-"+comments_json[i].fields.author)
                 profiles.push(new Profile(profiles_json[z].fields.first_name,profiles_json[z].fields.photo))
                 mess.push(new Post("post",profiles_json[z].fields.first_name,comments_json[i].fields.title,comments_json[i].fields.body,comments_json[i].fields.publish,BASE_PHOTO_DIR+profiles_json[z].fields.photo))

                 if(mess[indexX].getTitle()){
                   var pa=new postArea(mess[indexX])
                   pa.id=id+1
                   idtoPut=pa.makeHeadBlog(mess[indexX],pa)
               }
               }

             }
             // creo la textarea per il post e con l head .
             z=0
           // NUOVO PUNTO DINSERIMENTO CICLO FOR PER RISPOSTE
           for (y=resps_json.length-1;y>=0;y=y-1){
             if(comments_json[i].pk==resps_json[y].fields.commento){
               for (var z2=0;z2<=profiles_json.length-1;z2=z2+1){
                 if(profiles_json[z2].pk==resps_json[y].fields.author){
                   if (resps_json[y].fields.author=="anonimo"){
                     photoResp=obj5_photo
                   }
                   else{
                     photoResp=BASE_PHOTO_DIR+profiles_json[z2].fields.photo
                   }
                   var resp=new Resp(profiles_json[z2].fields.first_name,resps_json[y].fields.body,resps_json[y].fields.publish,mess[indexX],photoResp)
                   resp.type="resp"
                   mess[indexX].risposte.push(resp.body)
                   resp.titled="risposta a "+mess[indexX].titled
                   var paResp=new postArea(resp)
                   idtoPutResp=paResp.makeHeadBlog(resp,paResp)
                 }
               }
             }
           }
         }
         y=0
         indexX=indexX+1

    }
  }
);

         //i=obj5_photo.length



      // qui dovrei creare le risposte per il post specifico

      });
