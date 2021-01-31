/* eslint-disable */
import React, { useState } from "react";
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
import navHomeYel from "./images/homeImg/Logo_yel.png";

const App = (props) => {
  const [isModalLogin, setIsModalLogin] = useState(false);
  const [accHistory, setAccHistory] = useState({});

  function modalLoginHandler() {
    setIsModalLogin(true);
  }

  function getHistoryHandler(history) {
    setAccHistory(history);
  }

  return (
    <Router>
      <div className="navbar">
        <div className="navbar_home">
          <Link to="/">
            <img src={navHomeYel} className="navbar_homeImgYel" />
          </Link>
        </div>
        <ModalRouter isModalLogin={isModalLogin} accHistory={accHistory} />
      </div>

      <Switch>
        {/* navbar 경로 */}
        <Route
          exact
          path="/board"
          render={(routeProps) => (
            <PublicBoard
              {...routeProps}
              getHistoryHandler={getHistoryHandler}
            />
          )}
        />

        <Route
          exact
          path="/mypage"
          render={(routeProps) => (
            <Mypage
              {...routeProps}
              getHistoryHandler={getHistoryHandler}
              modalLoginHandler={modalLoginHandler}
            />
          )}
        />

        <Route
          exact
          path="/"
          render={(routeProps) => (
            <Home {...routeProps} getHistoryHandler={getHistoryHandler} />
          )}
        />

        {/* board 경로 */}
        <Route
          exact
          path="/roomInfo"
          render={(routeProps) => (
            <RoomInfo {...routeProps} getHistoryHandler={getHistoryHandler} />
          )}
        />

        <Route
          exact
          path="/createRoom"
          render={(routeProps) => (
            <CreateRoom {...routeProps} getHistoryHandler={getHistoryHandler} />
          )}
        />

        {/* Mypage 경로 */}

        <Route
          exact
          path="/mngAccount"
          render={(routeProps) => (
            <MngAccount
              {...routeProps}
              getHistoryHandler={getHistoryHandler}
              modalLoginHandler={modalLoginHandler}
            />
          )}
        />

        <Route
          exact
          path="/mngHistory"
          render={(routeProps) => (
            <MngHistory {...routeProps} getHistoryHandler={getHistoryHandler} />
          )}
        />
      </Switch>
    </Router>
  );
};

export default App;
