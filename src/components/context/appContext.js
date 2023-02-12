import React, { useState, createContext, useEffect, useCallback } from 'react';

const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    firstName: '',
    lastName: '',
    balance: 0,
  });
  const [winners, setWinners] = useState([]); // id, userId, gain
  const [rotationAngle, setRotationAngle] = useState(0);
  const [roundsNumber, setRoundsNumber] = useState(1);
  const [soundIsOn, setSoundIsOn] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [bank, setBank] = useState(0);
  const [gain, setGain] = useState({field: '', value: 0});
  const [jackpot, setJackpot] = useState(0);
  const fields = ['Jackpot', 750, 200, 150, 100, 10, 400, 250];
  const bet = 500;
  const routes = {
    user: {
      auth: 'api/user/auth',
      update: 'api/user/update/',
      getUser: 'api/user/',
    },
    bank: {
      getValue: 'api/bank/',
      update: 'api/bank/update/',
    },
    jackpot: {
      getValue: 'api/jackpot/',
      update: 'api/jackpot/update/',
    },
    winners: {
      getWinners: 'api/winner/',
      create: 'api/winner/create/',
    }
  };

  const getData = async (url) => {
    try {
      let response = await fetch(url);
      let result = await response.json();
      return result;
    } catch(err) {
      return err;
    }
  };

  const postData = async (method, url, data) => {
    try {
      let response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      let result = await response.json();
      return result;
    } catch(err) {
      return err;
    }
  };

  const value = {
    fields,
    getData,
    postData,
    routes,
    user,
    setUser,
    bank,
    setBank,
    jackpot,
    setJackpot,
    bet,
    winners,
    setWinners,
    rotationAngle,
    setRotationAngle,
    soundIsOn,
    setSoundIsOn,
    isModalActive,
    setIsModalActive,
    gain,
    setGain,
    roundsNumber,
    setRoundsNumber
  }

  return (
    <AppContext.Provider value={value}>
      { children }
    </AppContext.Provider>
  );
}

export { AppContext, AppContextProvider };
