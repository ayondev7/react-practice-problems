import React, {useMemo, useState} from 'react'

export default function UseMemoCallbackExample5(){
  /**
   * CHALLENGE: Performance Comparison - See the Difference!
   * 
   * TODO:
   * 1. Toggle memoization on/off
   * 2. Track calculation times
   * 3. Type in text input (unrelated state)
   * 4. Compare performance with/without useMemo
   */

  const [useMemoization, setUseMemoization] = useState(false)
  const [number, setNumber] = useState(100)
  const [text, setText] = useState('')

  const expensiveCalc = (num) => {
    const start = performance.now()
    let result = 0
    for (let i = 0; i < 50000000; i++) result += i
    return { value: result, time: (performance.now() - start).toFixed(2) }
  }

  // TODO: Compare memoized vs non-memoized
  const result = useMemoization
    ? useMemo(() => expensiveCalc(number), [number])
    : expensiveCalc(number)

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">useMemo — Performance Comparison</h4>
      
      <div className="bg-blue-50 rounded-lg p-4 mb-4">
        <button
          onClick={() => setUseMemoization(!useMemoization)}
          className={`px-6 py-3 rounded-lg font-semibold ${
            useMemoization ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}
        >
          {useMemoization ? '✅ Memoization ON' : '❌ Memoization OFF'}
        </button>
      </div>

      <div className="space-y-4 mb-4">
        <div>
          <label className="block mb-2">Number: {number}</label>
          <input
            type="range"
            min="1"
            max="200"
            value={number}
            onChange={(e) => setNumber(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Type here (unrelated):</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Type to see the difference..."
          />
        </div>
      </div>

      <div className="bg-purple-50 rounded-lg p-4">
        <p className="text-sm mb-1">Last Calculation Time:</p>
        <p className="text-3xl font-bold">{result.time}ms</p>
      </div>

      <div className="mt-4 bg-yellow-50 rounded-lg p-4">
        <p className="text-sm">
          🎯 Type in the text input and watch the time! With memoization OFF, 
          every keystroke triggers recalculation. With it ON, only number changes trigger it!
        </p>
      </div>
    </div>
  )
}
