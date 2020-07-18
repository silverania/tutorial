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
  if (!(typeof(a)=="object"))
  {
    a=new textArea();
    area=a.create(id)
    padre.prepend(area);
    $(area).animate({'width':'100%'},2000);
    return 0;
  }
  else {
    return -1
  }
}
function disableButtonComment(element){
  element.disabled=true;
}

function enableButtonComment(element){
  element.disabled=false;
  alert('enabled')
}

function writeMsg(id,login){
  console.log("login"+login)
  if(login=="False"){
    console.log("sto for")
    document.writeln("<h3> Blog in programmazione ! ..........effettua il <a href='user/login'>login</a> , oppure <a href='user/register'>Registrati</a> !</h3>")
}
  else
    {
    let i=addTextArea(id);
    alert("i="+i+"typeof="+typeof(a))
    enableButtonComment(id)
  var figlio=document.getElementById(id);
  var id=id;
  var el;
  var padre;
  var area;

}
}
