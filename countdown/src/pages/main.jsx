import React, { useRef, useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function Main() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef();

//useeffect hook to set interval
useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

//formate time to display 00:00
const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  //click handler for start/pause button
  const handleStartPause = () => {
    setIsRunning(prevIsRunning => !prevIsRunning);
  };

  //click handler for reset button
    const handleResetTimer = () => {
        setTime(0);
        setIsRunning(false);
    };
//click handler for add hour button
    const handleAddMinute = () => {
        setTime(prevTime => prevTime + 60);
    };

  return (
    <div>
      <h1>{formatTime(time)}</h1>
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={handleStartPause}>
        {isRunning ? "Pause" : "Start"} 
        </Button>
        <Button variant="contained" onClick={handleResetTimer}>Reset
        </Button>
        <Button variant="contained" onClick={handleAddMinute}>+ Minute</Button>
      </Stack>

    </div>
  );
}
