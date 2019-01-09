$(document).ready(function() {
  //Wizard
  $('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
    var $target = $(e.target);

    if ($target.parent().hasClass('disabled')) {
      return false;
    }
  });

  $('.next-step').click(function(e) {
    if (!$('#medical-history-form').valid()) {
      //I added an extra parenthesis at the end
      return false;
    }

    // Add patient value to cosent raido button label patient_name
    var $patient =
      $('input[name="patient_title"]').val() +
      ' ' +
      $('input[name="first_name"]').val() +
      ' ' +
      $('input[name="last_name"]').val();
    $('#patient_name')
      .contents()
      .last()
      .replaceWith($patient);

    // Navigate to next page
    var $active = $('.wizard .nav-tabs li.active');
    $active.next().removeClass('disabled');
    nextTab($active);
  });

  $('.prev-step').click(function(e) {
    // Navigate to next page
    var $active = $('.wizard .nav-tabs li.active');
    prevTab($active);
  });

  // check if yes raido button checked
  $('.check-yes').click(function() {
    $detail_input = $(this)
      .parentsUntil('.block')
      .siblings('.detail');

    if ($(this).is(':checked')) {
      $detail_input.find('input').attr('disabled', false);
      $detail_input.find('tetarea').attr('disabled', false);
      $detail_input.removeClass('disabled');
    } else {
      $detail_input.find('input').attr('disabled', true);
      $detail_input.find('tetarea').attr('disabled', true);
      $detail_input.addClass('disabled');
    }
  });
  // check if no raido button checked
  $('.check-no').click(function() {
    $detail_input = $(this)
      .parentsUntil('.block')
      .siblings('.detail');

    if ($(this).is(':checked')) {
      $detail_input.find('input').attr('disabled', true);
      $detail_input.find('tetarea').attr('disabled', true);
      $detail_input.addClass('disabled');
    } else {
      $detail_input.find('input').attr('disabled', false);
      $detail_input.find('tetarea').attr('disabled', false);
      $detail_input.removeClass('disabled');
    }
  });

  //validate rules
  /*
  $('#medical-history-form').validate({
    rules: {
      first_name: {
        required: true,
        minlength: 3
      },
      last_name: {
        required: true,
        minlength: 3
      },
      phone: {
        required: true,
        number: true,
        minlength: 3
      },
      email: {
        required: true,
        email: true
      },
      gender: {
        required: true
      },
      address_number: {
        required: true
      },
      address_street_name: {
        required: true
      },
      address_suburb: {
        required: true
      },
      address_state: {
        required: true
      },
      card_number: {
        required: true,
        number: true
      },
      card_reference: {
        required: true
      }
    },
    messages: {
      gender: {
        required: 'You must check at least 1 box'
      }
    },
    hightlight: function(element) {
      $(element)
        .closest('.row-contact-details')
        .addClass('error');
    }
  });
  */
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
