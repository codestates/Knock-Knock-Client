import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
const axios = require("axios");

const App = () => {
  const [userName, setUserName] = useState("");

  const registerName = (name) => {
    setUserName(name.target.value);
    console.log("히어", name.target.value);
  };

  const checkName = () => {
    axios("/register", {
      method: "get",
      body: JSON.stringify(userName),
    });
  };

  return (
    <div className="App">
      <div>
        <p>Register yourname</p>
        <textarea placeholder="fill up with your name"></textarea>
        <button onClick={registerName}>Register</button>
      </div>
      <div>
        <p>Check yourname registered</p>
        <textarea placeholder="fill up with your name"></textarea>
        <button>check</button>
      </div>
    </div>
  );
};

export default App;
