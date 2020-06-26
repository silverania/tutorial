
$(document).ready(function(){
   cazz=cazzovuoi;
   fess=cazzovuoi("banana")
   alert("cazzovuoi="+cazz+"fess="+fess);
  current=window.location.href;
//alert(window.location.href);
if (current.search("linux")>0){
  $('#a-linux').addClass('active');
  $('#a-web').removeClass("active");
  $('#a-django').removeClass("active");
}
else if (current.search("web")>0){
  $('#a-web').addClass('active');
  $('#a-linux').removeClass("active");
  $('#a-django').removeClass("active");
}
else if (current.search("django")>0){
  $('#a-django').addClass('active');
  $('#a-web').removeClass("active");
  $('#a-linux').removeClass("active");
}
else {
  $('#a-web').addClass('active');
  $('#a-django').removeClass("active");
  $('#a-linux').removeClass("active");
}

  /*  headerliactive();
  $('#s_leftmenu1').click(function(){
      headerliactive("liweb");
});
$('#s_leftmenu2').click(function(){
    headerliactive("lidjango");
});
$('#s_leftmenu3').click(function(){
    headerliactive("lilinux");
});*/





}
);
function cazzovuoi(cazzo){
  return cazzo;
}
/*function headerliclick(link){
alert(link);
  window.open(link);
}
function headerliactive(active){
  alert("menu attivo"+active);
   liweb=$('#a-web');
    lilinux=$('#a-linux');
    lidjango=$('#a-django');
    if (active.search(liweb)>0){
      liweb.addClass('active');
      lilinux.removeClass('active');
        lidjango.removeClass('active');
    }
    else if(active.search(lilinux)>0){
      lilinux.addClass('active');
      liweb.removeClass('active');
        lidjango.removeClass('active');
    }
}*/
