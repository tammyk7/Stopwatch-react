import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval;
    if (isRunning) {
      let elapsedTime = Date.now() - time
      interval = setInterval(() => {setTime(() => setTime(Date.now() - elapsedTime))}, 10);
      return () => clearInterval(interval)}},[isRunning]);
  
  const startStopButtonText = isRunning ? 'Stop' : 'Start';
  const startStopButtonColor = isRunning ? 'round-button stop-button' : 'round-button start-button'
  const buttonAction = () => {
    setIsRunning(!isRunning)
  }
  const lapResetButtonText = () => {
    if (time === 0) {
      return 'Lap'
    }
    if (isRunning) {
      return 'Lap'
    }
    else {
      return 'Reset'
    }
  }


  return (
    <div>
      <div className="wrapper">
        <div className="main">
          <div className="timer-container">
            <span id="timer">{formatTime(time)}</span>
          </div>
          <div className="button-container">
            <button className="round-button lap-button" 
                    id="lapResetButton"
                    onClick={buttonAction}>{lapResetButtonText()}</button> 
            <button className={startStopButtonColor} 
                    id="startStopButton" 
                    onClick={buttonAction}>{startStopButtonText}</button>
          </div>
          <div className="lap-table-container">
            <table id="lapTable"></table>
          </div>
        </div>
      </div>
    </div>
  )
};

export default App

const padNumber =  (value) => Math.floor(value).toString().padStart(2, '0')

const formatTime = (elapsedTime) => {
    const centiseconds =(elapsedTime % 1000) / 10
    const seconds = (elapsedTime / 1000) % 60
    const minutes =(elapsedTime / (1000 * 60)) % 60
    return`${padNumber(minutes)}:${padNumber(seconds)}.${padNumber(centiseconds)}`
}

const resetTimer = () => {
  setTime(0)
}