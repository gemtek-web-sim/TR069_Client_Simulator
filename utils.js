"use strict";

/**
 * Import
 */
const fs = require("fs");

// Custom
const advanced = require("./helper/mapping/advanced");
const basic = require("./helper/mapping/basic");
const security = require("./helper/mapping/security");
const status = require("./helper/mapping/status");
const utilities = require("./helper/mapping/utilities");
const voip = require("./helper/mapping/voip");
const wifi = require("./helper/mapping/wifi");

/**
 * ===========================================================
 *                    FUNCTION
 * ===========================================================
 */
/**
 * @brief Time stamp human readable
 */
function getHumanReadableTime() {
  try {
    console.log("\n=== utils.getHumanReadableTime() ===");
    // Get the current timestamp
    var currentDate = new Date();

    // Extract individual time components
    var hour = currentDate.getHours();
    var minute = currentDate.getMinutes();
    var second = currentDate.getSeconds();

    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1; // January is 0, so we add 1
    var year = currentDate.getFullYear();

    // human-readable time return
    return `${day}/${month}/${year}___${hour}:${minute}:${second}`;
  } catch (err) {
    throw `[ERROR] utils.getHumanReadableTime() fail, ${err}`;
  }
}

/**
 * @brief Mapping Local Storage format to data model format
 * @param {*} page    : which page
 * @param {*} lsData  : local Storage data
 */
function mappingDataModel(page, lsData) {
  try {
    console.log("\n=== utils.mappingDataModel() ===");
    // console.log(page);
    // console.log(lsData);

    if (typeof lsData !== "object")
      throw `[ERROR] utils.mappingDataModel() fail`;
    const retrieveCategory = page.split("-");
    switch (retrieveCategory[0]) {
      case "advanced":
        return advanced.mapping(page, lsData);
      case "basic":
        return basic.mapping(page.lsData);
      case "security":
        return security.mapping(page, lsData);
      case "status":
        return status.mapping(page, lsData);
      case "utilities":
        return utilities.mapping(page, lsData);
      case "voip":
        return voip.mapping(page, lsData);
      case "wifi":
        return wifi.mapping(page, lsData);
      default:
        throw `[Error] Category ${retrieveCategory[0]} is not available`;
    }
  } catch (err) {
    throw `[ERROR] utils.mappingDataModel() fail, ${err}`;
  }
}

/**
 * @brief Check if a file is empty or not
 * @param {*} filePath
 * @returns
 */
function isFileEmpty(filePath) {
  try {
    console.log("\n=== utils.isFileEmpty() ===");
    // console.log(filePath);

    // Get the file stats
    const stats = fs.statSync(filePath);

    // Check if the file size is 0
    return stats.size === 0;
  } catch (err) {
    // Handle file access errors or file not found errors
    throw `[Error] utils.isFileEmpty() fail, ${err}`;
  }
}

/**
 * @brief Create legal Device Data to connect ACS Server
 * @param {*} dataAtArrayOfObj: Array of Object in DB
 * @returns
 */
function createDeviceDataToSendACSServer(dataAtArrayOfObj) {
  try {
    console.log("\n=== utils.createDeviceDataToSendACSServer() ===");
    // console.log(dataAtArrayOfObj);

    let device = {};
    for (const row of dataAtArrayOfObj) {
      const isObject = row["Object"] === "true";
      let id = row["Parameter"];
      if (isObject) id += ".";

      device[id] = [row["Writable"] === "true"];
      if (!isObject) {
        device[id].push(row["Value"] || "");
        if (row["Value type"] != null) device[id].push(row["Value type"]);
      }
    }
    return device;
  } catch (err) {
    throw `[Error] utils.createDeviceDataToSendACSServer() fail, ${err}`;
  }
}

/**
 * @brief Generate unique serial number ID to connect ACS server: sim<randon_number>
 * @param {*} minID
 * @param {*} maxID 
 * @returns 
 */
function genSerialNumber(minID, maxID) {
  try {
    console.log("\n=== utils.getSerialNumber ===");
    // console.log(minID);
    // console.log(maxID);

    return (
      "sim" +
      (Math.floor(Math.random() * (maxID - minID + 1)) + minID).toString()
    );
  } catch (err) {
    throw `[ERROR] utils.genSerialNumber fail, ${err}`;
  }
}

/**
 * @brief Create ressponse to Frontend
 * @param {*} response_instance : instance of response
 * @param {*} status_code       : status code, reference https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 * @param {*} content           : content that content can capture at ressponse's body
 */
function sendResponseToFE(response_instance, status_code, content) {
  // catch error inside callback
  console.log(`>>> Response: `, content);
  response_instance.status(status_code).send({ content: content.toString() });
}

module.exports = {
  getHumanReadableTime,
  mappingDataModel,
  isFileEmpty,
  createDeviceDataToSendACSServer,
  sendResponseToFE,
  genSerialNumber,
};
