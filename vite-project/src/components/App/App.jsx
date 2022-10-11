import { useEffect, useState } from 'react'
import { formatTime } from './utils'
import './App.css'

function App() {

const [elapsedTime, setElapsedTime] = useState(0)
const [isRunning, setIsRunning] = useState(false)
const [lapData, setLapData] = useState({
  laps: [{lapNumber: 1, lapTime:0}],
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

useEffect(() => {
  if (elapsedTime > 0) {
    setLapData(prevLapData => {
      const currentRunningLap = prevLapData.laps[0]
      const newRunningLap = {
        ...currentRunningLap,
        lapTime: elapsedTime - lapData.totalLapTime
      }
      return {
        ...prevLapData,
        laps: [newRunningLap, ...prevLapData.laps.slice(1)]
      }
    })
  }
}, [elapsedTime])

const resetTimer = () => {
  setIsRunning(false)
  setElapsedTime(0)
  setLapData(
    {
      laps: [{lapNumber: 1, lapTime:0}],
      totalLapTime: 0,
      minLap: [],
      maxLap: []
    })
}

const addLap = () => {
  console.log('YOOOO')
  
  setLapData(prevLapData => {
    const currentLapTime = elapsedTime - lapData.totalLapTime
    const newRunningLap = {
      lapNumber: 1,
      lapTime: currentLapTime
    }
    return {
      ...prevLapData,
      laps: [newRunningLap, ...prevLapData.laps],
      totalLapTime: currentLapTime + lapData.totalLapTime
    }
  })
}

const startStopButtonText = isRunning ? 'Stop' : 'Start'
const startStopButtonColor = isRunning ? 'round-button stop-button' : 'round-button start-button'
const lapResetButtonText = (isRunning || elapsedTime === 0) ? 'Lap' : 'Reset'
const isLapButtonDisabled = !isRunning && elapsedTime === 0

const toggleTimer = () => setIsRunning(!isRunning)
const lapResetButtonAction = () => (lapResetButtonText === 'Reset') ? resetTimer() : addLap()

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
              {(elapsedTime > 0) ? 
              lapData.laps.map((lap, i) => {
                return (
                <tr className='lap-row'>
                  <td>Lap {lap.lapNumber + i}</td>
                  <td>{formatTime(lap.lapTime)}</td> 
                </tr>)
              }) : null
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
)
}
export default App