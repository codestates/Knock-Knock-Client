import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../src/styles/nav.css";
import PublicBoard from "../src/components/board/board";
import Home from "../src/components/main/Home";

const App = () => {
  return (
    <Router>
      <ul className="navbar">
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/board">BOARD</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/board">
          <PublicBoard />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

// import logo from "./logo.svg";
// import "./App.css";
// import React, { useEffect, useState } from "react";
// const axios = require("axios");

// const App = () => {
//   const [userName, setUserName] = useState("");

//   const registerName = (name) => {
//     setUserName(name.target.value);
//     console.log("히어", name.target.value);
//   };

//   const checkName = () => {
//     axios("/register", {
//       method: "get",
//       body: JSON.stringify(userName),
//     });
//   };

//   return (
//     <div className="App">
//       <div>
//         <p>Register yourname</p>
//         <textarea placeholder="fill up with your name"></textarea>
//         <button onClick={registerName}>Register</button>
//       </div>
//       <div>
//         <p>Check yourname registered</p>
//         <textarea placeholder="fill up with your name"></textarea>
//         <button>check</button>
//       </div>
//     </div>
//   );
// };

// export default App;
