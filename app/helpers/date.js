/**
 * Date helper.
 */

var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/**
* Get current date.
*
* @return curDate
*/
exports.formatDate = function(date) {
  date = date || new Date;
  var month = date.getMonth();
  var day = date.getDay() + 1;
  var year = date.getFullYear();
  day = String(day).length < 2 ? '0' + day : day;
  return monthNames[month] + ' ' + day + ', ' + year;
}
