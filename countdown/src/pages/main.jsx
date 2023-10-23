import React, { useRef, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Main() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timerMessage, setTimerMessage] = useState("");
  const [timerColor, setTimerColor] = useState("inherit");
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [startButtonDisabled, setStartButtonDisabled] = useState(false);

  const intervalRef = useRef();

  //useEffect hook to run timer
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            //set timer message and color to red when time is up
            setTimerMessage("Time's up!");
            setTimerColor("red");
            //disable buttons when time is up
            setButtonsDisabled(true);
            setStartButtonDisabled(true);
            return 0;
          }
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
      if (!timerMessage) {
        setTimerMessage("");
        setTimerColor("inherit");
        setStartButtonDisabled(false);
      }
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timerMessage]);

  //function to format time to minutes and seconds 00:00
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handleStartPause = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  //click handler for reset button. Must reset all state values to their initial values.
  const handleResetTimer = () => {
    setTime(0);
    setIsRunning(false);
    setTimerMessage("");
    setTimerColor("inherit");
    setButtonsDisabled(false);
    setStartButtonDisabled(false);
  };
  //click handler for adding minute to timer
  const handleAddMinute = () => {
    if (!isRunning) {
      setTime((prevTime) => prevTime + 60);
    }
  };
  //click handler for adding 10 seconds to timer
  const handleAddTenSeconds = () => {
    if (!isRunning) {
      setTime((prevTime) => prevTime + 10);
    }
  };
  //click handler for adding 1 second to timer
  const handleAddOneSecond = () => {
    if (!isRunning) {
      setTime((prevTime) => prevTime + 1);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box>
        <Typography variant="h2" gutterBottom>
          Countdown Timer
        </Typography>
        <Typography variant="h4" gutterBottom style={{ color: timerColor }}>
          {timerMessage}
        </Typography>
        <Typography variant="h1" gutterBottom style={{ color: timerColor }}>
          {formatTime(time)}
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            onClick={handleAddMinute}
            disabled={buttonsDisabled}
          >
            + Minute
          </Button>
          <Button
            variant="contained"
            onClick={handleAddTenSeconds}
            disabled={buttonsDisabled}
          >
            + 10 Sec
          </Button>
          <Button
            variant="contained"
            onClick={handleAddOneSecond}
            disabled={buttonsDisabled}
          >
            + 1 Sec
          </Button>
        </Stack>
        <br />
        <Stack spacing={2}>
          <Button
            variant="contained"
            onClick={handleStartPause}
            color="success"
            disabled={startButtonDisabled}
          >
            {isRunning ? "Pause" : "Start"}
          </Button>
          <Button variant="contained" onClick={handleResetTimer} color="error">
            Reset
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
