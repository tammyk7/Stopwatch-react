export const reducer = (state, action) => {
    switch (action.type) {
      case 'addLap':
        const currentLapTime = state.elapsedTime - state.totalLapTime
        return  {
              ...state,
              laps: [...state.laps, currentLapTime],
              totalLapTime: currentLapTime + state.totalLapTime,
              minLap: (currentLapTime < state.minLap) ? currentLapTime : state.minLap,
              maxLap: (currentLapTime > state.maxLap) ? currentLapTime : state.maxLap
            }
      case 'resetTimer':
        return {
          ...initialState
        }
      case 'toggleTimer':
        return {
          ...state,
          isRunning: !state.isRunning
        }
      case 'setElapsedTime': {
        return {
          ...state,
          elapsedTime: Date.now() - action.startTime
        }
      }
    }
  }
  
  export const initialState = {
    laps: [],
    totalLapTime: 0,
    minLap: Number.MAX_VALUE,
    maxLap: 0,
      elapsedTime: 0,
      isRunning: false
    }