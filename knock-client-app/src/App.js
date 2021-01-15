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
