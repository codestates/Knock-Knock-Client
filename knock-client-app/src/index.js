import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Home from "./components/main/Home";
import Mypage from "./components/main/Mypage";

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <Mypage />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
