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
 * @brielf reload to update newest value without the older
 * @returns Resolve if load database no encounter any errors
 */
function reloadDatabase() {
  return new Promise((resolve, reject) => {
    getDBinstance().loadDatabase((err) => {
      if (err) reject(`[ERROR] dbService.reloadDatabase() fail, ${err}`);
      console.log("==========> Reload DB success");
      resolve();
    });
  });
}

/**
 * @param {*} key   : Parameter
 * @param {*} value : Value
 * @brief insert 1 document to DB
 */
function addOneValue(key, value) {
  return new Promise((resolve, reject) => {
    try {
      // console.log("\n === dbService.addOneValue() ===");
      // console.log(`ADD --- Param: ${key}, Val: ${value}`);

      // Add - Insert new one
      getDBinstance().insert(
        {
          Parameter: key,
          Object: value[0],
          Writable: value[1],
          Value: value[2],
          "Value type": value[3],
        },
        function (error, newDoc) {
          if (error) {
            reject(
              `[ERROR] dbService.addOneValue: getDBinstance().insert() fail, ${error}`
            );
          }
          resolve();
        }
      );
    } catch (err_) {
      reject`[Error] dbService.addOneValue() fail, ${err_}`;
    }
  });
}

/**
 * @param {*} key   : Parameter
 * @param {*} value : Value
 * @brief modify the existed document in DB
 * @return reject if no document be modified (numReplaced == 0)
 */
function modOneValue(key, value) {
  return new Promise((resolve, reject) => {
    try {
      // console.log("\n === dbService.modOneValue() ===");
      // console.log(`MODIFY --- Param: ${key}, Val: ${value}`);

      getDBinstance().update(
        { Parameter: key },
        { $set: { Value: value[2] } },
        {},
        function (error, numReplaced) {
          if (error)
            reject(
              `[ERROR] dbService.modOneValue: getDBinstance().update() fail, ${error}`
            );
          if (numReplaced == 0)
            reject(
              `[ERROR] dbService.modOneValue: Cannot find the Parameter: ${key} to modify`
            );
          resolve();
        }
      );
    } catch (err_) {
      reject`[Error] dbService.modOneValue() fail, ${err_}`;
    }
  });
}

/**
 * @param {*} key
 * @brief delete all the KEY PATTERN (not only the Paramter itself)
 *        Ex: key = "Device.IPv4" ==> key Pattern /^Device.IPv4/ (https://www.programiz.com/javascript/regex)
 *        ==> It will delete: Device.IPv4.Static.1, Device.IPv4.Static.2, Device.IPv4.Static.1.Pool, ...
 */
function delOneValue(key) {
  return new Promise((resolve, reject) => {
    try {
      // console.log(`\n === dbService.delOneValue() ===`);
      // console.log(`DELETE --- Obj Param: ${key}`);

      const regrexParam = new RegExp(`^${key}`);
      getDBinstance().remove(
        { Parameter: { $regex: regrexParam } },
        { multi: true },
        (err, numRemoved) => {
          if (err)
            reject(
              `[ERROR] dbService.delOneValue: getDBinstance.remove() fail, ${err}`
            );
          if (numRemoved == 0)
            reject(
              `[ERROR] dbService.delOneValue cannot find Object Parameter: ${key} to remove`
            );
          console.log("Delete One successfully");
          resolve();
        }
      );
    } catch (err_) {
      reject`[Error] dbService.delOneValue() fail, ${err_}`;
    }
  });
}

/**
 *
 * @param {*} keyArray : Array of "matching key" you want to delete
 * @brief traverse all the key to delete the KEY PATTERN
 */
async function delValue(keyArray) {
  try {
    console.log(`\n === dbService.delValue() ===`, keyArray);

    for (const key of keyArray) {
      await delOneValue(key);
    }
  } catch (err_) {
    throw `[Error] dbService.delValue() fail, ${err_}`;
  }
}

/**
 *
 * @param {*} objectData : object with key is Paramerter, value is an array of "mapping template" (first comment of helper.mapping.<*.js>)
 * @brief add all the Parameters are the keys of objectData
 */
async function addValue(objectData) {
  try {
    console.log(`\n === dbService.addValue() ===`, objectData);

    for (const [key, value] of Object.entries(objectData)) {
      await addOneValue(key, value);
    }
  } catch (err) {
    throw `[ERROR] dbService.addValue() fail, ${err}`;
  }
}

/**
 *
 * @param {*} objectData : object with key is Paramerter, value is an array of "mapping template" (first comment of helper.mapping.<*.js>)
 * @brief modify all the Parameters are the keys of objectData
 */
async function modValue(objectData) {
  try {
    console.log(`\n=== dbService.modValue() ===`, objectData);

    for (const [key, value] of Object.entries(objectData)) {
      await modOneValue(key, value);
    }
  } catch (err) {
    throw `[ERROR] dbService.modValue() fail, ${err}`;
  }
}

/**
 *
 * @param {*} objectData : object with key is Paramerter, value is an array of "mapping template" (first comment of helper.mapping.<*.js>)
 * @param {*} oldLength  : is the subOption from request.body (the old length of data array before Apply)
 * @returns
 */
function complexValueHandler(objectData, oldLength) {
  return new Promise(async (resolve, reject) => {
    try {
      const complexPrefix = objectData.complexPrefix;
      const complexData = objectData.complexPart;
      const currentLength = objectData.complexPartLength;
      delete objectData.complexPartLength;
      delete objectData.complexPart;
      delete objectData.complexPrefix;

      // console.log(`=== dbService.complexValueHandler(), oldLength: ${oldLength}, currentLength: ${currentLength}`);
      // console.log(`complexData`, complexData);
      // console.log(`normalData`, objectData);

      let deletedObj = []; // delete all abundant object

      await modValue(objectData); // modify all "uncomplex" data
      if (oldLength === 0) {
        // case add all new
        await addValue(complexData);
      } else if (currentLength === 0) {
        // case delete all
        for (const prefix of complexPrefix) {
          deletedObj.push(prefix);
        }
        await delValue(deletedObj);
      } else if (oldLength > currentLength) {
        // case delete some
        await modValue(complexData);
        // Parameter will be deleted
        for (var i = currentLength; i < oldLength; i++) {
          for (const prefix of complexPrefix) {
            deletedObj.push(`${prefix}.${i + 1}`);
          }
        }
        await delValue(deletedObj);
      } else if (oldLength < currentLength) {
        // case add some
        // Parameter will be added
        // 1. split the old objects
        const specificKeyPattern = new RegExp(
          `^${complexPrefix[0]}.${parseInt(oldLength) + 1}`
        );

        const entries = Object.entries(complexData);
        const index = entries.findIndex(([key]) =>
          specificKeyPattern.test(key)
        );
        // 2. take from the added object to the end
        const modifiedObjects = Object.fromEntries(entries.slice(0, index));
        const addedObjects = Object.fromEntries(entries.slice(index));
        await modValue(modifiedObjects);
        await addValue(addedObjects);
      } else if (oldLength == currentLength) {
        await modValue(complexData); // modify all "complex" data
      }
      resolve();
    } catch (err) {
      reject(`[ERROR] dbService.complexValueHandler() fail, ${err}`);
    }
  });
}

/**
 *
 * @param {*} filter    : check https://github.com/louischatriot/nedb
 * @param {*} callback  : so you can define next actions right where you invoke this function
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
  addValue,
  modValue,
  delValue,
  complexValueHandler,
  reloadDatabase,
  getValue,
  initDB,
  getDBinstance,
  createDBinstance,
};
