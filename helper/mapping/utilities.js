"use strict";

/**
 * @brief Mapping Local Storage data from Utilities category
 * @param {*} page      : which page
 * @param {*} lsData    : data from Local Storage
 */
function mapping(page, lsData) {
  var returnVal = {};
  switch (page) {
    case "utilities-diagnostics.html":
      break;
    case "utilities-speed_test.html":
      break;
    case "utilities-system-backup.html":
      break;
    case "utilities-system-log_rule-edit.html":
      break;
    case "utilities-system-log_rule.html":
      break;
    case "utilities-system-time.html":
      break;
    case "utilities-system-user_mgnt-edit.html":
      break;
    case "utilities-system-user_mgnt.html":
      break;
    case "utilities-update_fw.html":
      break;
    default:
      throw `[ERROR] ${page} is not available`;
  }
  return returnVal;
}

module.exports = { mapping };
