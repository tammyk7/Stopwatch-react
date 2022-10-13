import React from 'react'
import { formatTime } from '../utils/utils'

export default function Laps({ lapData, elapsedTime }) {
  const currentLapNumber = lapData.laps.length + 1
  const runningLapTime = elapsedTime - lapData.totalLapTime

  const lapLength = (lapTime) => {
    if (lapData.laps.length >= 2) {
      if (lapTime === lapData.minLap) {
        return 'fastest-lap'
      } else if (lapTime === lapData.maxLap) {
        return 'slowest-lap'
      } else {
        return ''
      }
    }
  }

  return (
    <div className='lap-table-container'>
      <table className='lap-table'>
        <tbody className='table-body'>
          {lapData.laps.map((lapTime, i) => {
            return (
              <tr key={i} 
                  className={`lap-row ${lapLength(lapTime)}`}>
                <td>Lap {i + 1}</td>
                <td>{formatTime(lapTime)}</td>
              </tr>)})
          }
          {
          elapsedTime > 0 && (
            <tr className='lap-row'>
              <td>Lap {currentLapNumber}</td>
              <td>{formatTime(runningLapTime)}</td>
            </tr>)
          }
        </tbody>
      </table>
    </div>
  )
}
