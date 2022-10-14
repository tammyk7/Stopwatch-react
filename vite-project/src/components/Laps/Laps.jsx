import React from 'react'
import { formatTime } from '../utils/utils'

export function Laps({ lapData, elapsedTime }) {
  const currentLapNumber = lapData.laps.length + 1
  const runningLapTime = elapsedTime - lapData.totalLapTime

  const lapLength = (lapTime) => {
    switch (lapData.laps.length >= 2) {
      case (lapTime === lapData.minLap):
        return 'fastest-lap'
      case (lapTime === lapData.maxLap):
        return 'slowest-lap'
      default: 
        return ''
    }
  }

  return (
    <div className='lap-table-container'>
      <table className='lap-table'>
        <tbody className='table-body'>
          {
            lapData.laps.map((lapTime, i) => {
            return (
              <tr key={i} 
                  className={`lap-row ${lapLength(lapTime)}`}>
                <td>Lap {i + 1}</td>
                <td>{formatTime(lapTime)}</td>
              </tr>)})
          }
          {
            (elapsedTime > 0) &&
              <tr className='lap-row'>
                <td>Lap {currentLapNumber}</td>
                <td>{formatTime(runningLapTime)}</td>
              </tr>
          }
        </tbody>
      </table>
    </div>
  )
}
