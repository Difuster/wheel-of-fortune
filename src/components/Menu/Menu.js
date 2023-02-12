import React, { useContext } from 'react';
import { AppContext } from "../context/appContext";
import './Menu.css';

function Menu() {
  const value = useContext(AppContext);

  const handleSpin = () => {
    const userBalance = value.user.balance - value.bet;
    const bankValue = value.bank + value.bet;
    const updatedJackpotValue = bankValue * 0.5;

    value.postData('POST', value.routes.user.update, {id: 1, balance: userBalance})
    .then((user) => value.setUser(user));

    value.postData('POST', value.routes.bank.update, {gainValue: bankValue})
    .then((bank) => value.setBank(bank.gainValue));

    value.postData('POST', value.routes.jackpot.update, {gainValue: updatedJackpotValue})
    .then((jackpot) => value.setJackpot(jackpot.gainValue));

    //------------------------------------

    const randomNum = Math.ceil(Math.random() * 360 / 45);
    let rotationAngle = value.rotationAngle + randomNum * 45 + 3600;
    value.setRotationAngle(rotationAngle);
    value.setSoundIsOn(true);
    value.setRoundsNumber(value.roundsNumber + 1);
  
    let index = (rotationAngle - 3600 * value.roundsNumber)/45;
    if (index > 7) {
      index = index % value.fields.length;
    }

    const gainField = value.fields[index].toString();
    const gainValue = value.fields[index] !== "Jackpot" ? value.fields[index] : updatedJackpotValue;
    value.setGain({
      field: gainField,
      value: gainValue,
    });

    //---------------------------------------

    setTimeout(() => {
      value.setSoundIsOn(false);
      value.setIsModalActive(true);

      let updatedUserBalance;
      if (gainField === "Jackpot") {
        updatedUserBalance = userBalance + updatedJackpotValue;

        value.postData('POST', value.routes.bank.update, {gainValue: 0})
        .then((bank) => value.setBank(bank.gainValue));

        value.postData('POST', value.routes.jackpot.update, {gainValue: 0})
        .then((jackpot) => value.setJackpot(jackpot.gainValue));
      } else {
        updatedUserBalance = userBalance + gainValue;
      }

      value.postData('POST', value.routes.user.update, {id: 1, balance: updatedUserBalance})
      .then((user) => value.setUser(user));

      const winnerData = {
        userId: value.user.id,
        firstName: value.user.firstName, 
        lastName: value.user.lastName, 
        gainField,
      };

      value.postData('POST', value.routes.winners.create, winnerData);
    }, 4500);
  }

  return (
    <div className="Menu">
      <p>
        <span>Jackpot</span>
        <br />
        <span>{value.jackpot}</span>
      </p>
      <p>
        <span>Balance</span>
        <br />
        <span>{value.user.balance}</span>
      </p>
      <button onClick={() => handleSpin()}>
        <span>Spin</span>
        <br />
        <span>Wheel</span>
      </button>
    </div>
  )
}

export default Menu;
