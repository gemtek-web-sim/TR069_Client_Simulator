"use strict";

/**
 * Import
 */
const csvParser = require("./helper/csv-parser");
const fs = require("fs");
const path = require("path");
const neDB = require("nedb");
const utils = require("./utils.js");

// init DB
let db = undefined;

/**
 * Decalration const
 */
const DATA_MODEL_SOURCE = "./database/Data_Model_Gemtek.csv";
const DB_PATH = "./database/db_data_model.db";

/**
 * @brief init DB if it has not yet created, should invoke it at first from server.js
 */
function createDBinstance() {
  if (db === undefined) db = new neDB({ filename: DB_PATH, autoload: true });
}

/**
 * @brief return DB instance
 * @returns getDBinstance() instance
 */
function getDBinstance() {
  if (db === undefined) db = new neDB({ filename: DB_PATH, autoload: true });
  return db;
}

/**
 * @brief return Promise for set one value
 */
function setOneValue(key, value) {
  return new Promise((resolve, reject) => {
    try {
      // console.log("\n === dbService.setOneValue() ===");
      // console.log(getDBinstance());
      // console.log(objectData);

      getDBinstance().findOne({ Parameter: key }, function (err, docs) {
        // console.log(docs);
        if (err) reject(`[ERROR] getDBinstance().findOne() fail, ${err}`);
        if (docs["Value"] != value) {
          getDBinstance().update(
            { _id: docs["_id"] },
            { $set: { Value: value } },
            {},
            function (error, numReplaced) {
              if (error)
                reject(`[ERROR] getDBinstance().update() fail, ${error}`);

              resolve();
            }
          );
        }
        resolve();
      });
    } catch (err_) {
      reject`[Error] dbService.setOneValue() fail, ${err_}`;
    }
  });
}

/**
 * @brief Set value to DB
 * @param {*} objectData  : data want to change
 * @returns
 */
function setValue(objectData) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("\n === dbService.setValue() ===");
      // console.log(getDBinstance());
      // console.log(objectData);

      if (typeof objectData !== "object")
        reject(`[ERROR] dbService.setValue() objectData is not in object type`);

      // to DB
      for (const [key, value] of Object.entries(objectData)) {
        await setOneValue(key, value);
      }
      resolve();
    } catch (err) {
      reject(`[ERROR] dbService.setValue() fail, ${err}`);
    }
  });
}

/**
 *
 * @param {*} filter: check https://github.com/louischatriot/nedb
 * @param {*} callback
 */
function getValue(filter, callback) {
  getDBinstance().find(filter, function (err, docs) {
    callback(err, docs);
  });
}

/**
 * @brief Init DB if the getDBinstance() empty
 * @returns
 */
function initDB() {
  return new Promise((resolve, reject) => {
    try {
      utils.createFile(DB_PATH); // already check file exist

      if (utils.isFileEmpty(DB_PATH)) {
        console.log("\n=== dbService.initDB ===");
        // console.log(getDBinstance());

        // read csv file then write it to DB
        const data = fs.readFileSync(DATA_MODEL_SOURCE);
        if (path.parse(DATA_MODEL_SOURCE).ext.toLowerCase() === ".csv") {
          const rows = csvParser.reduce(csvParser.parseCsv(data.toString()));
          // Insert new DB
          getDBinstance().insert(rows, function (err, newDocs) {
            if (err) reject(`[Error] getDBinstance().insert() fail, ${err}`);
            console.log("Make new Database -- Insert success");
            resolve();
          });
        }
      }
    } catch (err) {
      reject(`[Error] dbService.initDB() fail, ${err}`);
    }
  });
}

module.exports = {
  setValue,
  getValue,
  initDB,
  getDBinstance,
  createDBinstance,
};
