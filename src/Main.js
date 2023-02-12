import React, { useContext, useEffect } from 'react';
import { AppContext } from "./components/context/appContext";
import './App.css';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Modal from './components/Modal/Modal';
import Sound from './components/Sound';
import Wheel from './components/Wheel/Wheel';
import Winners from './components/Winners/Winners';

function Main() {
  const value = useContext(AppContext);

  useEffect(() => {
    value.postData('POST', value.routes.user.auth, {id: 1})
    .then((user) => value.setUser(user));

    value.getData(value.routes.bank.getValue)
    .then((bank) => value.setBank(bank.gainValue));

    value.getData(value.routes.jackpot.getValue)
    .then((jackpot) => value.setJackpot(jackpot.gainValue));
  }, [])

  return (
    <div className="App-wrapper">
      <Header />
      <div className="App-body">
        <Wheel />
        <Menu />
        <Sound />
      </div>
      <Winners />
      <Modal />
    </div>
  );
}

export default Main;
