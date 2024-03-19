"use strict";

/**
 * @brief Mapping Local Storage data from VoIP category
 * @param {*} page      : which page
 * @param {*} lsData    : data from Local Storage
 */
function mapping(page, lsData) {
  var returnVal = {};
  switch (page) {
    case "voip-config.html":
      break;
    default:
      throw `[ERROR] ${page} is not available`;
  }
  return returnVal;
}

module.exports = { mapping };
