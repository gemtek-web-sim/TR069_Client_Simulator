"use strict";

/**
 * @brief Mapping Local Storage data from Wifi category
 * @param {*} page      : which page
 * @param {*} lsData    : data from Local Storage
 */
function mapping(page, lsData) {
  var returnVal = {};
  switch (page) {
    case "wifi-2_4G-config.html":
      break;
    case "wifi-2_4G-mac_filtering.html":
      break;
    case "wifi-2_4G-ssids.html":
      break;
    case "wifi-2_4G-statistics.html":
      break;
    case "wifi-2_4G-wds.html":
      break;
    case "wifi-2_4G-wps.html":
      break;
    case "wifi-5G-config.html":
      break;
    case "wifi-5G-mac_filter.html":
      break;
    case "wifi-5G-ssids.html":
      break;
    case "wifi-5G-statistics.html":
      break;
    case "wifi-5G-wds.html":
      break;
    case "wifi-5G-wps.html":
      break;
    case "wifi-guest_access-add.html":
      break;
    case "wifi-guest_access.html":
      break;
    default:
      throw `[ERROR] ${page} is not available`;
  }
  return returnVal;
}

module.exports = { mapping };
