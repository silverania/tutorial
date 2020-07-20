border="4px solid orange"
class textArea {
  constructor(){
  }
   create(){
    var area=document.createElement("TEXTAREA");
    area.setAttribute("id","post_comment")
    area.setAttribute("rows","2");
    area.setAttribute("name","q")
    $(area).css("border", border)
    area.setAttribute("title","devi essere autenticato per usare la chat !")
    return area;
  }
}
function addTextArea(id){
  let title=document.getElementsByClassName("blog_title");
  padre=document.getElementById("multiarea");
  // controllo che non sia stata gia creata la textarea per evitare di sovrapporne piu di una
  if (!(typeof(a)=="object"))
  {
    a=new textArea();
    area=a.create(id)
    padre.prepend(area);
    $(area).animate({'width':'100%'},2000);

    return 0;
  }
  else {
    el=document.getElementById(id);
    if(!(area.value=="")) {
      console.log("area="+area.value)
    el.setAttribute("type","submit");
    }
    return 1
  }
}
function disableButtonComment(element){
  element.disabled=true;
}

function enableButtonComment(element){
  element.disabled=false;
  //alert('enabled')
}

function writeMsg(id,login){
  //console.log("login"+login)
/*  if(login=="False"){
    console.log("sto for")
    document.writeln("<h3>Per inviare messaggi devi <a href='user/login'>login</a><a href='user/register'></h3>")
}
  else
    {*/
    let i=addTextArea(id);
    //alert("i="+i+"typeof="+typeof(a))
    enableButtonComment(id)
    var figlio=document.getElementById(id);
    figlio.setAttribute("click","")
    var id=id;
    var el;
    var padre;
    var area;

//}
}
