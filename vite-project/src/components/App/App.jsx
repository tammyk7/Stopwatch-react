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


// I added this back in based on what was accomplished in the code review.
useEffect(() => {
  if (elapsedTime > 0) {
      setLapData((prevLapData) => {
        const currentRunningLap = prevLapData.laps[0]
        const newRunningLap = {
          ...currentRunningLap,
          lapTime: elapsedTime - lapData.totalLapTime,
        }

        return {
          ...prevLapData,
          laps: [newRunningLap, ...prevLapData.laps.slice(1)]
        }
      })  
  }

}, [elapsedTime])

// I assume this is going to eventually turn into your 'adding laps'
// functionality.

// Add Lap Functionality
// 1. add an additional lap object to the laps array
// 2. if laps.length > 2, determine min & max  
// 3. if lap is determined to be min or max, add respective class for font color

const firstLap = () => {
 console.log(lapData)

}

// Very nicely organized.
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
  // I updated your JSX to be slightly more semantic. I know you will be working on
  // separating this into other components so I grouped the app into sections that you 
  // can play with as areas that could be their own components.
  <div className='wrapper'>
    <main className='main'>
      {/* You could break the actual timer into it's own component.
            It could take in the elapsedTime as a prop and then handle just displaying 
            the formatted time.
        */}
      <section className='timer-container'>
        <time id='timer'>{formatTime(elapsedTime)}</time>
      </section>

      {/* The action buttons could be separated into their own component.
            The thing to keep in mind is that you will need to send functions as props,
            in order to have the ability to pass information from the Buttons component back
            to the App component. See article: https://bobbyhadz.com/blog/react-pass-data-from-child-to-parent
            for how to do this.
        */}
      <section className='button-container'>
        <button
          className='round-button lap-button'
          id='lapResetButton'
          onClick={lapResetButtonAction}
          disabled={isLapButtonDisabled}
        >
          {lapResetButtonText}
        </button>
        <button
          className={startStopButtonColor}
          id='startStopButton'
          onClick={toggleTimer}
        >
          {startStopButtonText}
        </button>
      </section>
      {/* The laps table would be a good instance for separation in to a new component.
            It is a component that only needs to take in data (via props) & display it.
            You could send the lapData to the Laps component.
        */}
      <section className='lap-table-container'>
        <table className='lap-table' id='lapTable'>
          <tbody>
            {
              // lapData.laps?.map <-
              // adding the ? is a way to check if there is anything
              // in the array first before attempting to map over it.
              // ? essentially says: if everything to the left exists,
              // move forward with the right method.
              lapData.laps?.map((lap) => {
                return (
                  // Whenever you map over data and have a list of
                  // React components, you need to add a key
                  // to the component so that React has a unique reference
                  // to the individual component in the list.
                  // This gives React a way to identify which components in the list
                  // need to be updated at any given point. It is better to not use
                  // indexes for this key because:
                  // 1. Performance Issues due to unnecessary re-renders.
                  // 2. Issues in data mapping in case list items are sorted, filtered, or deleted.

                  // I chose Date.now() to create a quick unique key.
                  <tr key={`${Date.now()}-${lap.lapTime}`} className='lap-row'>
                    <td className='lap-number'>{`Lap ${lap.lapNumber + 1}`}</td>
                    <td className='lap-time'>{formatTime(lap.lapTime)}</td>
                  </tr>
                );
              })
            }
            {/* <tr className='lap-row'>
                <td>Lap 1</td>
                <td>00:00.00</td>
              </tr> */}
          </tbody>
        </table>
      </section>
    </main>
  </div>
);
};

export default App