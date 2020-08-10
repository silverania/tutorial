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
var post,post2=new Object();
var empty;
var bSection=document.createElement("SECTION");
var bSpan=document.createElement("SPAN");
var bSpanChild=document.createElement("SPAN");
var bdiv=document.createElement("DIV");
var bIcon=document.createElement("I");
var bForm=document.createElement("FORM");
var wait=true
var postTitle
var tutorial
var bbutton2=document.createElement("Button");



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
  sendToServer(type,msg,postTitle,user,tutorial){
      if(type=="post"){
      el=document.getElementById("post_response");
      }
      else if (type=="resp"){
        el=document.getElementsByClassName("post_response");
      }
      if(!msg=="") {
        let messaggio=msg;
      if(!tutorial=="") {
        let content=tutorial;
        // AJAX .....il pulito a casa mia
        $.ajax({
          url: '/post/getpost',
          data: {
            'messaggio': messaggio,'type':type,'title':postTitle,'username':user,'argomento':argomento
          },
          dataType: 'json',
          success: function (data) {
            if (messaggio) {
            }
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

    function getPostTitleFromClient() {

      if(post=="post"){
        postTitle = prompt("Inserisci un titolo per il tuo post", "titolo a piacere");
        if (postTitle != null) {
          parent.innerHTML =
          "Ok hai inserito :" + postTitle + "Non dire cazzate!";
          return postTitle
        }
      }
      else if (post=="resp"){
        let title=postTitle
        return title
      }
    }
    this.type=post
    this.postarea=document.createElement("TEXTAREA");
    this.empty=true
    this.disabled=false
    this.msg=""
    this.title=getPostTitleFromClient()
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
      $(this.postarea).animate({'width':'80%'},1000);
    }
     this.postarea.setAttribute("rows","2");
     this.postarea.setAttribute("name","messaggio")
     $(this.postarea).css("border", borderPost)
     this.postarea.setAttribute("title","devi essere autenticato per usare la chat !")
     return this.postarea;
  }

  disable(){
    this.disabled=true
    this.postarea.setAttribute('disabled','true')
  }
  }



function initBlogSGang(id,login,tutorial){
    if(login=="False"||login=="false"||login=="none"){
      login="Commento Anonimo"
    }
    else{
      loginis=login
    }
    idis=id;
    tutorial=this.tutorial
    //let i=buttonCommentActionSelect(id,login);
  //  enableButtonComment()
    //var figlio=document.getElementById(id);
    createSectionDivSpan(idis);
}


/*function setPostarea()*/


/* make textarea for comments */


/* EVENT SECTION */
$(bbutton2).click(function(){
  if(post2 instanceof postArea){
  }
});
$(bbutton).click(function(){
  let result
  // caso del primo click su comment , in cui la textarea non è visibile e quindi anche = empty
  if (!(post instanceof postArea ))
  {
    post=new postArea("post") // passo post come argomento
    mess=new Post()
    $(divFormChild).prepend(post.create())
  }
    // caso click su textarea esistente
  else if (post instanceof postArea ) {
    if (post.postarea.value==''){
    }
    // caso click su textarea esistente e con testo all interno
    else {
      /* la modifica della textarea e l' animazione non deve partire se la textarea e disabled ! */
      /* sotto , gestione evento di invio post */
      if(!(post.disabled==true)){
        post.msg=post.postarea.value
        $('#post_response').css("border", "3px solid blue")
        bH5.textContent=loginis+" , ha scritto ...  "
        $('#multiarea').prepend(bH5)
        bbutton.textContent="Rispondi a ..."+loginis
      /* mando xml asincrono al server . congelo la textarea in quanto è stata usata */
        post.disable()
      if ((result=mess.sendToServer("resp",post.msg,"{{tutorial.title}}",loginis)==0)) {
      mess.sent=true
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
      postresp=new Post()
      bbutton.parentNode.insertBefore(post2.create(),bbutton.nextSibiling);
      post2.createButton()
      return 0
  }
    }
  }
  }


}
);


$(document).ready(function(){

   $("#post_response").change(function(){
      });

   });
