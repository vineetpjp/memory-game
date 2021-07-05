import React from "react";
import { Link } from "react-router-dom";

function StartScreen() {
  return (
    <div className="start-container">
      <h2 className="heading">Memory Game</h2>
      <h2 className="heading-med">Please select game difficulty!</h2>
      <div className="levels-container">
        <Link
          className="level-container header-item"
          to={{ pathname: "/game", level: 1 }}
        >
          Level 1
        </Link>
        <Link
          className="level-container header-item"
          to={{ pathname: "/game", level: 2 }}
        >
          Level 2
        </Link>
        <Link
          className="level-container header-item"
          to={{ pathname: "/game", level: 3 }}
        >
          Level 3
        </Link>
      </div>
    </div>
  );
}

export default StartScreen;
