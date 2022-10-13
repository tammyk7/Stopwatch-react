import { useEffect, useState } from "react"
import { formatTime } from "../utils/utils"
import "./App.css"
import { Buttons } from "../Buttons/Buttons"
import Laps from "../Laps/Laps"

function App() {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [lapData, setLapData] = useState({
    laps: [],
    totalLapTime: 0,
    minLap: Infinity,
    maxLap: 0,
  })

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now() - elapsedTime
      const interval = setInterval(
        () => setElapsedTime(Date.now() - startTime),
        10
      )
      return () => clearInterval(interval)
    }
  }, [isRunning])

  const addLap = () => {
    const currentLapTime = elapsedTime - lapData.totalLapTime;
    setLapData((prevLapData) => {
      return {
        ...prevLapData,
        laps: [...prevLapData.laps, currentLapTime],
        totalLapTime: currentLapTime + lapData.totalLapTime,
        minLap:
          currentLapTime < prevLapData.minLap
            ? currentLapTime
            : prevLapData.minLap,
        maxLap:
          currentLapTime > prevLapData.maxLap
            ? currentLapTime
            : prevLapData.maxLap,
      }
    })
  }

  const resetTimer = () => {
    setIsRunning(false)
    setElapsedTime(0)
    setLapData({
      laps: [],
      totalLapTime: 0,
      minLap: Infinity,
      maxLap: 0,
    })
  }

  const toggleTimer = () => setIsRunning(!isRunning)
  const lapResetButtonAction = () => (!isRunning ? resetTimer() : addLap())

  return (
    <div>
      <div className="wrapper">
        <div className="main">
          <div className="timer-container">
            <span>{formatTime(elapsedTime)}</span>
          </div>
          <Buttons
            isRunning={isRunning}
            elapsedTime={elapsedTime}
            toggleTimer={toggleTimer}
            lapResetButtonAction={lapResetButtonAction}/>
          <Laps 
            lapData={lapData} 
            elapsedTime={elapsedTime}/>
        </div>
      </div>
    </div>
  )
}
export default App
