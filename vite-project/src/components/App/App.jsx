import { useEffect, useState } from 'react'
import { Buttons } from '../Buttons/Buttons'
import { formatTime } from '../utils/utils'
import Laps  from '../Laps/Laps'
import './App.css'

function App() {
  const initialLapData = {
      laps: [],
      totalLapTime: 0,
      minLap: Number.MAX_VALUE,
      maxLap: 0
  }
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [lapData, setLapData] = useState(initialLapData)

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now() - elapsedTime
      const interval = setInterval(() => setElapsedTime(Date.now() - startTime), 10)
      return () => clearInterval(interval)
    }
  }, [isRunning])

  const addLap = () => {
    const currentLapTime = elapsedTime - lapData.totalLapTime
    setLapData((prevLapData) => {
      return {
        ...prevLapData,
        laps: [...prevLapData.laps, currentLapTime],
        totalLapTime: currentLapTime + lapData.totalLapTime,
        minLap: (currentLapTime < prevLapData.minLap) ? currentLapTime : prevLapData.minLap,
        maxLap: (currentLapTime > prevLapData.maxLap) ? currentLapTime : prevLapData.maxLap
      }
    })
  }

  const resetTimer = () => {
    setIsRunning(false)
    setElapsedTime(0)
    setLapData(initialLapData)
  }

  const toggleTimer = () => setIsRunning(!isRunning)
  const lapResetButtonAction = () => !isRunning ? resetTimer() : addLap()

  return (
    <div>
      <div className='wrapper'>
        <div className='main'>
          <div className='timer-container'>
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
