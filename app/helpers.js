var date = require('./helpers/date');

function Helpers() {
  this.name = 'Locals Helpers';

  this.attach = function(options) {
    var app = options.app;

    // HTML helpers
    app.locals.H = {
      formatDate: date.formatDate
    };
  }
}


module.exports = Helpers;
