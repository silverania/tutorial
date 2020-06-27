$(document).ready(function(){
  mydiv=document.getElementById('d_divaside');
  headWeb=$('#a-Web');
  headLinux=$('#a-Linux');
  headDjango=$('#a-Django');
  var s = $("a[id^='a_html']");
  var toHCenter=$(document).innerWidth()/2;
  var toBegin="0px";
  var divaside=document.getElementById('d_divaside');
  $('#asidebar').hover(function(){
    $('#asidebar').animate({ "margin-left" : '14px','opacity' : '0.5',},400);
    $('#d_tutorial_section').animate({'margin-left':'-15px'},600);
  },

  /* quando il mouse si allontenerà dalla freccia quest' ultima tornerà nella posizione iniziale e l' opacita tornerà a 1*/

  function(){
    $('#asidebar').animate({ "margin-left" : '0px','opacity' : '1',},400);
  }
);

/* quando cliccheremo sulla freccia comparirà il menu .... a 0px torna visibile visto che la posizione iniziale era -700px: quindi era nascosta*/

$('#asidebar').click(function(event){
  $target = $(event.target);

  alternateMenu();
  function alternateMenu(){
    //s.css('display' , 'block');
    showDivaside(toBegin);
    function showDivaside(hposition){
      hposition=hposition.toString();
      //$('.d_divaside').animate({ "margin-left" : "0px" ,},400);
    }

    if(!$target.closest('#d_tutorial_section').length && $('#d_tutorial_section').offset().left==0)
    {

      $('#d_tutorial_section').animate({'margin-left':'-510px'},600);
      //$('.d_divaside').animate({ "margin-left": '700px',"margin-top" : "0px"},300);
      $('#d_Web_menu').css('display','none');
      $('#d_Linux_menu').css('display','none');
      $('#d_Django_menu').css('display','none');
    }
  /*  if(!$target.closest('.d_divaside').length && $('.d_divaside').offset().left==0)  {
      $('.d_divaside').animate({ "margin-left": '-700px',"margin-top" : "0px"},300);
      $('#d_Web_menu').css('display','none');
      $('#d_Linux_menu').css('display','none');
      $('#d_Django_menu').css('display','none');
      $('#d_tutorial_section').animate({'margin-left':'-15px'},600);
    }*/
  }
}
);




$('#a_html2').hover(function(){
  $('#d_Web_menu').css('cursor','pointer');

},
function(){
  /*$('#d_htmlmenu').css('display','none');*/
});
/*quando clicchiamo fuori dagli elementi .d_divaside e fa-angle-right tornerà tutto alla posizione iniziale */
$('#a_html2').click(function(){
  showHtmlMenu();
  function showHtmlMenu(){
    $('#d_Web_menu').css('display','block'); // mostro il menu che mi interessa
    $('#d_Django_menu').css('display','none');// nascondo questo menù nel caso sia visibile
    $('#d_Linux_menu').css('display','none');// nascondo questo menù nel caso sia visibile
  }

  //$('#a_tutorial_html_menu').css('display','block');

});
$('#a_html3').click(function(){
  showLinuxMenu();
  function showLinuxMenu(){
    $('#d_Linux_menu').css('display','block'); // mostro il menu che mi interessa
    //  $('#a_tutorial_pdf_converter').css('display','block');// mostro il menu che mi interessa
    $('#d_Django_menu').css('display','none');// nascondo questo menù nel caso sia visibile
    $('#d_Web_menu').css('display','none');// nascondo questo menù nel caso sia visibile
  }
});

$('#a_html1').click(function(){
  showDjangoMenu();
  function showDjangoMenu(){
    $('#d_Django_menu').css('display','block'); // mostro il menu che mi interessa
    //$('#a_tutorial_django_urls').css('display','block'); // mostro il menu che mi interessa
    $('#d_Linux_menu').css('display','none');// nascondo questo menù nel caso sia visibile
    $('#d_Web_menu').css('display','none');// nascondo questo menù nel caso sia visibile
  }
});
// click sui pulsanti sull header


$("li[id^='a-']").click(function(event){
  text=(this.id);
  alert(text);
  offset=mydiv.offsetTop;
  var s = $("a[id^='a_html']");
  s.css('display' , 'none');


  if(mydiv.offsetLeft>0){
    $('.d_divaside').animate({ "margin-left" : '-260%',"margin-top" : "0%"},400);
  }
  else{
    $('.d_divaside').animate({ "margin-left" : '260%',"margin-top" : -(offset)},1400);

  }
  switch (text){
    case "a-Web":
      $('d_Web_menu').css('display','block');
      $('#d_Linux_menu').css('display','none');// nascondo questo menù nel caso sia visibile
      $('#d_Django_menu').css('display','none');// nascondo questo menù nel caso sia visibile
      break;
   case "a-Linux":
   alert("linux ok")
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

});

/*nascondo tutto se clicco al di fuori del documento*/
$(document).click(function(event) {
  $target = $(event.target);
  if(!$target.closest('.d_divaside').length && !$target.closest('.fa-angle-right').length && !$target.closest('#header_menu').length &&
  $('.d_divaside').is(":visible")) {
    //$('.d_divaside').animate({ "left": '-700px',},300);
  /*  $('#d_Html_menu').css('display','none');
    $('#d_Linux_menu').css('display','none');
    $('#d_Django_menu').css('display','none');*/
    $('.d_divaside').animate({ "margin-left" : '0%',"margin-top" : "0%"},400);
  }
  if(!$target.closest('#d_tutorial_section').length && $('#d_tutorial_section').offset().left==0)
  {
    alert("animate ...");
    $('#d_tutorial_section').animate({'margin-left':'-510px'},600);
  }
});

});
