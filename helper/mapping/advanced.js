"use strict";

/**
 * @brief Mapping Local Storage data from Advanced category
 * @param {*} page      : which page
 * @param {*} lsData    : data from Local Storage
 */
function mapping(page, lsData) {
  console.log("\n=== helper.mapping.advanced.mapping() ===");
  var returnVal = {};
  switch (page) {
    case "advanced-alg.html":
      break;
    case "advanced-ddns.html":
      break;
    case "advanced-device_management.html":
      returnVal = {
        "Device.ManagementServer.EnableCWMP": lsData.EnaCWMP,
        "Device.ManagementServer.URL": lsData.ACSURL,
        "Device.ManagementServer.Username": lsData.ACSUsername,
        "Device.ManagementServer.Password": lsData.ACSPassword,
        "Device.ManagementServer.PeriodicInformEnable": lsData.EnaPerodic,
        "Device.ManagementServer.PeriodicInformInterval":
          lsData.PerodicInterval,
        "Device.ManagementServer.X_GTK_Interface": lsData.LocalWANInterface,
        "Device.ManagementServer.ConnectionRequestUsername":
          lsData.ConnectionReqUsername,
        "Device.ManagementServer.ConnectionRequestPassword":
          lsData.ConnectionReqPasword,
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
