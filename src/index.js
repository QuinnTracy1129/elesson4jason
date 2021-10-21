import React from "react";
import ReactDOM from "react-dom";
import DashApp from "./dashApp";
import registerServiceWorker from "./registerServiceWorker";

import axios from "axios";

// axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.baseURL = "https://jasonelesson.herokuapp.com/";
axios.defaults.withCredentials = true;
let token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

ReactDOM.render(<DashApp />, document.getElementById("root"));

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./dashApp.js", () => {
    const NextApp = require("./dashApp").default;
    ReactDOM.render(<NextApp />, document.getElementById("root"));
  });
}
registerServiceWorker();
