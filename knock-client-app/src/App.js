import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./styles/nav.css";
// import Context from "../utils/context.js";
import PublicBoard from "../src/components/board/board";
import Home from "./components/main/Home";
import Mypage from "./components/main/Mypage";
import CreateRoom from "./components/board/createRoom";
import RoomInfo from "./components/board/roomInfo";
import MngAccount from "./components/main/MngAccount";
import MngHistory from "./components/main/MngHistory";
const axios = require("axios");
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

        <div className="navbar_mypage">
          <Link to="/createRoom">CreateRoom</Link>
        </div>
        <div className="navbar_mypage">
          <Link to="/roominfo">지울꺼임</Link>
        </div>
        <div className="navbar_mypage">
          <Link to="/mngHistory">지울꺼임2</Link>
        </div>
      </div>

      <Switch>
        {/* navbar 경로 */}

        <Route
          exact
          path="/board"
          render={(routeProps) => <PublicBoard {...routeProps} />}
        />

        <Route
          exact
          path="/mypage"
          render={(routeProps) => <Mypage {...routeProps} />}
        />

        <Route
          exact
          path="/"
          render={(routeProps) => <Home {...routeProps} />}
        />

        {/* board 경로 */}
        <Route
          exact
          path="/roomInfo"
          render={(routeProps) => <RoomInfo {...routeProps} />}
        />

        <Route
          exact
          path="/createRoom"
          render={(routeProps) => <CreateRoom {...routeProps} />}
        />

        {/* Mypage 경로 */}

        <Route
          exact
          path="/mngAccount"
          render={(routeProps) => <MngAccount {...routeProps} />}
        />

        <Route
          exact
          path="/mngHistory"
          render={(routeProps) => <MngHistory {...routeProps} />}
        />
      </Switch>
    </Router>
  );
};

export default App;
