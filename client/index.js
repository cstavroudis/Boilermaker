import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <h1>Rest of app here</h1>
  </Provider>,
  document.getElementById("app")
);
