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
      $('input[name="title"]').val() +
      ' ' +
      $('input[name="first_name"]').val() +
      ' ' +
      $('input[name="last_name"]').val();

    if ($patient == '  ') {
      $('#patient_name')
        .contents()
        .last()
        .replaceWith('Thank you');
    } else {
      $('#patient_name')
        .contents()
        .last()
        .replaceWith($patient);
    }

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

  /*
   * Submit form with serialized form array
   *
   *
   */
  $('#submit-button').click(function(e) {
    $.post(
      '/medical-form/post.php',
      {
        name: $('form#medical-history-form').serializeArray()
      },
      function(output) {
        console.log(output['result']);
      },
      'json'
    );
    e.preventDefault();
  });

  // check if yes raido button checked
  $('.check-yes').click(function() {
    $detail_input = $(this)
      .parentsUntil('.block-with-detail')
      .siblings('.detail');

    if ($(this).is(':checked')) {
      $detail_input.find('input').attr('disabled', false);
      $detail_input.find('textarea').attr('disabled', false);
      $detail_input.removeClass('disabled');
    } else {
      $detail_input.find('input').attr('disabled', true);
      $detail_input.find('textarea').attr('disabled', true);
      $detail_input.addClass('disabled');
    }
  });
  // check if no raido button checked
  $('.check-no').click(function() {
    $detail_input = $(this)
      .parentsUntil('.block-with-detail')
      .siblings('.detail');

    if ($(this).is(':checked')) {
      $detail_input.find('input').attr('disabled', true);
      $detail_input.find('textarea').attr('disabled', true);
      $detail_input.addClass('disabled');
    } else {
      $detail_input.find('input').attr('disabled', false);
      $detail_input.find('textarea').attr('disabled', false);
      $detail_input.removeClass('disabled');
    }
  });

  // Date picker
  $('.input-group.date')
    .datepicker()
    .on('changeDate', function(ev) {
      var newDate = new Date(ev.date);

      $(this)
        .siblings('.input-date-day')
        .val(('0' + newDate.getDate()).slice(-2));
      $(this)
        .siblings('.input-date-month')
        .val(('0' + (newDate.getMonth() + 1)).slice(-2));
      $(this)
        .siblings('.input-date-year')
        .val(newDate.getFullYear());
    });

  //validate rules
  /*
  $('#medical-history-form').validate({
    rules: {
      date_of_birth_day: {
        required: true,
        number: true,
        exactlength: 2,
        min: 1,
        max: 31
      },
      date_of_birth_month: {
        required: true,
        number: true,
        exactlength: 2,
        min: 1,
        max: 12
      },
      date_of_birth_year: {
        required: true,
        number: true,
        exactlength: 4
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
      medicare_card_number: {
        required: true,
        number: true
      },
      medicare_card_reference: {
        required: true
      }
    },
    messages: {
      gender: {
        required: 'Please select at least 1 box'
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
// Added exacelength check
$.validator.addMethod(
  'exactlength',
  function(value, element, param) {
    if (this.optional(element)) {
      return true;
    }
    if ($.isArray(param)) {
      return $.inArray(value.length, param) != -1;
    } else {
      return value.length == param;
    }
  },
  function(param, input) {
    return $.validator.format(
      'Please enter exactly ' +
        ($.isArray(param) ? param.join() : param) +
        ' characters.'
    );
  }
);
