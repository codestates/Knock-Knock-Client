import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./styles/nav.css";
import PublicBoard from "../src/components/board/board";
import Home from "./components/main/Home";
import Mypage from "./components/main/Mypage";
import CreateRoom from "./components/board/createRoom";
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
      </div>
      <Switch>
        {/* navbar 경로 */}
        <Route exact path="/board">
          <PublicBoard />
        </Route>

        <Route exact path="/mypage">
          <Mypage />
        </Route>
        <Route exact path="/createRoom">
          <CreateRoom />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
