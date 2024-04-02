"use strict";

/**
 * Import
 */
const csvParser = require("./helper/csv-parser");
const fs = require("fs");
const path = require("path");

/**
 * Decalration const
 */
const DATA_MODEL_SOURCE = "./database/Data_Model_Gemtek.csv";

/**
 * @brief return Promise for set one value
 * @param {*} db
 * @param {*} objectData
 */
function setOneValue(db, key, value) {
  return new Promise((resolve, reject) => {
    try {
      // console.log("\n === dbService.setOneValue() ===");
      // console.log(db);
      // console.log(objectData);

      db.findOne({ Parameter: key }, function (err, docs) {
        // console.log(docs);
        if (err) reject(`[ERROR] db.findOne() fail, ${err}`);
        if (docs["Value"] != value) {
          db.update(
            { _id: docs["_id"] },
            { $set: { Value: value } },
            {},
            function (error, numReplaced) {
              if (error) reject(`[ERROR] db.update() fail, ${error}`);

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
 * @param {*} db          : database instance
 * @param {*} objectData  : data want to change
 * @returns
 */
function setValue(db, objectData) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("\n === dbService.setValue() ===");
      // console.log(db);
      // console.log(objectData);

      if (typeof objectData !== "object")
        reject(`[ERROR] dbService.setValue() objectData is not in object type`);

      // to DB
      for (const [key, value] of Object.entries(objectData)) {
        await setOneValue(db, key, value);
      }
      resolve();
    } catch (err) {
      reject(`[ERROR] dbService.setValue() fail, ${err}`);
    }
  });
}

// @TODO
function getValue(key) {
  return value;
}

/**
 * @brief Init DB if the .db empty
 * @param {*} db : database instance
 * @returns
 */
function initDB(db) {
  return new Promise((resolve, reject) => {
    try {
      console.log("\n=== dbService.initDB ===");
      // console.log(db);

      // read csv file then write it to DB
      const data = fs.readFileSync(DATA_MODEL_SOURCE);
      if (path.parse(DATA_MODEL_SOURCE).ext.toLowerCase() === ".csv") {
        const rows = csvParser.reduce(csvParser.parseCsv(data.toString()));
        // Insert new DB
        db.insert(rows, function (err, newDocs) {
          if (err) reject(`[Error] db.insert() fail, ${err}`);
          console.log("Make new Database -- Insert success");
          resolve();
        });
      }
    } catch (err) {
      reject(`[Error] dbService.initDB() fail, ${err}`);
    }
  });
}

module.exports = { setValue, getValue, initDB };
