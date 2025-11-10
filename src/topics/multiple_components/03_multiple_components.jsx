import React, {useState} from 'react'

/**
 * CHALLENGE: Render Props Pattern
 * 
 * LEARNING GOALS:
 * - Share code between components using render props
 * - Function as children pattern
 * - Inversion of control for rendering
 * - Reusable logic without HOCs
 * - Dynamic component composition
 * 
 * TODO:
 * 1. Create a MouseTracker component with render prop
 * 2. Pass mouse position to child via function
 * 3. Let consumer decide how to render the data
 * 4. Build multiple visualizations using same logic
 * 5. Understand when to use vs custom hooks
 */

// Reusable component that tracks mouse position
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    // Get coordinates relative to the tracking area
    const rect = e.currentTarget.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative border-2 border-blue-300 rounded-lg h-64 bg-blue-50 overflow-hidden cursor-crosshair"
    >
      {/* Consumer controls rendering via render prop */}
      {render(position)}
    </div>
  )
}

// Alternative: function as children
function DataFetcher({ url, children }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setData({ 
      message: 'Data loaded!', 
      timestamp: new Date().toLocaleTimeString() 
    })
    setLoading(false)
  }

  return (
    <div>
      {/* Pass control to children via function */}
      {children({ data, loading, refetch: fetchData })}
    </div>
  )
}

export default function MultipleComponents3(){
  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">Component Patterns — Render Props</h4>
      
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
        <p className="text-sm mb-2">
          <strong>🎨 Pattern Explanation:</strong>
        </p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Component provides data via function prop</li>
          <li>Consumer decides HOW to render that data</li>
          <li>Separation: logic (parent) vs presentation (child)</li>
          <li>Great for reusable behavior (mouse tracking, data fetching)</li>
          <li>Modern alternative: Custom Hooks (often simpler!)</li>
        </ul>
      </div>

      {/* Example 1: Mouse Tracker with different visualizations */}
      <div className="mb-6">
        <h5 className="font-bold mb-3">Example 1: Mouse Position Tracker</h5>
        
        <MouseTracker
          render={(position) => (
            <>
              {/* Coordinates display */}
              <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg px-4 py-2 font-mono text-sm">
                <div>X: {Math.round(position.x)}px</div>
                <div>Y: {Math.round(position.y)}px</div>
              </div>

              {/* Following circle */}
              <div
                className="absolute w-8 h-8 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none shadow-lg"
                style={{
                  left: `${position.x}px`,
                  top: `${position.y}px`
                }}
              />

              {/* Ripple effect */}
              <div
                className="absolute w-16 h-16 border-2 border-blue-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-50"
                style={{
                  left: `${position.x}px`,
                  top: `${position.y}px`
                }}
              />

              {/* Instructions */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white rounded-lg px-4 py-2 text-sm">
                Move your mouse in this area
              </div>
            </>
          )}
        />
      </div>

      {/* Example 2: Data Fetcher with function as children */}
      <div className="mb-6">
        <h5 className="font-bold mb-3">Example 2: Data Fetcher (Function as Children)</h5>
        
        <DataFetcher url="/api/data">
          {({ data, loading, refetch }) => (
            <div className="border border-gray-300 rounded-lg p-4">
              <button
                onClick={refetch}
                disabled={loading}
                className="mb-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-400"
              >
                {loading ? 'Loading...' : 'Fetch Data'}
              </button>

              {data && (
                <div className="bg-green-50 border border-green-200 rounded p-4">
                  <p className="font-semibold text-green-700">✓ {data.message}</p>
                  <p className="text-sm text-gray-600">Time: {data.timestamp}</p>
                </div>
              )}

              {!data && !loading && (
                <p className="text-gray-400">Click button to fetch data</p>
              )}
            </div>
          )}
        </DataFetcher>
      </div>

      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <p className="text-sm mb-2">
          <strong>🤔 Render Props vs Custom Hooks:</strong>
        </p>
        <div className="text-sm space-y-2">
          <div>
            <strong>Render Props (this example):</strong>
            <pre className="bg-white p-2 rounded mt-1 text-xs overflow-auto">
{`<MouseTracker render={pos => <div>{pos.x}</div>} />`}
            </pre>
          </div>
          <div>
            <strong>Custom Hook (modern alternative):</strong>
            <pre className="bg-white p-2 rounded mt-1 text-xs overflow-auto">
{`const pos = useMousePosition()
return <div>{pos.x}</div>`}
            </pre>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            ℹ️ Custom hooks are usually simpler and more idiomatic in modern React!
          </p>
        </div>
      </div>
    </div>
  )
}
