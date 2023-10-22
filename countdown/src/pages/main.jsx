import React, { useRef, useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


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
//click handler for add 10 seconds button
    const handleAddTenSeconds = () => {
        setTime(prevTime => prevTime + 10);
    };
//click handler for add 1 second button
    const handleAddOneSecond = () => {
        setTime(prevTime => prevTime + 1);
    };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box>
      <Typography variant="h2" gutterBottom>
        Countdown Timer
      </Typography>
      <Typography variant="h1" gutterBottom>
      {formatTime(time)}
    </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button variant="contained" onClick={handleAddMinute}>+ Minute</Button>
        <Button variant="contained" onClick={handleAddTenSeconds}>+ 10 Sec</Button>
        <Button variant="contained" onClick={handleAddOneSecond}>+ 1 Sec</Button>
      </Stack>
    <br />
      <Stack spacing={2}>
        <Button variant="contained" onClick={handleStartPause} color="success">
        {isRunning ? "Pause" : "Start"} 
        </Button>
        <Button variant="contained" onClick={handleResetTimer} color="error">Reset
        </Button>
        </Stack>
        </Box>
    </div>
  );
}
