import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./styles/nav.css";
// import Context from "../utils/context.js";
import PublicBoard from "../src/components/board/board";
import Home from "./components/main/Home";
import Mypage from "./components/main/Mypage";
import CreateRoom from "./components/board/createRoom";
import RoomInfo from "./components/board/roomInfo";

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
      </div>

      <Switch>
        {/* navbar 경로 */}
        <Route path="/board" component={PublicBoard} />

        <Route path="/mypage" component={Mypage} />

        <Route path="/" component={Home} />

        {/* board 경로 */}
        <Route path="/roomInfo" component={RoomInfo} />

        <Route path="/createRoom" component={CreateRoom} />

        {/* Mypage 경로 */}

        <Route path="/mngAccount" component={AccountMng} />
      </Switch>
    </Router>
  );
};

export default App;

// </Route>
// {/* mypage 경로 */}
// <Route exact path="/mngAccount">
//   {/* 계정 관리 컴포넌트 */}
// </Route>
// <Route exact path="/mngProject">
//   {/* 프로젝트 관리 컴포넌트 */}
// </Route>
// <Route exact path="/mngHistory">
//   {/* 히스토리 관리 컴포넌트 */}
// </Route>
