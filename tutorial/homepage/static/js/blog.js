function addTextArea(){
  let title=document.getElementsByClassName("blog_title");
  padre=document.getElementById("multiarea");
  area=document.createElement("TEXTAREA");
  area.setAttribute("rows","12");
  area.setAttribute("title","devi essere autenticato per usare la chat !")
  padre.prepend(area);
  $(area).animate({'width':'100%'},2000);
  return 0;
}
function disableButtonComment(element){
  element.disabled=true;
}
function writeMsg(id,login){
  console.log("login"+login)
  if(login==false){
    console.log("sto for")

}
  else
    {
    console.log("i stray aint")
  }
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
