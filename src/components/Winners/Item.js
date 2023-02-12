import React from "react";
import './Winners.css';

function Item({winner}) {
  const classes = winner.gainField === "Jackpot" ? "gain-jackpot" : "gain-value";

  return (
    <div className="Item-wrapper">
      <div className="name">{winner.firstName} {winner.lastName}</div>
      <div className={classes}>{winner.gainField}</div>
      <div className="coin-img"></div>
    </div>
  )
}

export default Item;
