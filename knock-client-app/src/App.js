/* eslint-disable */
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./styles/navAndLogo.css";
// import Context from "../utils/context.js";
import PublicBoard from "../src/components/board/board";
import Home from "./components/main/Home";
import Mypage from "./components/mypage/Mypage";
import CreateRoom from "./components/board/createRoom";
import RoomInfo from "./components/board/roomInfo";
import MngAccount from "./components/mypage/MngAccount";
import MngHistory from "./components/mypage/MngHistory";
import ModalRouter from "./components/main/ModalRouter";

const App = () => {
  return (
    <Router>
      <div className="navbar">
        <div className="navbar_home">
          <Link to="/">HOME</Link>
        </div>
        <ModalRouter />
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
