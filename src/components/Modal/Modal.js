import React, { useContext } from "react";
import { AppContext } from "../context/appContext";
import './Modal.css';

function Modal() {
  const value = useContext(AppContext);

  const handleCLoseModal = () => {
    value.setIsModalActive(false);
    value.getData(value.routes.winners.getWinners)
    .then((winners) => value.setWinners(winners));
  };

  return (
    <div className={value.isModalActive ? "modal active" : "modal"} onClick={() => value.setIsModalActive(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>You Win!</h2>
        <div className="gain-value">
          <p>{value.gain.value}</p>
          <div className="gain-value-coin"></div>
        </div>
        <button onClick={() => handleCLoseModal()}>
          <span>Great</span>
        </button>
      </div>
    </div>
  )
}

export default Modal;
