import React, {useMemo, useCallback, useState} from 'react'

export default function UseMemoCallbackExample1(){
  /**
   * CHALLENGE: Expensive Computation with useMemo
   * 
   * LEARNING GOALS:
   * - Understanding when computation is expensive
   * - Using useMemo to cache computed values
   * - Proper dependency array usage
   * - Measuring performance impact
   * 
   * TODO:
   * 1. State for: number, multiplier
   * 2. Create expensiveCalculation() that finds prime factors (slow!)
   * 3. Wrap calculation with useMemo
   * 4. Compare render count with/without memoization
   * 5. Add unrelated state to see memoization benefit
   */

  const [number, setNumber] = useState(100)
  const [multiplier, setMultiplier] = useState(1)
  const [theme, setTheme] = useState('light')
  const [renderCount, setRenderCount] = useState(0)

  // Track renders
  React.useEffect(() => {
    setRenderCount(c => c + 1)
  })

  // Expensive calculation (intentionally slow)
  const expensiveCalculation = (num) => {
    console.log('🔥 Running expensive calculation...')
    let result = 0
    for (let i = 0; i < 100000000; i++) {
      result += i
    }
    // Find prime factors (expensive for large numbers)
    const factors = []
    for (let i = 2; i <= num; i++) {
      while (num % i === 0) {
        factors.push(i)
        num /= i
      }
    }
    return factors
  }

  // TODO: Wrap with useMemo
  // const primeFactors = useMemo(() => {
  //   return expensiveCalculation(number)
  // }, [number])
  
  // Without memoization (comment out when testing useMemo)
  const primeFactors = expensiveCalculation(number)

  // Simple calculation (not expensive, doesn't need memo)
  const result = number * multiplier

  return (
    <div className={`card ${theme === 'dark' ? 'bg-gray-800 text-white' : ''}`}>
      <h4 className="text-xl font-bold mb-4">useMemo — Expensive Computation</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Input Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Number (for prime factors): {number}
            </label>
            <input
              type="range"
              min="10"
              max="1000"
              value={number}
              onChange={(e) => setNumber(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Multiplier: {multiplier}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={multiplier}
              onChange={(e) => setMultiplier(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <button
              onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
            >
              Toggle Theme (unrelated state)
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              Simple Calculation (no memo needed):
            </p>
            <p className="text-2xl font-bold">
              {number} × {multiplier} = {result}
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              Prime Factors of {number}:
            </p>
            <p className="text-sm font-mono">
              {primeFactors.join(', ') || 'None'}
            </p>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Render Count: <strong>{renderCount}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-orange-50 dark:bg-orange-900 rounded-lg p-4 border border-orange-200">
        <p className="text-sm mb-2">
          🎯 <strong>Exercise:</strong>
        </p>
        <ol className="text-sm space-y-1 list-decimal list-inside">
          <li>Toggle theme and watch console - calculation runs every time!</li>
          <li>Wrap expensiveCalculation with useMemo([number])</li>
          <li>Toggle theme again - calculation only runs when number changes!</li>
          <li>Open console to see when calculation runs</li>
        </ol>
      </div>
    </div>
  )
}
