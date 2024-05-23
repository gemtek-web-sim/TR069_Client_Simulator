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
function mapping(command, page, lsData, subOption) {
  console.log("\n=== helper.mapping.advanced.mapping() ===");
  var returnVal = {};
  switch (page) {
    case "advanced-alg.html":
      break;
    case "advanced-ddns.html":
      break;
    case "advanced-device_management.html":
      returnVal = {
        "Device.ManagementServer.EnableCWMP"                : ["false", "true", lsData.EnaCWMP, "xsd::string"],
        "Device.ManagementServer.URL"                       : ["false", "true", lsData.ACSURL, "xsd::string"],
        "Device.ManagementServer.Username"                  : ["false", "true", lsData.ACSUsername, "xsd::string"],
        "Device.ManagementServer.Password"                  : ["false", "true", lsData.ACSPassword, "xsd::string"],
        "Device.ManagementServer.PeriodicInformEnable"      : ["false", "true", lsData.EnaPerodic, "xsd::string"],
        "Device.ManagementServer.PeriodicInformInterval"    : ["false", "true", lsData.PerodicInterval, "xsd::string"],
        "Device.ManagementServer.X_GTK_Interface"           : ["false", "true", lsData.LocalWANInterface, "xsd::string"],
        "Device.ManagementServer.ConnectionRequestUsername" : ["false", "true", lsData.ConnectionReqUsername, "xsd::string"],
        "Device.ManagementServer.ConnectionRequestPassword" : ["false", "true", lsData.ConnectionReqPasword, "xsd::string"],
      };
      break;
    case "advanced-dmz.html":
      break;
    case "advanced-multicast-ipv4Setting.html":
      break;
    case "advanced-multicast.html":
      break;
    case "advanced-port_mapping-add.html":
      break;
    case "advanced-port_mapping.html":
      break;
    case "advanced-port_triggering-add.html":
      break;
    case "advanced-port_triggering.html":
      break;
    case "advanced-static_routing-add.html":
      break;
    case "advanced-static_routing-ipv6Config-add.html":
      break;
    case "advanced-static_routing-ipv6Config.html":
      break;
    case "advanced-static_routing.html":
      break;
    case "advanced-upnp.html":
      break;
    case "advanced-vpn-add.html":
      break;
    case "advanced-vpn.html":
      break;
    default:
      throw `[ERROR] ${page} is not available`;
  }
  console.log("Mapping data: ", returnVal);
  return returnVal;
}

module.exports = { mapping };
