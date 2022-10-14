import { useEffect, useReducer } from 'react'
import { reducer, initialState } from './StopwatchReducer'
import { Buttons } from '../Buttons/Buttons'
import { Laps }  from '../Laps/Laps'
import { formatTime } from '../utils/utils'
import './App.css'

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
    
  useEffect(() => {
      const startTime = Date.now() - state.elapsedTime
      if (state.isRunning) {
      const interval = setInterval(() => dispatch({type: 'setElapsedTime', startTime}), 10)
      return () => clearInterval(interval)
    }
  }, [state.isRunning])

  const addLap = () => dispatch({type: 'addLap'})
  const resetTimer = () => dispatch({type: 'resetTimer'})
  const toggleTimer = () => dispatch({type: 'toggleTimer'})
  const lapResetButtonAction = () => !state.isRunning ? resetTimer() : addLap()

  return (
    <div>
      <div className='wrapper'>
        <div className='main'>
          <div className='timer-container'>
            <span>{formatTime(state.elapsedTime)}</span>
          </div>
          <Buttons
            isRunning={state.isRunning}
            elapsedTime={state.elapsedTime}
            toggleTimer={toggleTimer}
            lapResetButtonAction={lapResetButtonAction}/>
          <Laps 
            lapData={state}
            elapsedTime={state.elapsedTime}/>
        </div>
      </div>
    </div>
  )
}
export default App

