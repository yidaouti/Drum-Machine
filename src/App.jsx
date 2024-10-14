import React, { useState, useEffect } from 'react';
import './styles.css'; 

const audios = {
  Q: {
    keypad: "Q",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    displayText: "Heater 1"
  },
  W: {
    keypad: "W",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    displayText: "Heater 2"
  },
  E: {
    keypad: "E",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    displayText: "Heater 3"
  },
  A: {
    keypad: "A",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    displayText: "Heater 4"
  },
  S: {
    keypad: "S",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    displayText: "Clap"
  },
  D: {
    keypad: "D",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    displayText: "Open HH"
  },
  Z: {
    keypad: "Z",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    displayText: "Kick n' Hat"
  },
  X: {
    keypad: "X",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    displayText: "Kick"
  },
  C: {
    keypad: "C",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    displayText: "Closed HH"
  }
};

const DrumPad = ({ keypad, onClick }) => {
  const padId = keypad.displayText.replace(/\s/g, "-");
  
  return (
    <div onClick={onClick} id={padId} className="drum-pad">
      <audio src={keypad.audio} id={keypad.keypad} className="clip" />
      {keypad.keypad}
    </div>
  );
};

const PadBank = ({ children }) => {
  return <div id="container-bank">{children}</div>;
};

const InterfaceBank = ({ children }) => {
  return <div id="container-interface">{children}</div>;
};

const Display = ({ display }) => {
  return <h1 id="display">{display}</h1>;
};

const App = () => {
  const [display, setDisplay] = useState("");
  const [volume] = useState(1); // You can implement volume control if needed

  useEffect(() => {
    const handleKeyPress = (event) => {
      const keypress = event.key.toUpperCase();
      const elementPressed = document.getElementById(keypress).parentElement;
      elementPressed.click();
    };

    document.addEventListener("keydown", handleKeyPress);
    
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleClick = (event) => {
    const element = event.target;
    const audio = element.querySelector("audio");
    const displayText = audios[audio.id].displayText;
    
    element.classList.toggle("drum-pad-active");
    setTimeout(() => element.classList.toggle("drum-pad-active"), 100);
    
    handleDisplay(displayText);
    handlePlay(audio);
  };

  const handleDisplay = (displayText) => {
    setDisplay(displayText);
  };

  const handlePlay = (audio) => {
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play();
  };

  const drumPads = Object.values(audios).map((audio) => (
    <DrumPad keypad={audio} key={audio.keypad} onClick={handleClick} />
  ));

  return (
    <div id="drum-machine">
      <PadBank>{drumPads}</PadBank>
      <InterfaceBank>
        <Display display={display} />
      </InterfaceBank>
    </div>
  );
};

export default App ;