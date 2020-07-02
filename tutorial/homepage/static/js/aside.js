$(document).ready(function(){
  alert(window.innerWidth);
  var horizontalHeaderMenuPosition=(window.innerWidth/2).toString();
  var table_tutorial=$('#d_tutorial_section');
  mydiv=document.getElementById('d_divaside');
  headWeb=$('#a-Web');
  headLinux=$('#a-Linux');
  headDjango=$('#a-Django');
  var s = $("a[id^='a_html']");
  var toHCenter=$(document).innerWidth()/2;
  var toBegin="0px";
  var divaside=document.getElementById('d_divaside');
  table_tutorial_WIDTH=table_tutorial.css('width');
  table_tutorial_WIDTH_initial_position=(parseInt(table_tutorial_WIDTH))+15;
  table_tutorial.css('margin-left', -table_tutorial_WIDTH_initial_position );
//############### Quando il mouse genera un hover sul nome autore nella table side left : elenca i tutorials dell autore


// ##################################### Animazione destra-sinistra dell elemento Angle-Right
  $('#asidebar').hover(function(){
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
      console.log("exec 1")
      $('#d_tutorial_section').animate({'margin-left': -off},300);
      $('#d_Web_menu').css('display','none');
      $('#d_Linux_menu').css('display','none');
      $('#d_Django_menu').css('display','none');
    }
    // l 'elemento table_tutorial deve ritornare a 0px anche quando clicco sulla freecia , oltre che nell hover della freccia !'
    else{
      if ( table_tutorial.offset().left<0) {
        console.log("exec 2")
        $('#d_tutorial_section').animate({'margin-left': '0px'},300);
      }
    }
    // FINE COMMENTO
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

    $('.d_divaside').animate({ "left" : -(horizontalHeaderMenuPosition),"margin-top" : -topOffset},800);
      $('.d_divaside').animate({ "left" : horizontalHeaderMenuPosition,"margin-top" : -topOffset },200);
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

  if(!$target.closest('#d_tutorial_section').length && $('#d_tutorial_section').offset().left==15)
  {
    $('#d_tutorial_section').animate({'margin-left': -off},600);
  }
});
});
  /*  tag.setAttribute("id", "div_tutorial_title"+"_"+name+"_"+surname);
    tagspan.setAttribute("id","span_tutorial_left"+"_"+name+"_"+surname);
    aspan.setAttribute("id", "a_tutorial_title"+"_"+name+"_"+surname);
    aspan.setAttribute("href", url);
    tag.appendChild(aspan);
    aspan.appendChild(tagspan);
    var node = document.createTextNode(tutorial);
    tagspan.appendChild(node);
    (element , aelement , helement).appendChild(tag);
    value++;
  }*/
