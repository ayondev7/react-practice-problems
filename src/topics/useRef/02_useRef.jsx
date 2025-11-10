import React, {useRef, useState, useEffect} from 'react'

export default function UseRefExample2(){
  /**
   * CHALLENGE: Track Previous State Value
   * 
   * LEARNING GOALS:
   * - Using useRef to store values that persist across renders
   * - Tracking previous state without causing re-renders
   * - Comparing current vs previous values
   * - Understanding when to use ref vs state
   * 
   * TODO:
   * 1. Create state for: count
   * 2. Create ref to store previous count value
   * 3. Use useEffect to update ref with previous value after render
   * 4. Display both current and previous count
   * 5. Show the difference between them
   */

  const [count, setCount] = useState(0)
  // TODO: Create ref for previous value
  // const prevCountRef = useRef()

  // TODO: Use useEffect to update prevCountRef
  // useEffect(() => {
  //   prevCountRef.current = count
  // }, [count])

  // const prevCount = prevCountRef.current
  const prevCount = 0
  const difference = count - (prevCount || 0)

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">useRef — Track Previous Value</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <p className="text-sm text-gray-600 mb-2">Previous Count</p>
          <p className="text-4xl font-bold text-blue-600">
            {/* TODO: Display prevCount */}
            {prevCount ?? '-'}
          </p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-6 text-center">
          <p className="text-sm text-gray-600 mb-2">Current Count</p>
          <p className="text-4xl font-bold text-green-600">{count}</p>
        </div>

        <div className="bg-purple-50 rounded-lg p-6 text-center">
          <p className="text-sm text-gray-600 mb-2">Difference</p>
          <p className="text-4xl font-bold text-purple-600">
            {difference > 0 ? '+' : ''}{difference}
          </p>
        </div>
      </div>

      <div className="flex gap-2 justify-center mb-6">
        <button
          onClick={() => setCount(c => c - 1)}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-xl"
        >
          - 1
        </button>
        <button
          onClick={() => setCount(c => c + 1)}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-xl"
        >
          + 1
        </button>
        <button
          onClick={() => setCount(c => c + 5)}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-xl"
        >
          + 5
        </button>
        <button
          onClick={() => setCount(0)}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
        >
          Reset
        </button>
      </div>

      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <p className="text-sm">
          💡 <strong>Why useRef?</strong> We need to remember the previous value without 
          triggering a re-render. State would cause infinite loops in this pattern!
        </p>
      </div>
    </div>
  )
}
