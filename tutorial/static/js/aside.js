$(document).ready(function(){
    var s = $("a[id^='a_html']");
/* quando il mouse tocca la freccia , quest' ultima si sposterà di 14 pixel e assumera un opacità di 0.5 . Tutto cio in 400 millisecondi*/
//alert(window.innerWidth);
//alert($('#d_tutorial_section').width());
//alert($('#d_tutorial_section').offset().left);
  $('#asidebar').hover(function(){
    $('#asidebar').animate({ "margin-left" : '14px','opacity' : '0.5',},400);
  $('#d_tutorial_section').animate({'margin-left':'0px'},600);
  },

/* quando il mouse si allontenerà dalla freccia quest' ultima tornerà nella posizione iniziale e l' opacita tornerà a 1*/

  function(){
    $('#asidebar').animate({ "margin-left" : '0px','opacity' : '1',},400);
  }
  );

/* quando cliccheremo sulla freccia comparirà il menu .... a 0px torna visibile visto che la posizione iniziale era -700px: quindi era nascosta*/

  $('#asidebar').click(function(){


        s.css('display' , 'block');
    $('.d_divaside').animate({ "left" : '0px',},400);
    if(!$target.closest('#d_tutorial_section').length && $('#d_tutorial_section').offset().left==0)
      {
            $('#d_tutorial_section').animate({'margin-left':'-510px'},600);
            $('.d_divaside').animate({ "left": '0px',},300);
            $('#d_htmlmenu').css('display','none');
              $('#d_linux_menu').css('display','none');
                $('#d_django_menu').css('display','none');
      }
      if(!$target.closest('.d_divaside').length && $('.d_divaside').offset().left==-15)  {
        /*var paragraph = document.getElementById("asidebar");
        var t=paragraph.textContent;
        var mes ='Autori';
        var sz=t.search(mes);
        if(sz<0){
          var text = document.createTextNode("Autori");
          paragraph.appendChild(text);
        }*/
        $('.d_divaside').animate({ "left": '-700px',},300);
        $('#d_htmlmenu').css('display','none');
          $('#d_linux_menu').css('display','none');
            $('#d_django_menu').css('display','none');
              $('#d_tutorial_section').animate({'margin-left':'0px'},600);
      }
  }
  );
$('#a_html2').hover(function(){
  $('#d_htmlmenu').css('cursor','pointer');

},
function(){
  /*$('#d_htmlmenu').css('display','none');*/
});
/*quando clicchiamo fuori dagli elementi .d_divaside e fa-angle-right tornerà tutto alla posizione iniziale */
$('#a_html2').click(function(){
  $('#d_htmlmenu').css('display','block'); // mostro il menu che mi interessa
  //$('#a_tutorial_html_menu').css('display','block');
  $('#d_django_menu').css('display','none');// nascondo questo menù nel caso sia visibile
    $('#d_linux_menu').css('display','none');// nascondo questo menù nel caso sia visibile
});
$('#a_html3').click(function(){
  $('#d_linux_menu').css('display','block'); // mostro il menu che mi interessa
//  $('#a_tutorial_pdf_converter').css('display','block');// mostro il menu che mi interessa
    $('#d_django_menu').css('display','none');// nascondo questo menù nel caso sia visibile
      $('#d_htmlmenu').css('display','none');// nascondo questo menù nel caso sia visibile
});
$('#a_html1').click(function(){
  $('#d_django_menu').css('display','block'); // mostro il menu che mi interessa
    //$('#a_tutorial_django_urls').css('display','block'); // mostro il menu che mi interessa
  $('#d_linux_menu').css('display','none');// nascondo questo menù nel caso sia visibile
    $('#d_htmlmenu').css('display','none');// nascondo questo menù nel caso sia visibile

});
// click sui pulsanti sull header
$('#a-linux').click(function(){
    var s = $("a[id^='a_html']");
        s.css('display' , 'none');
    $('.d_divaside').animate({ "left" : '140%'},400);

  $('#d_linux_menu').css('display','block'); // mostro il menu che mi interessa
    //$('#a_tutorial_django_urls').css('display','block'); // mostro il menu che mi interessa
  $('#d_django_menu').css('display','none');// nascondo questo menù nel caso sia visibile
    $('#d_htmlmenu').css('display','none');// nascondo questo menù nel caso sia visibile

});

$('#a-django').click(function(){
    var s = $("a[id^='a_html']");
        s.css('display' , 'none');
    $('.d_divaside').animate({ "left" : '120%'},400);

  $('#d_django_menu').css('display','block'); // mostro il menu che mi interessa
    //$('#a_tutorial_django_urls').css('display','block'); // mostro il menu che mi interessa
  $('#d_linux_menu').css('display','none');// nascondo questo menù nel caso sia visibile
    $('#d_htmlmenu').css('display','none');// nascondo questo menù nel caso sia visibile

});
$('#a-web').click(function(){
    var s = $("a[id^='a_html']");
        s.css('display' , 'none');
    $('.d_divaside').animate({ "left" : '160%'},400);

  $('#d_htmlmenu').css('display','block'); // mostro il menu che mi interessa
    //$('#a_tutorial_django_urls').css('display','block'); // mostro il menu che mi interessa
  $('#d_linux_menu').css('display','none');// nascondo questo menù nel caso sia visibile
    $('#d_django_menu').css('display','none');// nascondo questo menù nel caso sia visibile

});

/*nascondo tutto se clicco al di fuori del documento*/
$(document).click(function(event) {
  $target = $(event.target);
  if(!$target.closest('.d_divaside').length && !$target.closest('.fa-angle-right').length && !$target.closest('#header_menu').length &&
  $('.d_divaside').is(":visible")) {
    $('.d_divaside').animate({ "left": '-700px',},300);
    $('#d_htmlmenu').css('display','none');
      $('#d_linux_menu').css('display','none');
        $('#d_django_menu').css('display','none');
  }
  if(!$target.closest('#d_tutorial_section').length && $('#d_tutorial_section').offset().left==0)
    {
      //alert();
          $('#d_tutorial_section').animate({'margin-left':'-510px'},600);
    }
});

});
