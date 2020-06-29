$(document).ready(function(){
  alert(window.innerWidth);
  var horizontalHeaderMenuPosition=(window.innerWidth/2).toString();
  var table_author=$('#td_autore');
  var table_tutorial=$('#d_tutorial_section');
  mydiv=document.getElementById('d_divaside');
  headWeb=$('#a-Web');
  headLinux=$('#a-Linux');
  headDjango=$('#a-Django');
  var s = $("a[id^='a_html']");
  var toHCenter=$(document).innerWidth()/2;
  var toBegin="0px";
  var divaside=document.getElementById('d_divaside');
//############### Quando il mouse genera un hover sul nome autore nella table side left : elenca i tutorials dell autore

$("td[id^='td_autore_']").hover(function(event){
  text=(this.id);

});
// ##################################### Animazione destra-sinistra dell elemento Angle-Right
  $('#asidebar').hover(function(){
    $('#d_tutorial_section').css('display','block');
    $('#asidebar').animate({ "margin-left" : '0px','opacity' : '0.9',},100);
    $('#asidebar').animate({ "margin-left" : '15px','opacity' : '0.1',},100);
    $('#asidebar').css('color','green');
    $('#d_tutorial_section').animate({'margin-left':'-15px'},300);
  },

  /* quando il mouse si allontenerà dalla freccia quest' ultima tornerà nella posizione iniziale e l' opacita tornerà a 1*/

  function(){
    $('#asidebar').animate({ "margin-left" : '0px','opacity' : '1',},100);
      $('#asidebar').css('color','black');
  }
);
// END ########################################################################

/*Se la table tutorial è in posizione left=0 vuol dire che è visibile , quindi l 'evento click su angle , la nascondera
di nuovo ponendola in posizione margin-left= -510px' .......e viceversa
*/
$('#asidebar').click(function(event){
  table_tutorial_width=(parseInt(table_tutorial.css('width'),10));
  off=table_tutorial_width+15;
  $target = $(event.target);
  let x=$('#d_tutorial_section').offset().left;
  if(!$target.closest('#d_tutorial_section').length && $('#d_tutorial_section').offset().left==-15)
    {
      $('#d_tutorial_section').animate({'margin-left': -off},300);
      $('#d_Web_menu').css('display','none');
      $('#d_Linux_menu').css('display','none');
      $('#d_Django_menu').css('display','none');
    }
    else{
        $('#d_tutorial_section').animate({'margin-left': '-15px'},300);
    }
}

);
// funzioni per visulizzare menu clickati
function showHtmlMenu(){
  $('#d_Web_menu').css('display','block'); // mostro il menu che mi interessa
  $('#d_Django_menu').css('display','none');// nascondo questo menù nel caso sia visibile
  $('#d_Linux_menu').css('display','none');// nascondo questo menù nel caso sia visibile
}
function showLinuxMenu(){
  $('#d_Linux_menu').css('display','block'); // mostro il menu che mi interessa
  //  $('#a_tutorial_pdf_converter').css('display','block');// mostro il menu che mi interessa
  $('#d_Django_menu').css('display','none');// nascondo questo menù nel caso sia visibile
  $('#d_Web_menu').css('display','none');// nascondo questo menù nel caso sia visibile
}
function showDjangoMenu(){
  $('#d_Django_menu').css('display','block'); // mostro il menu che mi interessa
  //$('#a_tutorial_django_urls').css('display','block'); // mostro il menu che mi interessa
  $('#d_Linux_menu').css('display','none');// nascondo questo menù nel caso sia visibile
  $('#d_Web_menu').css('display','none');// nascondo questo menù nel caso sia visibile
}
// END #####################################

//gestione  click sui pulsanti sull header
$("li[id^='a-']").click(function(event){

  text=(this.id);
  var topOffset=mydiv.offsetTop;
  var leftOffset=mydiv.offsetLeft;

  if(leftOffset>0){

    $('.d_divaside').animate({ "left" : -(horizontalHeaderMenuPosition),"margin-top" : "0%"},800);
      $('.d_divaside').animate({ "left" : horizontalHeaderMenuPosition,"margin-top" : -topOffset },200);
    showHeader(text);
  }
  else{
    showHeader(text);
    $('.d_divaside').css('display', 'block');
    $('.d_divaside').animate({ "left" : horizontalHeaderMenuPosition,"margin-top" : -topOffset },200);
  }
  function showHeader(text){
  switch (text){
    case "a-Web":
    showHtmlMenu();
    break;
    case "a-Linux":
    $('#d_Linux_menu').css('display','block');
    $('#d_Web_menu').css('display','none');// nascondo questo menù nel caso sia visibile
    $('#d_Django_menu').css('display','none');// nascondo questo menù nel caso sia visibile
    break;
    case "a-Django":
    $('#d_Linux_menu').css('display','none');
    $('#d_Web_menu').css('display','none');// nascondo questo menù nel caso sia visibile
    $('#d_Django_menu').css('display','block');// nascondo questo menù nel caso sia visibile
    break;
    default :
    alert('errore inatteso su click menu');
  }
}
});
/*  THE END */

/*nascondo tutto se clicco al di fuori del documento*/
$(document).click(function(event) {
  $target = $(event.target);
  if(!$target.closest('.d_divaside').length && !$target.closest('.fa-angle-right').length && !$target.closest('#header_menu').length &&
  $('.d_divaside').is(":visible")) {

    $('.d_divaside').animate({ "margin-left" : '0%',"margin-top" : "0%"},400);
  }
  if(!$target.closest('#d_tutorial_section').length && $('#d_tutorial_section').offset().left==0)
  {
    $('#d_tutorial_section').animate({'margin-left': -off},600);
  }
});
/* THE END */

});
var isFill=0;
/* Gestione del click sul div tutorial laterale .... al click visualizzo la lista tutorial appartenente al user in questione  */
function createSubMenuTutorialsForAuthorName(tutorial,name,surname,tutoriallength,url) {
  if(!(isFill==tutoriallength)){
  var element = document.getElementById("div_author_text");
  var aelement=document.getElementById("a_author_text"+"_"+name+"_"+surname);
    var helement=document.getElementById("header_author"+"_"+name+"_"+surname);
  var tag = document.createElement('div');
    var tagspan = document.createElement('span');
    var aspan = document.createElement('a');
  tag.setAttribute("id", "div_tutorial_title");
    aspan.setAttribute("id", "a_tutorial_title");
      aspan.setAttribute("href", url);
    tag.appendChild(aspan);
    aspan.appendChild(tagspan);
  var node = document.createTextNode(tutorial);
tagspan.appendChild(node);
(element , aelement , helement).appendChild(tag);
isFill++;
  }
}
