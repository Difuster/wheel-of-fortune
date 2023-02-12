import React, { useContext } from "react";
import { AppContext } from "../context/appContext";
import './Wheel.css';

function Wheel() {
  const value = useContext(AppContext);
  return (
    <div className="container">
      <div className="arrow">
      </div>
      <div className="wheel" style={{transform: `rotate(${value.rotationAngle}deg)`}}>
        <div className="number yellow" style={{"--i":1}}><span className="jackpot">Jackpot</span></div>
        <div className="number black" style={{"--i":2}}><span>250</span></div>
        <div className="number yellow" style={{"--i":3}}><span>400</span></div>
        <div className="number black" style={{"--i":4}}><span>10</span></div>
        <div className="number yellow" style={{"--i":5}}><span>100</span></div>
        <div className="number black" style={{"--i":6}}><span>150</span></div>
        <div className="number yellow" style={{"--i":7}}><span>200</span></div>
        <div className="number black" style={{"--i":8}}><span>750</span></div>
      </div>
    </div>
  )
}

export default Wheel;
