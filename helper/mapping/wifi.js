"use strict";

/**
 * @NOTE Mapping template:
 *          [Object, Writable, Value, Value type]
 *      Ex: ["true", "false", lsData.ACSURL, "xsd::string"]
 */

/**
 * @brief Mapping Local Storage data from Advanced category
 * @param {*} command   : command from FE
 * @param {*} page      : which page
 * @param {*} lsData    : data from Local Storage
 * @param {*} subOption    : 
 *        ADD      : the OLD LENGTH of the array data before Apply or the NEXT INDEX (depend on how you like to index the mapping data model)
 *        MODIFY   : the modified index
 *        DELETE   : the OLD LENGTH of the array data before Apply
 *        COMPLEX  : the OLD LENGTH of the array data before Apply
 */
function mapping(command, page, lsData, oldLength) {
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
