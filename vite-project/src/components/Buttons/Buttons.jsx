import React from "react";

export const Buttons = ({isRunning,elapsedTime,toggleTimer,lapResetButtonAction,}) => {

  const startStopButtonText = isRunning ? "Stop" : "Start"
  const startStopButtonColor = isRunning ? "round-button stop-button" : "round-button start-button"
  const lapResetButtonText = isRunning || elapsedTime === 0 ? "Lap" : "Reset"
  const isLapButtonDisabled = !isRunning && elapsedTime === 0

  return (
    <div className="button-container">
      <button
        className="round-button lap-button"
        onClick={lapResetButtonAction}
        disabled={isLapButtonDisabled}
      >
        {lapResetButtonText}
      </button>
      <button className={startStopButtonColor} onClick={toggleTimer}>
        {startStopButtonText}
      </button>
    </div>
  )
}
