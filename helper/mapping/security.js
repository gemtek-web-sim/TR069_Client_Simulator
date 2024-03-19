"use strict";

/**
 * @brief Mapping Local Storage data from Security category
 * @param {*} page      : which page
 * @param {*} lsData    : data from Local Storage
 */
function mapping(page, lsData) {
  var returnVal = {};
  switch (page) {
    case "security-firewall.html":
      break;
    case "security-parental_control_settings.html":
      break;
    case "security-parental_control-devControl-add.html":
      break;
    case "security-parental_control-devControl.html":
      break;
    default:
      throw `[ERROR] ${page} is not available`;
  }
  return returnVal;
}

module.exports = { mapping };
