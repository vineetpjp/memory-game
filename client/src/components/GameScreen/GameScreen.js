import React, { useEffect, useState } from "react";
import { gameUtil } from "../../util/gameUtil";
import setAuthToken from "../../util/setAuthToken";
import Timer from "./Timer";
import { Link } from "react-router-dom";
import Table from "./Table";

const cardRevealTime = 2000;
function GameScreen({ location: { level } }) {
  const [table1, setTable1] = useState([]);
  const [table2, setTable2] = useState([]);
  const [activeCard1, setActiveCard1] = useState(null);
  const [activeCard2, setActiveCard2] = useState(null);
  const [activeCard1Value, setActiveCard1Value] = useState(null);
  const [activeCard2Value, setActiveCard2Value] = useState(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [errorScore, setErrorScore] = useState(0);

  useEffect(() => {
    (async () => {
      await initData();
    })();
  }, []);

  useEffect(() => {
    if (gameCompleted) {
      deleteFile();
    }
  }, [gameCompleted]);

  const deleteFile = async () => {
    await gameUtil.deleteFile();
  };

  const initData = async () => {
    try {
      const gameLevel = level || 1;
      const { file_id } = await gameUtil.initGame(gameLevel);
      setAuthToken(file_id);
      const noOfCards = gameUtil.getCardsNoFromLevel(gameLevel);
      const arr = new Array(noOfCards).fill(0).map((_, index) => index + 1);

      setTable1(arr);
      setTable2(arr);
    } catch (e) {
      console.log(e);
    }
  };

  const onCard1Click = async (index) => {
    if (activeCard1 === 0 || activeCard1) {
      return;
    }
    setActiveCard1(index);
    const data = await gameUtil.getCard1Value(index + 1);
    setActiveCard2(null);
    setActiveCard1Value(data);

    setTimeout(() => {
      setActiveCard1Value(null);
    }, cardRevealTime);
  };

  const onCard2Click = async (card2Index) => {
    if (activeCard2 === 0 || activeCard2) {
      return;
    }
    setActiveCard2(card2Index);
    const { card2value, match, errScore } = await gameUtil.getCard2Value(
      activeCard1 + 1,
      card2Index + 1
    );
    setActiveCard2Value(card2value);

    let newTable1 = [...table1];
    let newTable2 = [...table2];
    if (match) {
      newTable1[activeCard1] = 0;
      newTable2[card2Index] = 0;
      const allEqualTable1 = newTable1.every((indexValue) => indexValue === 0);
      if (allEqualTable1) {
        setGameCompleted(true);
      }
    }
    setTimeout(() => {
      setActiveCard2Value(null);
      setTable1(newTable1);
      setTable2(newTable2);
    }, cardRevealTime);
    setErrorScore(errScore);

    setActiveCard1(null);
  };

  return (
    <div>
      <div className={"flex-horizontal"}>
        <Timer isCompleted={gameCompleted} />
        <div className={"header-item"}>Error Score: {errorScore}</div>
      </div>
      {gameCompleted ? (
        <div className={"flex-center"}>
          <Link to={"/"} className={"header-item"}>
            Start Again
          </Link>
        </div>
      ) : null}
      <div className={"flex-horizontal"}>
        <div>
          <Table
            onCardClick={onCard1Click}
            table={table1}
            activeCard={activeCard1}
            activeCardValue={activeCard1Value}
          />
        </div>
        <div className={"divider"} />
        <div>
          <Table
            onCardClick={onCard2Click}
            table={table2}
            activeCard={activeCard2}
            activeCardValue={activeCard2Value}
          />
        </div>
      </div>
    </div>
  );
}

export default GameScreen;
