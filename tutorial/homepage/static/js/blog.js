function addTextArea(){
  let title=document.getElementsByClassName("blog_title");
  padre=document.getElementById("multiarea");
  area=document.createElement("TEXTAREA");
  area.setAttribute("rows","12");
  padre.prepend(area);
  $(area).animate({'width':'100%','margin-left':'-200px'},2000);
  return 0;
}
function disableButtonComment(element){
  element.disabled=true;
}
function writeMsg(id,login){
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
