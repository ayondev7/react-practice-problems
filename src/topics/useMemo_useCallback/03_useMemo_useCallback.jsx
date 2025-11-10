import React, {useMemo, useCallback, useState, memo} from 'react'

// TODO: Wrap this component with memo()
// const ExpensiveChild = memo(({ onClick, data }) => {
const ExpensiveChild = ({ onClick, data }) => {
  console.log('🔄 ExpensiveChild rendered!')
  
  return (
    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
      <h5 className="font-semibold mb-2">Expensive Child Component</h5>
      <p className="text-sm mb-3">Data: {data}</p>
      <button
        onClick={onClick}
        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
      >
        Click Me
      </button>
      <p className="text-xs text-gray-500 mt-2">
        (Check console for render count)
      </p>
    </div>
  )
}
// })

export default function UseMemoCallbackExample3(){
  /**
   * CHALLENGE: useCallback with React.memo()
   * 
   * LEARNING GOALS:
   * - Understanding referential equality
   * - Using useCallback to stabilize function references
   * - Combining useCallback with React.memo()
   * - Preventing unnecessary child re-renders
   * 
   * TODO:
   * 1. Wrap ExpensiveChild with memo()
   * 2. Create handleClick with useCallback
   * 3. Observe renders WITHOUT useCallback (every state change re-renders child)
   * 4. Add useCallback and see child only re-renders when dependencies change
   * 5. Add unrelated state to demonstrate the optimization
   */

  const [count, setCount] = useState(0)
  const [text, setText] = useState('')
  const [childData, setChildData] = useState('Initial data')

  // TODO: Wrap with useCallback
  // const handleClick = useCallback(() => {
  //   console.log('Button clicked!', count)
  //   alert(`Count is: ${count}`)
  // }, [count])
  
  // Without useCallback (creates new function every render)
  const handleClick = () => {
    console.log('Button clicked!', count)
    alert(`Count is: ${count}`)
  }

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">useCallback — Prevent Child Re-renders</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Parent Controls */}
        <div className="space-y-4">
          <h5 className="font-semibold">Parent Component</h5>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm mb-2">Count: {count}</p>
            <div className="flex gap-2">
              <button
                onClick={() => setCount(c => c + 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Increment Count
              </button>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <label className="block text-sm mb-2">
              Type here (unrelated state):
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type something..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="bg-yellow-50 rounded-lg p-4">
            <label className="block text-sm mb-2">
              Child Data (affects child):
            </label>
            <input
              type="text"
              value={childData}
              onChange={(e) => setChildData(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Child Component */}
        <div>
          <h5 className="font-semibold mb-4">Child Component</h5>
          <ExpensiveChild onClick={handleClick} data={childData} />
        </div>
      </div>

      <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
        <p className="text-sm mb-2">
          🎯 <strong>Exercise:</strong>
        </p>
        <ol className="text-sm space-y-1 list-decimal list-inside">
          <li>Type in "unrelated state" input - child re-renders unnecessarily!</li>
          <li>Wrap ExpensiveChild with memo()</li>
          <li>Still re-renders because handleClick is new each time</li>
          <li>Wrap handleClick with useCallback([count])</li>
          <li>Now typing doesn't re-render child - optimization complete!</li>
        </ol>
      </div>
    </div>
  )
}
