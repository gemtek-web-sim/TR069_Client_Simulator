"use strict";

/**
 * @TODO: Require npm packages & utils function
 */
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const neDB = require("nedb");
const fs = require("fs");

// Custom module
const utils = require("./utils.js");
const dbService = require("./dbService");
const csv_parser = require("./helper/csv-parser.js");
const xml_parser = require("./helper/xml-parser.js");
const xml_utils = require("./helper/xml-utils.js");

// genieacs
const genieacsClient = require("./genieacs-sim/simulator.js");

/**
 * @TODO: Define const variables
 */
const PORT = 8888;
const COMMAND = {
  CONNECT_ACS: "CONNECT_ACS", // send data at Apply action    (FE -> BE & response back)
  SEND_INFORM: "SEND_INFORM", // send inform actively         (FE -> BE, POST)
  USER_CONFIG_DATA: "USER_CONFIG_DATA", // get data  from               (FE -> BE & response back)
};
const DB_PATH = "./database/db_data_model.db";

/**
 * ==================================================
 *                    Init server
 * ==================================================
 */
const app = express();

// console.log(process);

// serve FrontEnd folder
app.use(express.static(path.join(__dirname, "frontend")));
app.use(bodyParser.json());

// listen req on [PORT]
app.listen(PORT, () => {
  console.log(`\n\n===== Server start ${utils.getHumanReadableTime()} =====`);
  console.log(`===== On ${PORT} =====`);
});

// init DB
const db = new neDB({ filename: DB_PATH, autoload: true });
if (utils.isFileEmpty("./database/db_data_model.db")) {
  dbService.initDB(db);
}

/**
 * ===================================================
 *                   Handle request
 * ===================================================
 */
/**
 * POST request handler
 */
app.post("/be_set", async (request, response) => {
  try {
    console.log(`\n== Request at ${utils.getHumanReadableTime()}`);
    console.log("Receive data from WebUI ", request.body);
    const inform = utils.mappingDataModel(request.body.page, request.body.data);
    await dbService.setValue(db, inform);
    switch (request.body.command) {
      case COMMAND.CONNECT_ACS:
        // @TODO
        db.find({}, function (err, docs) {
          try {
            if (err) throw `[ERROR] db.find fail, ${err}`;
            // start connection
            if (request.body.data.EnaCWMP === true) {
              // get acs URL directly from Client request instead of read from DB
              const acsurl = request.body.data.ACSURL;
              const dataModel = utils.createDeviceDataToSendACSServer(docs);
              const serialNumber = utils.genSerialNumber(0, 999999);
              genieacsClient.start(dataModel, serialNumber, acsurl, response);
            } else genieacsClient.end(response);
          } catch (err) {
            // catch error inside callback
            utils.sendResponseToFE(response, 500, err);
          }
        });
        break;
      case COMMAND.SEND_INFORM:
        // @TODO
        break;
      case COMMAND.USER_CONFIG_DATA:
        console.log("CONFIG DATA ==========");
        // @TODO
        break;
      default:
        // if command idd not available --> 400: Bad request from client
        utils.sendResponseToFE(
          response,
          400,
          `Command ${request.body.command} is not supported`
        );
    }
  } catch (error) {
    // if encouter any error --> response HTPP Code 500: Internal Server Error
    utils.sendResponseToFE(response, 500, err);
  }
});

/**
 * GET request handler
 * @TODO
 */
app.get("/be_get", async (request, response) => {
  try {
    console.log(`\n== Request at ${utils.getHumanReadableTime()}`);
    console.log("Receive data from WebUI ", request.body);

    response
      .status(200)
      .send({ content: "Server handle GET request successfully" });
  } catch (error) {
    // if encouter any error --> response HTPP Code 500: Internal Server Error
    console.error(`[ERROR]`, error);
    response.status(500).send({ content: error.toString() });
  }
});
