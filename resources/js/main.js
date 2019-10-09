jQuery("document").ready(function($) {

  let nav = $('.nav');

  $(window).scroll(function() {
    if ($(this).scrollTop() > 1) {
      nav.addClass("nav-container");
    } else {
      nav.removeClass("nav-container");
    }
  });


  $(window).scroll(function() {
    if ($(this).scrollTop() > 12) {
      nav.addClass("animated  bounce");
    }
  });


  let anim = $('.how h3');
  let anim2 = $('.how p');
  let anim3 = $('.how button');

  $(window).scroll(function() {
    if ($(this).scrollTop() > 900 && $(this).scrollTop() < 1200) {
      anim.addClass("animated  jello");
      anim2.addClass("animated  jello");
      anim3.addClass("animated   jello");
    }
  });

});