import { useEffect, useState } from 'react'
import { formatTime } from './utils'
import './App.css'

function App() {

const [elapsedTime, setElapsedTime] = useState(0)
const [isRunning, setIsRunning] = useState(false)
const [lapData, setLapData] = useState({
  laps: [{lapNumber: 0, lapTime: 0}],
  totalLapTime: 0,
  minLap: [],
  maxLap: []
})

useEffect(() => {
  if (isRunning) {
    const startTime = Date.now() - elapsedTime
    const interval = setInterval(() => setElapsedTime(Date.now() - startTime), 10)
    return () => clearInterval(interval)
  }
}, [isRunning])

// useEffect(() => {
//   // update running lap
//   // lapData.laps = []
// }, [elapsedTime])

// setLapData(prevLapData => ({
//   ...prevLapData,
//   laps: [ 34, ...prevLapData.laps, 323, 45],
//   totalLapTime: elapsedTime - lapData.laps[...]

// }))

const firstLap = () => {
  setLapData(prevLapData => ({
    ...prevLapData,
    laps: [...prevLapData.laps[0]],
    totalLapTime: elapsedTime,
  }))
}
// console.log(lapData)

const startStopButtonText = isRunning ? 'Stop' : 'Start'
const startStopButtonColor = isRunning ? 'round-button stop-button' : 'round-button start-button'
const lapResetButtonText = (isRunning || elapsedTime === 0) ? 'Lap' : 'Reset'
const toggleTimer = () => setIsRunning(!isRunning)
const lapResetButtonAction = () => (lapResetButtonText === 'Reset') ? resetTimer() : firstLap()
const isLapButtonDisabled = !isRunning && elapsedTime === 0

const resetTimer = () => {
  setIsRunning(false)
  setElapsedTime(0)
}

return (
  <div>
    <div className="wrapper">
      <div className="main">
        <div className="timer-container">
          <span id="timer">{formatTime(elapsedTime)}</span>
        </div>
        <div className="button-container">
          <button className="round-button lap-button" 
                  id="lapResetButton" 
                  onClick={lapResetButtonAction}
                  disabled={isLapButtonDisabled}>{lapResetButtonText}</button> 
          <button className={startStopButtonColor} 
                  id="startStopButton" 
                  onClick={toggleTimer}>{startStopButtonText}</button>
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