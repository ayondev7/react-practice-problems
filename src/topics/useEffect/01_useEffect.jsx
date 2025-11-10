import React, {useEffect, useState} from 'react'

export default function UseEffectExample1(){
  /**
   * CHALLENGE: Real-time Clock with Cleanup
   * 
   * LEARNING GOALS:
   * - Basic useEffect with empty dependency array
   * - Cleanup function to prevent memory leaks
   * - setInterval and clearInterval
   * - Formatting time for display
   * 
   * TODO:
   * 1. Create state for current time
   * 2. Use useEffect to start an interval that updates time every second
   * 3. Return cleanup function to clear the interval
   * 4. Format and display time in a readable format
   */

  // TODO: Add your state
  // const [time, setTime] = useState(new Date())

  // TODO: Implement useEffect with interval
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // Update time every second
  //   }, 1000)
  //
  //   return () => {
  //     // Cleanup: clear the interval
  //   }
  // }, []) // Empty array = run once on mount

  // TODO: Format time (or use time.toLocaleTimeString())
  const formatTime = (date) => {
    return '00:00:00'
  }

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">useEffect — Real-time Clock (Cleanup)</h4>
      
      <div className="text-center">
        <div className="text-6xl font-mono font-bold text-blue-600 mb-4">
          {/* TODO: Display formatted time */}
          00:00:00
        </div>
        <p className="text-gray-600">
          This clock updates every second using useEffect + setInterval
        </p>
        <p className="text-sm text-gray-500 mt-2">
          ⚠️ Remember to cleanup the interval to prevent memory leaks!
        </p>
      </div>
    </div>
  )
}
