$(document).ready(function() {
  //Wizard
  $('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
    var $target = $(e.target);

    if ($target.parent().hasClass('disabled')) {
      return false;
    }
  });

  $('.next-step').click(function(e) {
    var $active = $('.wizard .nav-tabs li.active');
    $active.next().removeClass('disabled');
    nextTab($active);
  });
  $('.prev-step').click(function(e) {
    var $active = $('.wizard .nav-tabs li.active');
    prevTab($active);
  });
  // Validating All Input And Textarea Fields
  $('.submit_btn').click(function(e) {
    if ($('input').val() == '' || $('textarea').val() == '') {
      alert('*All Fields are mandatory*');
      return false;
    } else {
      return true;
    }
  });
});
function nextTab(elem) {
  $(elem)
    .next()
    .find('a[data-toggle="tab"]')
    .click();
}
function prevTab(elem) {
  $(elem)
    .prev()
    .find('a[data-toggle="tab"]')
    .click();
}
