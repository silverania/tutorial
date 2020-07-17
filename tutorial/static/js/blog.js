border="4px solid orange"
class textArea {
  constructor(){
  }
   create(){
    var area=document.createElement("TEXTAREA");
    area.setAttribute("id","post_comment")
    area.setAttribute("rows","2");
    $(area).css("border", border)
    area.setAttribute("title","devi essere autenticato per usare la chat !")
    return area;
  }
}
function addTextArea(id){
  let title=document.getElementsByClassName("blog_title");
  padre=document.getElementById("multiarea");
  a=new textArea();
  area=a.create(id)
  padre.prepend(area);
  $(area).animate({'width':'100%'},2000);
  return 0;
}
function disableButtonComment(element){
  element.disabled=true;
}
function writeMsg(id,login){
  console.log("login"+login)
  if(login=="False"){
    console.log("sto for")
    document.writeln("<h3>Il Sistema Di Messaggi è in Lavorazione ! quando sarà pronto dovrai effettuare il <a href='user/login'>login</a> per postare messaggi, se non sei registrato , Registrati !")
}
  else
    {
    console.log("i stray aint")

  var figlio=document.getElementById(id);
  var id=id;
  var el;
  var padre;
  var area;
    class Blog{
      constructor(){
        if(addTextArea(id)==0){
          disableButtonComment(figlio);
        }
    }
  }
    new Blog();
}
}
