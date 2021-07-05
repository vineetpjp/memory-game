import React from "react";
import { Link } from "react-router-dom";

function StartScreen() {
  return (
    <div>
      StartScreen
      <Link to={{ pathname: "/game", level: 1 }}>Level 1</Link>
      <Link to={{ pathname: "/game", level: 2 }}>Level 2</Link>
      <Link to={{ pathname: "/game", level: 3 }}>Level 3</Link>
    </div>
  );
}

export default StartScreen;
