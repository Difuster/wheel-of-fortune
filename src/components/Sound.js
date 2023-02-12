import React, { useRef, useEffect, useContext } from "react";
import { AppContext } from "./context/appContext";
import sound from "../assets/sound.mp3";

function Sound() {
  const value = useContext(AppContext);
  const refAudio = useRef();
  useEffect(() => {
    if (value.soundIsOn) {
      refAudio.current.play();
    }
  }, [value.soundIsOn])
  return (
    <audio ref={refAudio}>
      <source src={sound} type="audio/mpeg" />
    </audio>
  )
}

export default Sound;
