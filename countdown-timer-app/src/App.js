import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import InputTimer from './InputTimer';
import ShowTimer from './ShowTimer';

function App() {
  const [isStart, setIsStart] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hourse, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerId, setTimerId] = useState(0);

  const handleStart = () => {
    if (hourse < 0 || minutes < 0 || seconds <= 0) {
      alert("Invalid Input");
      return;
    } else {
      setIsStart(true);
    }
  }

  const handleResume = () => {
    setIsPaused(false);
    runTimer(seconds, minutes, hourse);
  }
  const handlePause = () => {
    setIsPaused(true);
    clearInterval(timerId);
  }

  const handleReset = () => {
    setIsStart(false);
    resetTimer();
  }

  const resetTimer = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    clearInterval(timerId);
  }

  const handleInput = (e) => {
    console.log(e.target.id, e.target.value);
    const value = parseInt(e.target.value);
    const id = e.target.id;
    if (id === 'hours') {
      setHours(value);
    } else if (id === 'minutes') {
      setMinutes(value);
    } else {
      setSeconds(value);
    }
  }


  const runTimer = (sec, min, hr, tid) => {
    if (sec > 0) {
      setSeconds((s) => s - 1);
    } else if (sec === 0 && min > 0) {
      setMinutes((m) => m - 1);
      setSeconds(59);
    } else if (min === 0) {
      setHours((h) => h - 1);
      setMinutes(59);
      setSeconds(59);
    }

    if (sec === 0 && min === 0 && hr === 0) {
      // resetTimer();
      handleReset();
      alert('Timer is finished');
      clearInterval(tid);
      return
    }
  }

  useEffect(() => {
    let tid;
    if (isStart) {
      tid = setInterval(() => {
        runTimer(seconds, minutes, hourse, tid);
      }, 1000)
      setTimerId(tid);
    }

    return () => {
      clearInterval(tid);
    }
  }, [isStart, hourse, minutes, seconds])
  console.log(hourse, minutes, seconds)

  return (
    <div className="App">
      <h1>Countdown Timer</h1>
      {
        !isStart && <InputTimer
          handleStart={handleStart}
          handleInput={handleInput} />
      }

      {
        isStart &&
        <ShowTimer
          hourse={hourse}
          minutes={minutes}
          seconds={seconds}
          isPaused={isPaused}
          handlePause={handlePause}
          handleReset={handleReset}
          handleResume={handleResume}
        />
      }

    </div>
  );
}

export default App;
