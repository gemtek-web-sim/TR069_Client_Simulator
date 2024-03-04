/**
 * Time stamp human readable
 */
function getHumanReadableTime() {
  // Get the current timestamp
  var currentDate = new Date();

  // Extract individual time components
  var hour = currentDate.getHours();
  var minute = currentDate.getMinutes();
  var second = currentDate.getSeconds();

  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1; // January is 0, so we add 1
  var year = currentDate.getFullYear();

  // human-readable time return
  return `${day}/${month}/${year}___${hour}:${minute}:${second}`;

}

module.exports = {getHumanReadableTime}
