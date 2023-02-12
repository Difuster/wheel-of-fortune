import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/appContext";
import Item from './Item';
import './Winners.css';

function Winners() {
  const value = useContext(AppContext);

  useEffect(() => {
    value.getData(value.routes.winners.getWinners)
    .then((winners) => value.setWinners(winners));
  }, [])
  
  return (
    <div className="Winners">
      <h2>Winners</h2>
      {value.winners.length ? value.winners.map(winner => <Item key={winner.id} winner={winner} />) : null}
    </div>
  )
}

export default Winners;
