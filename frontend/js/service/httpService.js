/**
 * HTTP Code
 * @link: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses
 */
const HTTP_OK = 200;
const HTTP_INTERNAL_SERVER_ERROR = 500;

const COMMAND = {
  CONNECT_ACS: "CONNECT_ACS", // send data at Apply action    (FE -> BE & response back)
  SEND_INFORM: "SEND_INFORM", // send inform actively         (FE -> BE, POST)
  USER_CONFIG_DATA: "USER_CONFIG_DATA", // get data  from               (FE -> BE & response back)
};

const httpService = {
  send_GET_Request: function (command, payload) {
    console.log("GET request: command, payload", command, payload);
    try {
      createGETRequest(command, payload).then((response) => {
        console.log(">> ===== Server service done !!!\n");
      });
    } catch (err) {
      console.error(err);
    } finally {
      return;
    }
  },
  send_POST_Request: function (page, command, payload, lsDB_data) {
    // block screen by "Please wait"
    const ajaxLoaderSection = document.getElementById("ajaxLoaderSection");
    ajaxLoaderSection.style.display = "block";

    try {
      createPOSTRequest(page, command, payload).then((response) => {
        console.log(">> Response from server ", response);

        // Status 200
        if (response.ok) {
          // load data to Local Storage if no error
          applyThenStoreToLS(page, "Apply", lsDB_data);
          ajaxLoaderSection.style.display = "none";
        } else {
          console.error("[ERROR] ", response.statusText);
          ajaxLoaderSection.style.display = "none";
          alert(`Server response: ${response.status} - ${response.statusText}`);
        }
      });
    } catch (err) {
      ajaxLoaderSection.style.display = "none";
      alert("[Error]");
      console.error("[ERROR] ", err);
    } finally {
      return;
    }
  },
};
