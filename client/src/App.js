import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen/GameScreen";
import "./App.css";

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={StartScreen} />
        <Route exact path="/game" component={GameScreen} />
      </Switch>
    </Router>
  );
}

export default App;
