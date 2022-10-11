// import { useState } from 'react'

// function Stopwatch() {
//     const [time, setTime] = useState(0)
//     const [paused, setPaused] = useState(false)
//     const [active, setActive] = useState(true)

//     setTime((time) => time + 10, 10);

// }

// const padNumber =  (value) => Math.floor(value).toString().padStart(2, '0')

// const getFormattedTime = (elapsedTime) => {
//     const centiseconds =(elapsedTime % 1000) / 10
//     const seconds = (elapsedTime / 1000) % 60
//     const minutes =(elapsedTime / (1000 * 60)) % 60
//     return [centiseconds, seconds, minutes].map(padNumber) 
// }
