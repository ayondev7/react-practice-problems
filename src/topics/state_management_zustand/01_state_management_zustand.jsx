import React from 'react'
import { create } from 'zustand'

/**
 * CHALLENGE: Basic Zustand Store
 * 
 * LEARNING GOALS:
 * - Create a Zustand store with create()
 * - Subscribe to store state in components
 * - Update state with actions
 * - No Context/Provider needed!
 * - Minimal boilerplate vs Redux
 * 
 * TODO:
 * 1. Create store with initial state
 * 2. Add actions to update state
 * 3. Use store in multiple components
 * 4. See how Zustand avoids prop drilling
 * 5. Compare with useState and Context
 * 
 * Note: Run `npm install zustand` if not installed
 */

// Create Zustand store (no provider needed!)
const useCounterStore = create((set) => ({
  // State
  count: 0,
  
  // Actions
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  setCount: (value) => set({ count: value }),
}))

// Component 1: Counter Display
function CounterDisplay() {
  // Subscribe to only the count value
  const count = useCounterStore((state) => state.count)
  
  return (
    <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6 text-center">
      <p className="text-gray-600 text-sm mb-2">Current Count</p>
      <p className="text-6xl font-bold text-blue-600">{count}</p>
    </div>
  )
}

// Component 2: Counter Controls
function CounterControls() {
  // Subscribe to only the actions
  const { increment, decrement, reset } = useCounterStore((state) => ({
    increment: state.increment,
    decrement: state.decrement,
    reset: state.reset,
  }))
  
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <button
        onClick={decrement}
        className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold text-lg"
      >
        ➖ Decrement
      </button>
      <button
        onClick={reset}
        className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-semibold text-lg"
      >
        🔄 Reset
      </button>
      <button
        onClick={increment}
        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold text-lg"
      >
        ➕ Increment
      </button>
    </div>
  )
}

// Component 3: Stats (derived state)
function CounterStats() {
  const count = useCounterStore((state) => state.count)
  
  const isEven = count % 2 === 0
  const isPositive = count > 0
  const isNegative = count < 0
  
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className={`rounded-lg p-4 text-center ${isEven ? 'bg-green-100 border border-green-300' : 'bg-gray-100 border border-gray-300'}`}>
        <p className="text-sm text-gray-600">Even?</p>
        <p className="text-xl font-bold">{isEven ? '✅ Yes' : '❌ No'}</p>
      </div>
      <div className={`rounded-lg p-4 text-center ${isPositive ? 'bg-blue-100 border border-blue-300' : 'bg-gray-100 border border-gray-300'}`}>
        <p className="text-sm text-gray-600">Positive?</p>
        <p className="text-xl font-bold">{isPositive ? '✅ Yes' : '❌ No'}</p>
      </div>
      <div className={`rounded-lg p-4 text-center ${isNegative ? 'bg-red-100 border border-red-300' : 'bg-gray-100 border border-gray-300'}`}>
        <p className="text-sm text-gray-600">Negative?</p>
        <p className="text-xl font-bold">{isNegative ? '✅ Yes' : '❌ No'}</p>
      </div>
    </div>
  )
}

export default function ZustandExample1(){
  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">Zustand — Basic Store</h4>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <p className="text-sm mb-2">
          <strong>🎉 Zustand Advantages:</strong>
        </p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>No Context Provider needed!</li>
          <li>Minimal boilerplate (vs Redux)</li>
          <li>TypeScript friendly</li>
          <li>Automatic re-render optimization</li>
          <li>Can be used outside React</li>
        </ul>
      </div>

      <div className="space-y-6">
        <CounterDisplay />
        <CounterControls />
        <CounterStats />
      </div>

      <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <p className="text-sm mb-2">
          <strong>🔧 Store Setup:</strong>
        </p>
        <pre className="text-xs bg-white p-3 rounded overflow-auto">
{`import { create } from 'zustand'

const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ 
    count: state.count + 1 
  })),
  decrement: () => set((state) => ({ 
    count: state.count - 1 
  })),
  reset: () => set({ count: 0 }),
}))

// Usage in component:
const count = useCounterStore(state => state.count)
const increment = useCounterStore(state => state.increment)`}
        </pre>
      </div>

      <div className="mt-4 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <p className="text-sm">
          <strong>💡 Selector Pattern:</strong> Components only re-render when their selected state changes. 
          <code className="bg-white px-1 rounded ml-1">useCounterStore(state => state.count)</code> 
          only re-renders when count changes, not when other store values change!
        </p>
      </div>
    </div>
  )
}
