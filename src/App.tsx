import React, { useState } from 'react';
import './App.scss';
import PinInputGrid from './components/PinInputGrid';

const PIN_LENGTH = 4

function App() {
  const [pin, setPin] = useState<Array<number | undefined>>(new Array(PIN_LENGTH))
  const onPinChanged = (pinEntry: number | undefined, index: number) => { 
    const newPin = [...pin]
    newPin[index] = pinEntry
    setPin(newPin)
  }
  console.log(pin)
  return (
      <PinInputGrid pin={pin} onPinChanged={onPinChanged} pinInputLength = {PIN_LENGTH}/>
  );
}

export default App;
