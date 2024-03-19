"use strict";

/**
 * @brief Mapping Local Storage data from Status category
 * @param {*} page      : which page
 * @param {*} lsData    : data from Local Storage
 */
function mapping(page, lsData) {
  var returnVal = {};
  switch (page) {
    case "status-overview.html":
      break;
    case "status-pon_status.html":
      break;
    case "status-system_stats-lan_thr.html":
      break;
    case "status-system_stats-wan_thr.html":
      break;
    case "status-system_stats-wifi_thr.html":
      break;
    default:
      throw `[ERROR] ${page} is not available`;
  }
  return returnVal;
}

module.exports = { mapping };
