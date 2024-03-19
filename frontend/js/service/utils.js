const PORT = 8888;
const HOST = "localhost";
const URL_ = `http://localhost:${PORT}`;
const SET_URL = `${URL_}/be_set`;
const GET_URL = `${URL_}/be_get`;

/**
 * Error defination
 */
const NON_OBJ_ERROR = "Fail at creating Request. Payload is not a object";

/**
 * @TODO 
 */
function createGETRequest(command, payload) {
  return new Promise((resolve, reject) => {
    if (typeof payload !== "object") {
      reject(NON_OBJ_ERROR);
    }
    // transfer payload to GET query
    payload.command = command;
    const queryParams = URLSearchParams(payload);
    const url = `${SET_URL}?${queryParams.toString()}`;
    console.log("Send GET request ", url);
    // send request
    fetch(url).then((response) => {
      console.log("Response from Backend ", response);
      resolve(response.json());
    });
  });
}

/**
 * Create GET request to server with payload is the data at body of request
 * @param {*} page    : current page where send request
 * @param {*} command : is COMMAND.<>
 * @param {*} payload : strcuture of payload is
 * {
 *  command:
 *  page:
 *  data: {
 *    <localStorage Data>
 *  }
 * }
 * @returns
 */
function createPOSTRequest(page, command, payload) {
  return new Promise(async (resolve, reject) => {
    // check if payload at object type
    if (typeof payload !== "object") {
      reject(NON_OBJ_ERROR);
    }

    // pacet the request body
    var data = {};
    data.command = command;
    data.page = page;
    data.data = payload;

    console.log("Send POST request ", SET_URL);

    const option = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    };

    // send request
    const response = await fetch(SET_URL, option);
    const response_data = await response.json();
    console.log(response_data);
    resolve(response);
  });
}
