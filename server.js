/**
 * @TODO: Require npm packages & utils function
 */
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');

const utils = require("./utils");


/**
 * @TODO: Define const variables
 */
const PORT = process.env.PORT || 8000;

/**
 * Init server, serve front-end
 */
const app = express();

// console.log(process);

// serve FrontEnd folder
app.use(express.static(path.join(__dirname, "FrontEnd")));
app.use(bodyParser.json());


// listen req on [PORT]
app.listen(PORT, () => {
  console.log(`\n\n===== Server start ${utils.getHumanReadableTime()} =====`);
  console.log(`===== On ${PORT} =====`);
});

app.post("/tr069", async (request, response) => {
  try {
    console.log(`\n== Request at ${utils.getHumanReadableTime()}`);
    console.log("Receive data from WebUI ", request.body);

    response.status(200).send({content: "Server read data successfully"})
  } catch (error) {
    console.log(`[ERROR]`, error);
    response.status(503).send({content: error.toString()})
  }
});
