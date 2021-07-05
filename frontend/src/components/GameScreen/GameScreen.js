import React, {useEffect, useState} from "react";
import { gameUtil } from "../util/gameUtil";
import setAuthToken from "../util/setAuthToken";

const cardRevealTime= 3000;
function GameScreen({ location: { level } }) {
  const [noOfCards,setNoOfCards] = useState(0);
  const [table1,setTable1] = useState([]);
  const [table2,setTable2] = useState([]);
  const [activeCard1,setActiveCard1] =useState(null);
  const [activeCard2,setActiveCard2] =useState(null);
  const [activeCard1Value,setActiveCard1Value] = useState(null);
  const [activeCard2Value,setActiveCard2Value] = useState(null);
  const [gameCompleted,setGameCompleted] = useState(false);

  useEffect(() => {
    (async()=>{
      await initData();
    })()
  }, []);

  const initData = async () => {
    try{
      const gameLevel = level||1;
      const {file_id,init} = await gameUtil.initGame(gameLevel);
      setAuthToken(file_id);
      const noOfCards = gameUtil.getCardsNoFromLevel(gameLevel);
      setNoOfCards(noOfCards);
      const arr = new Array(noOfCards).fill(0).map((_,index)=>index+1);

      setTable1(arr);
      setTable2(arr);
    }catch (e) {
      console.log(e)
    }
  };

  const onCard1Click =async (index) =>{
    if(activeCard1){
      return;
    }
    const data = await gameUtil.getCard1Value(index);
    setActiveCard1(index);
    setActiveCard1Value(data);
    setTimeout(()=>{
      setActiveCard1Value(null);
    },cardRevealTime)
  }

  const renderTable1 = () =>{
    return table1.map((card,index)=>{
      const active = activeCard1===index?'active':'';
      const cardValue = active?activeCard1Value:null;
      return (
          <div onClick={()=>onCard1Click(index)} className={`${active}`}>card {cardValue} {null}</div>
      )
    })
  }

  const onCard2Click =async (card2Index) =>{
    if(!activeCard1){
      return;
    }
    const {match,errScore} =await gameUtil.getCard2Value(activeCard1,card2Index);
    let newTable1 = table1;
    let newTable2 = table2;
    if(match){
      newTable1[activeCard1] = 0;
      newTable2[card2Index] = 0;
      setTable1(newTable1);
      setTable2(newTable2);
      const allEqualTable1 = newTable1.every((indexValue)=>indexValue===0);
      const allEqualTable2 = newTable2.every((indexValue)=>indexValue===0);
      setGameCompleted(true);
    }

    setActiveCard1(null);

  }

  const renderTable2 = () =>{
    return table1.map((card,index)=>{
      return (
          <div onClick={()=>onCard2Click(index)}>card {card}</div>
      )
    })
  }

  return (<div>
    <div>
      {renderTable1()}
    </div>
    <div>
      {renderTable2()}
    </div>
  </div>);
}

export default GameScreen;
