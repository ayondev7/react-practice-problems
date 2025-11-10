import React, {useRef, useState} from 'react'

export default function UseRefExample4(){
  /**
   * CHALLENGE: Stopwatch with useRef
   * 
   * LEARNING GOALS:
   * - Using useRef to store interval IDs
   * - Avoiding stale closures in intervals
   * - Precise timing control
   * - Start/stop/reset patterns
   * 
   * TODO:
   * 1. State for: time (in milliseconds), isRunning
   * 2. Ref for: intervalId
   * 3. Implement start() - setInterval that increments time
   * 4. Implement pause() - clearInterval
   * 5. Implement reset() - clear and set time to 0
   * 6. Implement lap() - record lap times
   */

  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [laps, setLaps] = useState([])
  // TODO: Create ref for interval ID
  // const intervalRef = useRef(null)

  const start = () => {
    // TODO: Start interval, store ID in ref
    // setIsRunning(true)
    // intervalRef.current = setInterval(() => {
    //   setTime(t => t + 10)
    // }, 10)
  }

  const pause = () => {
    // TODO: Clear interval using ref
    // clearInterval(intervalRef.current)
    // setIsRunning(false)
  }

  const reset = () => {
    // TODO: Clear interval, reset time and laps
    // clearInterval(intervalRef.current)
    // setTime(0)
    // setIsRunning(false)
    // setLaps([])
  }

  const lap = () => {
    // TODO: Add current time to laps array
    // setLaps(prev => [...prev, time])
  }

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    const milliseconds = Math.floor((ms % 1000) / 10)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">useRef — Stopwatch</h4>
      
      {/* Timer Display */}
      <div className="bg-black text-white rounded-lg p-8 mb-6 text-center">
        <div className="text-6xl font-mono font-bold">
          {formatTime(time)}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3 justify-center mb-6">
        {!isRunning ? (
          <button
            onClick={start}
            className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-lg font-semibold"
          >
            ▶ Start
          </button>
        ) : (
          <button
            onClick={pause}
            className="px-8 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition text-lg font-semibold"
          >
            ⏸ Pause
          </button>
        )}
        
        <button
          onClick={lap}
          disabled={!isRunning}
          className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition text-lg font-semibold"
        >
          ⏱ Lap
        </button>

        <button
          onClick={reset}
          className="px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-lg font-semibold"
        >
          🔄 Reset
        </button>
      </div>

      {/* Laps */}
      {laps.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h5 className="font-semibold mb-3">Lap Times</h5>
          <div className="space-y-2">
            {laps.map((lapTime, index) => (
              <div key={index} className="flex justify-between items-center bg-white p-3 rounded border">
                <span className="font-semibold text-gray-700">Lap {index + 1}</span>
                <span className="font-mono text-blue-600">{formatTime(lapTime)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
