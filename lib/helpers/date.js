/**
 * Date helper.
 */

var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var date = new Date();
var month = date.getMonth();
var day = date.getDay() + 1;
var year = date.getFullYear();

/**
* Get current date.
*
* @return curDate
*/
exports.getDate = function() {
  var dayw = String(day).length < 2 ? '0' + day : day;
  return monthNames[month] + ' ' + dayw + ', ' + year;
}
