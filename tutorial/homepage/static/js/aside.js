$(document).ready(function(){
  height_footer=window.innerHeight/6;
//document.getElementById('div_main_footer').setAttribute("style","height:"+height_footer+"px");
  var object=$('#progress');
  var topNav=$('#nav_top');
  var WINDOW_WIDTH=window.innerWidth;
  var horizontalHeaderMenuPosition=(window.innerWidth/2).toString();
  var table_tutorial=$('#d_tutorial_section');
  var navleft=$('#section_left_navbar');
  mydiv=document.getElementById('d_divaside');
  headWeb=$('#a-Web');
  headLinux=$('#a-Linux');
  headDjango=$('#a-Django');
  var s = $("a[id^='a_html']");
  var off;
  var toHCenter=$(document).innerWidth()/2;
  var toBegin="0px";
  var divaside=document.getElementById('d_divaside');
  table_tutorial_WIDTH=table_tutorial.css('width');
  table_tutorial_WIDTH_initial_position=(parseInt(table_tutorial_WIDTH))+15;
  table_tutorial.css('margin-left', -table_tutorial_WIDTH_initial_position );

// Animazione destra-sinistra dell elemento Angle-Right
  $('#asidebar').hover(function(){
    table_tutorial.css('display','block');
    table_tutorial_width=(parseInt(table_tutorial.css('width'),10));
    off=table_tutorial_width+15;
     table_tutorial.animate({'margin-left':'0'},400);
    $('#asidebar').animate({ "margin-left" : '0px','opacity' : '0.9',},100);
    $('#asidebar').animate({ "margin-left" : '15px','opacity' : '0.1',},100);
    $('#asidebar').css('color','green');
  },

  /* quando il mouse si allontenerà dalla freccia quest' ultima tornerà nella posizione iniziale e l' opacita tornerà a 1*/

  function(){
    $('#asidebar').animate({ "margin-left" : '0px','opacity' : '1',},100);
      $('#asidebar').css('color','black');
  }
);
  // END

/*Se la table tutorial è in posizione left=0 vuol dire che è visibile , quindi l 'evento click su angle , la nascondera
di nuovo ponendola in posizione margin-left= -510px' .......e viceversa
*/
$('#asidebar').click(function(event){
  table_tutorial.css('display','block');
  table_tutorial_width=(parseInt(table_tutorial.css('width'),10));
  off=table_tutorial_width+15;
  $target = $(event.target);
  let x=$('#d_tutorial_section').offset().left;

    // l 'elemento table_tutorial deve ritornare a 0px anche quando clicco sulla freecia , oltre che nell hover della freccia !'
      if ( table_tutorial.offset().left<0) {
        $('#d_tutorial_section').animate({'margin-left': '0px'},300);
      }
    // FINE COMMENTO

  /* se left  è > 0 : vuol dire che l elelemento table_tutorial è visibile quindi lo mando a fan culo nuovamente nei meandri del monitor
 pronto a ritornare davanti ai coglioni al momento giusto .......o sbagliato , a secondo del punto di vista
  */
    if ( table_tutorial.offset().left > 0) {
      hideTutorial();
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
    $('.d_divaside').animate({ "left" : -(horizontalHeaderMenuPosition),"margin-top" : "-30%"},300);
      $('.d_divaside').animate({ "left" : -(horizontalHeaderMenuPosition),"margin-top" : "90%"},300);
      $('.d_divaside').animate({ "left" : horizontalHeaderMenuPosition,"margin-top" : "0" },300);
    showHeader(text);
  }
  else{
    showHeader(text);
    $('.d_divaside').css('display', 'block');
    //$('.d_divaside').css('position', 'absolute');
    $('.d_divaside').animate({ "left" : horizontalHeaderMenuPosition,"top" : "0px" },200);
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
  }
}
});
/*  THE END */

/*nascondo tutto se clicco al di fuori del documento*/
$(document).click(function(event) {
  $target = $(event.target);
  if(!$target.closest('.d_divaside').length && !$target.closest('.fa-angle-right').length && !$target.closest('#header_menu').length &&
  $('.d_divaside').is(":visible")) {
    $('.d_divaside').css( 'left' , '-700px');
  }
 // se il clicc non si verifica sull elemento d_tutorial_section && tutorial_section è in posizione left==15 e il click non si verfica /// da fa-angle-right : allora nascondi l elemento d_tutorial_section !
  if(!$target.closest('#d_tutorial_section').length && $('#d_tutorial_section').offset().left==15 && !$target.closest('.fa-angle-right').length)
  {
    hideTutorial();
  }
});
function hideTutorial(){
  $('#d_tutorial_section').animate({'margin-left': -off },300);
    $('#d_tutorial_section').css('display','none');
}
/* Funzione per evidenziare la percentuale di scrolling verticale della pagina */


});
/* Funzione che prende l' altezza della pagina per costruire una progress bar indicante la posizione, espressa in percentuale dello scroll sulla pagina*/
function getPosition() {
    $(document).ready(function(){
      docBodyScrollHeight=document.body.scrollHeight;
      docDocElementScrollHeight=document.documentElement.scrollHeight;
      docBodyOffsetHeight=document.body.offsetHeight;
      docDocElementOffsetHeight=  document.documentElement.offsetHeight;
      docBodyClientHeight=document.body.clientHeight;
      docDocElementClientHeight=document.documentElement.clientHeight;
      let totalHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
     val=docBodyScrollHeight-docDocElementOffsetHeight;
  let tagElmnt = document.getElementById("page");
  var actualHeight = document.documentElement.scrollTop;
  let rapport=(actualHeight/val)*100;
  createProgressBar(rapport,totalHeight,actualHeight);
});}
function createProgressBar(actualValue){
  var object=document.getElementById('progressbar');
  object.value=parseInt(actualValue,10);
}
