$(document).ready(function() {
  // Load each steps
  $('#step1').load('./html/step1.html');
  $('#complete').load('./html/complete.html');

  // Multi step form Wizard
  $('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
    var $target = $(e.target);

    if ($target.parent().hasClass('disabled')) {
      return false;
    }
  });

  // While clicking next step button
  $('.next-step').click(function(e) {
    // Validate form
    if (!$('#medical-history-form').valid()) {
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
    window.scrollTo(0, 0);
    nextTab($active);
  });

  $('.prev-step').click(function(e) {
    // Navigate to next page
    var $active = $('.wizard .nav-tabs li.active');
    window.scrollTo(0, 0);
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
        $('.wizard-inner').hide();
        $('.main--container').css('padding', 0);
        $('.tab-content').css('height', '100%');
        // Change complete info page if error
        // $('#complete').load('./html/error.html');
      },
      'json'
    );

    // Navigate to next page
    var $active = $('.wizard .nav-tabs li.active');
    $active.next().removeClass('disabled');
    nextTab($active);
  });

  // If 'yes' raido button checked, enable relative text input
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
  // If 'no' raido button checked, disable relative text input
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

  // Bootstrap Date picker
  $('.input-group.date')
    .datepicker({
      startDate: '+1d',
      autoclose: true
    })
    .on('changeDate', function(ev) {
      var newDate = new Date(ev.date);

      $(this)
        .siblings('div')
        .find('.input-date-day')
        .val(('0' + newDate.getDate()).slice(-2));
      $(this)
        .siblings('div')
        .find('.input-date-month')
        .val(('0' + (newDate.getMonth() + 1)).slice(-2));
      $(this)
        .siblings('div')
        .find('.input-date-year')
        .val(newDate.getFullYear());
    });

  // Limit date input only numbers
  $(
    '.input-date-day, .input-date-month, .input-date-year,input[name="medicare_card_number"],input[name="medicare_card_reference"]'
  ).on('keypress keyup blur', function(event) {
    $(this).val(
      $(this)
        .val()
        .replace(/[^\d].+/, '')
    );
    if (event.which < 48 || event.which > 57) {
      event.preventDefault();
    }
  });

  limitLen($('.input-date-day,.input-date-month'), 2);
  limitLen($('.input-date-year'), 4);
  limitLen($('input[name="medicare_card_number"]'), 10);
  limitLen($('input[name="medicare_card_reference"]'), 1);

  // Remove click button outliners
  document.addEventListener('keydown', function(e) {
    if (e.keyCode === 9) {
      $('body').addClass('show-focus-outlines');
    }
  });

  document.addEventListener('click', function(e) {
    $('body').removeClass('show-focus-outlines');
  });

  //Validate rules
  /*
  const current_year = new Date().getFullYear();
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
        exactlength: 4,
        max: current_year
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
        number: true,
        exactlength: 10
      },
      medicare_card_reference: {
        required: true
      },
      medication: {
        required: true
      },
      penicillin: {
        required: true
      },
      antibiotic: {
        required: true
      },
      recent_examination__day: {
        number: true,
        exactlength: 2,
        min: 1,
        max: 31
      },
      recent_examination__month: {
        number: true,
        exactlength: 2,
        min: 1,
        max: 12
      },
      recent_examination__year: {
        number: true,
        exactlength: 4
      }
    },
    messages: {
      gender: {
        required: 'Please select at least 1 box'
      },
      medication: {
        required: 'Please select at least 1 box'
      },
      penicillin: {
        required: 'Please select at least 1 box'
      },
      antibiotic: {
        required: 'Please select at least 1 box'
      }
    },
    errorPlacement: function(error, element) {
      error.insertAfter(element);
      if (element.attr('type') == 'radio') {
        error.appendTo(element.parentsUntil('.block', '.radio-button-row'));
      }
    },
    showErrors: function(errorMap, errorList) {
      // Check all form validate errors
      if (this.numberOfInvalids() > 0) {
        $('.form-error-alert').html(
          '<li class="error">* Your form contains ' +
            this.numberOfInvalids() +
            ' errors, see details above.</li>'
        );
      } else {
        $('.form-error-alert').html('');
      }
      this.defaultShowErrors();
    }
  });
  */

  // multiple rules
  $('textarea').each(function() {
    $(this).rules('add', {
      maxlength: 500
    });
  });
  $('.short-input').each(function() {
    $(this).rules('add', {
      maxlength: 10
    });
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

// Limit element length
function limitLen(elem, len) {
  $(elem).on('keypress keyup blur', function(event) {
    $(this).val(
      $(this)
        .val()
        .replace(/[^\d].+/, '')
    );
    let text_length = $(event.target).val().length;
    if (text_length > len - 1) {
      event.preventDefault();
    }
  });
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
