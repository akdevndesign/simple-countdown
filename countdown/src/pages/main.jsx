import React, { useRef, useEffect, useState } from "react";
import Button from '@mui/material/Button';

export default function Main() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef();
  
//useeffect hook to set interval
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  //click handler for start/pause button
  const handleStartPause = () => {
    setIsRunning(prevIsRunning => !prevIsRunning);
  };

  return (
    <div>
      <h1>{time}</h1>
      <Button variant="contained" onClick={handleStartPause}>
        {isRunning ? "Pause" : "Start"}
      </Button>
    </div>
  );
}
