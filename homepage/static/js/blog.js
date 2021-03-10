const MAX_TEXTAREA_NUMBER=21
const BASE_PHOTO_DIR="/media/"
var borderPost="none";
var borderResponse="1px solid grey";
var paPostOrResp;
var el
var padre
var user
var loginis
var lastUpdate
var userLoggedPhoto
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
  constructor(author,body,publish,post,photo,titolo,pk){
    this.sent=false
    this.author=author
    this.post=post
    this.body=body
    this.type=post
    this.publish=publish
    this.photo=photo
    this.titled=titolo
    this.pk=pk
  }
}

class Profile{
  constructor(author="anonimo",photo=""){
    this.photo=photo
  }
}

class Post{
  constructor(type="none",author="anonimo",title1,comment,date,photo,pk){
    this.sent=false
    this.type=type
    this.author=author  //post[i,y]=new postArea("resp",resp[y]).create() // passo post come argomento
    //console.log(mess[indexX].body+"|"+"|risposta:"+resp[indexX][indexY].body)
    this.titled=title1
    this.risposte=new Array()
    this.body=comment
    this.titled=title1
    this.photo=photo
    this.publish=date
    this.pk=pk
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
  constructor(post){
    this.postarea=document.createElement("TEXTAREA");
    this.id=post.pk
    var mess=""
    if (post.type=="resp"){
      this.postarea.setAttribute("id","resp_"+loginis+"_"+this.id)
      console.log("post di risposta")
      this.postarea.value=post.body
      this.postarea.disabled=false
    }
    else if  (post.type=="post"){
      let x;
      x = this.postarea.setAttribute("id","post_"+loginis+"_"+this.id)
      this.empty=true
      this.postarea.disabled=false
      this.postarea.value=post.body
      if (this.postarea.value==""){
        this.postarea.setAttribute("style","border:solid 2px orange;")
      }
    }
  //  else{
    //  makeModalWindow(this)
    //}
  }

  appendPostArea(mess,postarea){
    if(mess.type=="newpost"){
      $(postarea).insertAfter(divExitLogin)
    }
    else{
      bdiv.appendChild(postarea)
    }
  }

  makeHeadBlog(mess,postarea,post){
    var id=postarea.id
    var divPostTitle=document.createElement("DIV");
    var spanInDivPostTitle=document.createElement("SPAN")
    var divUserBlog=document.createElement("DIV");
    var spanUserName=document.createElement("SPAN");
    var bH5=document.createElement("span")
    var divContainerHead=document.createElement("DIV")
    var tagUserImg=document.createElement("IMG");
    divContainerHead.setAttribute("id","d_head_blog_"+id)
    divContainerHead.setAttribute("style","width:100%")
    divContainerHead.setAttribute("style","height:auto")
    tagUserImg.setAttribute("style","border-radius:50%")
    tagUserImg.setAttribute("src",mess.photo)
    divUserBlog.appendChild(divContainerHead)
    divContainerHead.appendChild(tagUserImg)
    //bH5.textContent="il "+mess.publish
    spanUserName.setAttribute("style","color:grey;display:inline;")
    spanInDivPostTitle.setAttribute("id","post_title_"+id)
    divPostTitle.setAttribute("id","d_post_title_"+id)
    divPostTitle.appendChild(spanInDivPostTitle)
    bH5.setAttribute("style","margin-left:3%;color:blue;")
    bH5.setAttribute("id","bh5_span_"+id.toString())
    bH5.appendChild(spanUserName)
    divContainerHead.appendChild(bH5)
    divUserBlog.appendChild(divPostTitle)
    this.appendPostArea(mess,divUserBlog)
    tagUserImg.setAttribute("id","img_user_"+id.toString())
    spanUserName.setAttribute("id","span_user_"+id.toString())
    divUserBlog.setAttribute("id","divuserblog_"+id)

      this.mess=mess
      if(mess instanceof Resp){
        spanUserName.textContent="il "+mess.publish +" | "+mess.author[0].toUpperCase() +mess.author.slice("1")+" Risponde"
        //+post.author[0].toUpperCase()+post.author.slice("1")
        //spanInDivPostTitle.textContent=
        //divBlog.setAttribute("style","width:100%;height:auto;display:inline-block;position:relative;top:-0%;left:20%")
        divUserBlog.setAttribute("style","margin-left:20%")
        console.log("is resp ")
      }
      else {
        if(!(postarea.disabled==true)){
          spanUserName.textContent="il "+mess.publish +" | "+mess.author[0].toUpperCase() +mess.author.slice("1")+" Posta :"
          spanInDivPostTitle.textContent=mess.titled[0].toUpperCase()+mess.titled.slice("1")
          console.log("thispost.disabled")
          $('#post_response').css("border", "1px solid grey")
          bbutton.textContent="Nuovo Post"
          var idWherePutElement="button_post"
          console.log(idWherePutElement)
        }
      }
      //var objectToAppendChild   =  "divuserblog_"  +   id.toString()
      //var elementToAppendArea=document.getElementById(objectToAppendChild)
        divUserBlog.appendChild(postarea.create())
      return $(divUserBlog)
    }

    createButtonRispostaPost(mess,postarea){
        let button_risposta_post=document.createElement("BUTTON")
        button_risposta_post.setAttribute("type","button")
        button_risposta_post.setAttribute("id","button_risposta_post_"+postarea.id)
        button_risposta_post.setAttribute("class","button_resp")
        button_risposta_post.textContent="Rispondi"
        var objectToAppendChild="divuserblog_"+postarea.id
        var elementToAppendButton=document.getElementById(objectToAppendChild)
        elementToAppendButton.appendChild(button_risposta_post)
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
      this.postarea.setAttribute("rows","2");
      this.postarea.setAttribute("name","messaggio")
      $(this.postarea).css("border", borderPost)
      this.postarea.setAttribute("title","Autenticarsi NON è Obbligatorio !")
      return this.postarea;
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


  function instancePostarea(mess){
    if(mess.titled){
      post=new postArea() // passo post come argomento
      value=post.makeHeadBlog(mess,data.photo,post,data.username)
      return post
    }
  }


  /* Primo funzione eseguita nel flusso di codice , ...... l' entrypoint.... */
  $(bbutton).click(function(){
    let mess=new Post();
    let result
    // caso del primo click su comment , in cui la textarea non è visibile e quindi anche = empty
    function instancePost(){
      //var titleNewPost=makeModalWindow(this.post=instancePostarea())
      this.mess= new Post("newpost",loginis)
      this.mess.titled=makeModalWindow(mess)
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
  let newMess=mess
  var divModalMain=document.createElement("DIV");
  var divInMain=document.createElement("DIV");
  var textAreaInDivInMain=document.createElement("TEXTAREA");
  var modalConfirmButton=document.createElement("Button");
  var checkValidity=false
  modalConfirmButton.setAttribute('id','but_confirm_title')
  modalConfirmButton.setAttribute('type','button')
  divModalMain.setAttribute('class','modal')
  divModalMain.setAttridivUserBlogbute('id','myModal')
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
        newMess.titled=textAreaInDivInMain.value
        newMess.type="newpost"
        newMess.publish=getDateFromDjangoDate("")
        newMess.author=loginis
        newMess.photo=BASE_PHOTO_DIR+userLogged[0].fields.photo
        //createPostArea(newMess)
        return newMess ;
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
      createPostArea(newMess)
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
// se la variabile data non viene passata come parametro si presuppone che il client abbia creato un nuovo post , quindi //la data è now
function getDateFromDjangoDate(data){
  var newDate
  if (  data==""){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '/' + mm + '/' + dd;
    newDate=getDateFromDjangoDate(today)
  }
  else {
    let day=data.slice("8","10")
    let month=data.slice("5","7")
    let year=data.slice("0","4")
    let hour=data.slice("11","15")
  //data=data.replace("T"," ore ")
    data=day+"-"+month+"-"+year+" alle "+hour
    newDate=data
}
return newDate
}

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
  let q=0
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
        userLogged=JSON.parse(obj.userLogged);
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
            profiles.push(new Profile(profiles_json[z].fields.first_name,profiles_json[z].fields.photo))
            mess.push(new Post("post",profiles_json[z].fields.first_name,comments_json[i].fields.title,comments_json[i].fields.body,getDateFromDjangoDate(comments_json[i].fields.publish),BASE_PHOTO_DIR+profiles_json[z].fields.photo,comments_json[i].pk))
            createPostArea(mess[indexX])
            break;
          }
        }
        // creo la textarea per il post e con l head .
        z=0
        // NUOVO PUNTO DINSERIMENTO CICLO FOR PER RISPOSTE
        for (y=resps_json.length-1,q=0;y>0,q<=resps_json.length-1;y=y-1,q=q+1){
          if(comments_json[i].pk==resps_json[y].fields.commento){
            for (var z2=0;z2<=profiles_json.length-1;z2=z2+1){
              if(profiles_json[z2].pk==resps_json[y].fields.author){
                if (resps_json[y].fields.author=="anonimo"){
                  photoResp=obj5_photo
                }
                else{
                  photoResp=BASE_PHOTO_DIR+profiles_json[z2].fields.photo
                }
                resps.push(new Resp(profiles_json[z2].fields.first_name,resps_json[y].fields.body,getDateFromDjangoDate(resps_json[y].fields.publish),"resp",photoResp,"risposta a "+mess[indexX].titled,(comments_json[i].pk).toString()+resps_json[z2].pk.toString()))
                mess[indexX].risposte.push(resps[q].body)
                createPostArea(resps[q],mess[indexX])
              }
            }
          }
        }
        y=0
        indexX=indexX+1
      }


    }
  }
);
});

// Metodo chiamato da post , resp e nuovo Post//
function createPostArea(messOrResp,post){
    paPostOrResp=new postArea(messOrResp)
    paPostOrResp.makeHeadBlog(messOrResp,paPostOrResp,post)
    paPostOrResp.createButtonRispostaPost(messOrResp,paPostOrResp)
}
