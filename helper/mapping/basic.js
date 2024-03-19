"use strict";

/**
 * @brief Mapping Local Storage data from Basic category
 * @param {*} page      : which page
 * @param {*} lsData    : data from Local Storage
 */
function mapping(page, lsData) {
  var returnVal = {};
  switch (page) {
    case "basic-lan-dev_connected.html":
      break;
    case "basic-lan-ipv4Config.html":
      break;
    case "basic-lan-ipv6Config.html":
      break;
    case "basic-registration_ID.html":
      break;
    case "basic-wan-addWAN.html":
      break;
    case "basic-wan-ipv4.html":
      break;
    case "basic-wan-ipv6.html":
      break;
    default:
      throw `[ERROR] ${page} is not available`;
  }
  return returnVal;
}

module.exports = { mapping };
