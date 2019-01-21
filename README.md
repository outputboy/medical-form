### Added complete and error form page

- Complete page will show after submit
- Error page is not displayed here but set in jQuery post callbacks for further integration
- Simply change
  `$('#complete').load('./html/complete.html')`
  to
  `$('#complete').load('./html/error.html')`
  in medical-form.js will show error page after submit

### Medical form

- Please view index.html
- Sample php file for return post value
- Multi step form is developed with Bootstrap & jQuery
- Validation using jQuery validate
- Datepicker using Bootstrap Datepicker

### Input length limit is currently set to 30, textarea length limit is 500
