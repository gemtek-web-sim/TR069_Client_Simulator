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
  var returnVal = {};
  console.log(`== helper.mapping.basic, mapping for ${page} with subOption: ${subOption} ===`);
  switch (page) {
    case "basic-lan-dev_connected.html":
      // for (const index in lsData) {
      //   if (lsData.hasOwnProperty(index)) {
      //     const element = lsData[index];
      //     const obj = `Device.Hosts.Host.${index}`;
      //     returnVal[`${obj}`]             = ["true", "false", "", ""];
      //     returnVal[`${obj}.HostName`]    = ["false", "true", element.HostName, "xsd::string"];
      //     returnVal[`${obj}.PhysAddress`] = ["false", "true", element.MACAddress, "xsd::string"];
      //     returnVal[`${obj}.IPAddress`]   = ["false", "true", element.IPAddress, "xsd::string"];
      //   }
      // }
      break;
    case "basic-lan-ipv4Config.html":
      var complexPrefix = ["Device.DHCPv4.Server.Pool.1.StaticAddress"];
      returnVal = {
        "Device.IP.Interface.1.IPv4Address.1.IPAddress" : ["false", "true", lsData.DeviceIPAddress, "xsd::string"],
        "Device.IP.Interface.1.IPv4Address.1.SubnetMask": ["false", "true", lsData.SubnetMask, "xsd::string"],
        "Device.DHCPv4.Server.Pool.1.Enable"            : ["false", "true", lsData.DHCPMode, "xsd::string"],
        "Device.DHCPv4.Server.Pool.1.MinAddress"        : ["false", "true", lsData.BeginAddress, "xsd::string"],
        "Device.DHCPv4.Server.Pool.1.MaxAddress"        : ["false", "true", lsData.EndAddress, "xsd::string"],
        "Device.DHCPv4.Server.Pool.1.LeaseTime"         : ["false", "true", lsData.LeaseTime, "xsd::string"],
      };
      returnVal.complexPart = {};
      returnVal.complexPrefix = complexPrefix;
      returnVal.complexPart[`${complexPrefix}`] = ["true", "true", "", "xsd::string"];
      returnVal.complexPartLength = lsData.IPAddressReservation.length;
      lsData.IPAddressReservation.forEach((element, index) => {
        const obj = `${complexPrefix}.${index + 1}`;
        returnVal.complexPart[`${obj}`]           = ["true", "true", "", "xsd::string"];
        returnVal.complexPart[`${obj}.Chaddr`]    = ["false", "true", element.MAC, "xsd::string"];
        returnVal.complexPart[`${obj}.Yiaddr`]    = ["false", "true", element.IP, "xsd::string"];
      });
      break;
    case "basic-lan-ipv6Config.html":
      returnVal = {
        "Device.X_GTK_IPv6.Enable"                      : ["false", "true", lsData.Enable, "xsd::boolean"],
        "Device.X_GTK_IPv6.LANMode"                     : ["false", "true", lsData.AutoConfigurationMode, "xsd::string"],
        "Device.IP.ULAPrefix"                           : ["false", "true", lsData.Prefix, "xsd::string"],
        "Device.X_GTK_IPv6.X_GTK_PRI_DNSv6"             : ["false", "true", lsData.PrimaryDNSv6, "xsd::string"],
        "Device.X_GTK_IPv6.X_GTK_SEC_DNSv6"             : ["false", "true", lsData.SecondaryDNSv6, "xsd::string"],
        "Device.X_GTK_IPv6.Domain"                      : ["false", "true", lsData.EndAddress, "xsd::string"],
      };
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
  console.log(returnVal);
  return returnVal;
}

module.exports = { mapping };
