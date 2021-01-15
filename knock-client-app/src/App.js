import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../src/styles/nav.css";
import PublicBoard from "../src/components/board/board";
import Home from "../src/components/main/Home";
import Mypage from "./components/main/Mypage";

// mypage 테스트를 위한 임시 경로 지정(나중에 수정 해야됨)
const App = () => {
  return (
    <Router>
      <div className="navbar">
        <div className="navbar_home">
          <Link to="/">HOME</Link>
        </div>
        <div className="navbar_board">
          <Link to="/board">BOARD</Link>
        </div>
        <div className="navbar_mypage">
          <Link to="/mypage">Mypage</Link>
        </div>
      </div>
      <Switch>
        <Route exact path="/board">
          <PublicBoard />
        </Route>
        <Route exact path="/mypage">
          <Mypage />
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
