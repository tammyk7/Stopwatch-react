import { useEffect, useState } from 'react'
import { formatTime } from './utils'
import './App.css'

function App() {

const [elapsedTime, setElapsedTime] = useState(0)
const [isRunning, setIsRunning] = useState(false)
const [lapData, setLapData] = useState({
  laps: [],
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

const addLap = () => {
  setLapData(prevLapData => {
    const currentLapTime = elapsedTime - lapData.totalLapTime
    const newRunningLap = {
      lapTime: currentLapTime
    }
    return {
      ...prevLapData,
      laps: [...prevLapData.laps, newRunningLap],
      totalLapTime: currentLapTime + lapData.totalLapTime
    }
  })
}

const resetTimer = () => {
  setIsRunning(false)
  setElapsedTime(0)
  setLapData(
    {
      laps: [],
      totalLapTime: 0,
      minLap: [],
      maxLap: []
    })
}

const startStopButtonText = isRunning ? 'Stop' : 'Start'
const startStopButtonColor = isRunning ? 'round-button stop-button' : 'round-button start-button'
const lapResetButtonText = (isRunning || elapsedTime === 0) ? 'Lap' : 'Reset'
const isLapButtonDisabled = !isRunning && elapsedTime === 0
const currentLapNumber = lapData.laps.length + 1
const runningLapTime = elapsedTime - lapData.totalLapTime

const toggleTimer = () => setIsRunning(!isRunning)
const lapResetButtonAction = () => (lapResetButtonText === 'Reset') ? resetTimer() : addLap()

return (
  <div>
    <div className="wrapper">
      <div className="main">
        <div className="timer-container">
          <span>{formatTime(elapsedTime)}</span>
        </div>
        <div className="button-container">
          <button className="round-button lap-button"  
                  onClick={lapResetButtonAction}
                  disabled={isLapButtonDisabled}>{lapResetButtonText}</button> 
          <button className={startStopButtonColor} 
                  onClick={toggleTimer}>{startStopButtonText}</button>
        </div>
        <div className="lap-table-container">
          <table className='lap-table'>
            <tbody className='table-body'>
              {
                lapData.laps.map((lap, i) => {
                  return (
                  <tr key={i} className='lap-row'>
                    <td>Lap {i + 1}</td>
                    <td>{formatTime(lap.lapTime)}</td> 
                  </tr>)
                })
              }
              {
                elapsedTime > 0 &&
                <tr className='lap-row'>
                  <td>Lap {currentLapNumber}</td>
                  <td>{formatTime(runningLapTime)}</td>
                </tr>
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