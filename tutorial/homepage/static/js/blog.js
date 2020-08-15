var borderPost="1px solid orange";
var borderResponse="2px solid blue";
var id=id
var el
var padre
var user
var loginis
var bbutton=document.createElement("Button");
var divFormChild=document.createElement("DIV");
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
  divBlogReg.setAttribute("id","d_blog_reg")
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
  spanBlogReg.textContent="Blog in Costruzione"
  spanBlogEntra.textContent="..."
  spanBlogEsci.textContent="Blog in Costruzione ...Exit"
  ulBlogReg.setAttribute("id","ul_blog")
  document.getElementById(parent).appendChild(bSection);
  if(loginis=="anonymousUser"){
    aBlogReg.appendChild(spanBlogReg)
    liBlogReg.appendChild(aBlogReg)
    aBlogEntra.appendChild(spanBlogEntra)
    liBlogEntra.appendChild(aBlogEntra)
    ulBlogReg.appendChild(liBlogReg)
    ulBlogReg.appendChild(liBlogEntra)
    divBlogReg.appendChild(ulBlogReg)
    bSection.appendChild(divBlogReg)
  }
  else {
    aBlogEsci.appendChild(spanBlogEsci)
    liBlogEsci.appendChild(aBlogEsci)
    ulBlogReg.appendChild(liBlogEsci)
    divBlogReg.appendChild(ulBlogReg)
    bSection.appendChild(divBlogReg)
  }
  bSection.appendChild(bdiv)
  bdiv.appendChild(bSpan)
  bSpan.appendChild(bIcon)
  bSpan.appendChild(bSpanChild)
  bSection.appendChild(bForm)
  bForm.appendChild(divFormChild)
  divFormChild.appendChild(bbutton)
}


class Post{
  constructor(){
    this.sent=false
  }
  sendToServer(type,msg,postTitle,user){
    if(type=="post"){
      el=document.getElementById("post_response");
    }
    else if (type=="resp"){
      el=document.getElementsByClassName("post_response");
    }
    if(!msg=="") {

      if(!tutorial=="") {
        let content=tutorial;
        // AJAX .....il pulito a casa mia
        $.ajax({
          url: '/post/getpost',
          data: {
            'messaggio': msg,'type':type,'title':postTitle,'username':user
          },
          dataType: 'json',
          success: function (data) {
            console.log("json effettuata.")}
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



  function initBlogSGang(id,login,tut){
    if(login=="False"||login=="false"||login=="none"||login=="AnonymousUser"){
      loginis="anonymousUser"
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
        alert("is empty")
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
          if ((result=mess.sendToServer(post.type,post.msg,tutorial,loginis)==0)) {
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
