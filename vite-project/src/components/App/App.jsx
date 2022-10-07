import { useEffect, useState } from 'react'
import { formatTime } from './utils'
import './App.css'

function App() {

const [time, setTime] = useState(0)
const [isRunning, setIsRunning] = useState(false)

useEffect(() => {
  let interval;
  if (isRunning) {
    let startTime = Date.now() - time
    interval = setInterval(() => {setTime(() => setTime(Date.now() - startTime))}, 10);
    return () => clearInterval(interval)}},[isRunning]);

const startStopButtonText = isRunning ? 'Stop' : 'Start';
const startStopButtonColor = isRunning ? 'round-button stop-button' : 'round-button start-button'
const startStopbuttonAction = () => {
  setIsRunning(!isRunning)
}

const resetTimer = () => setTime(0)

const lapResetButtonAction = () => {
  if (lapResetButtonText.innerText = 'Reset') {
    resetTimer()
  }
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
                  onClick={lapResetButtonAction}>{lapResetButtonText()}</button> 
          <button className={startStopButtonColor} 
                  id="startStopButton" 
                  onClick={startStopbuttonAction}>{startStopButtonText}</button>
        </div>
        <div className="lap-table-container">
          <table className='lap-table 'id="lapTable">
            <tbody>
              <tr className='lap-row'>
                <td>Lap 1</td>
                <td>00:00.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
)
};

export default App