import React, {useEffect, useState} from 'react'

export default function UseEffectExample4(){
  /**
   * CHALLENGE: Window Resize Listener with Throttling
   * 
   * LEARNING GOALS:
   * - Adding and removing event listeners
   * - Throttling to optimize performance
   * - Working with window object
   * - Cleanup to prevent memory leaks
   * 
   * TODO:
   * 1. State for: windowWidth, windowHeight
   * 2. Add resize event listener in useEffect
   * 3. Implement throttling (update only every 200ms max)
   * 4. Remove event listener in cleanup
   * 5. Display responsive breakpoint info
   */

  // TODO: Add your state
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  // const [windowHeight, setWindowHeight] = useState(window.innerHeight)

  // TODO: Implement useEffect with throttled resize listener
  // useEffect(() => {
  //   let timeoutId = null
  //   
  //   const handleResize = () => {
  //     // Throttle: clear existing timeout
  //     clearTimeout(timeoutId)
  //     
  //     // Set new timeout
  //     timeoutId = setTimeout(() => {
  //       setWindowWidth(window.innerWidth)
  //       setWindowHeight(window.innerHeight)
  //     }, 200) // Update at most every 200ms
  //   }
  //   
  //   window.addEventListener('resize', handleResize)
  //   
  //   return () => {
  //     window.removeEventListener('resize', handleResize)
  //     clearTimeout(timeoutId)
  //   }
  // }, [])

  // TODO: Determine responsive breakpoint
  const getBreakpoint = (width) => {
    if (width < 640) return 'Mobile'
    if (width < 768) return 'Small Tablet'
    if (width < 1024) return 'Tablet'
    if (width < 1280) return 'Laptop'
    return 'Desktop'
  }

  const breakpoint = 'Unknown' // getBreakpoint(windowWidth)

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">useEffect — Window Resize Listener</h4>
      
      <div className="space-y-6">
        {/* Dimension Display */}
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <div className="text-5xl font-bold text-blue-600 mb-2">
            {/* TODO: Display windowWidth */}0 × {/* TODO: Display windowHeight */}0
          </div>
          <p className="text-gray-600">Current Window Size (pixels)</p>
        </div>

        {/* Breakpoint Badge */}
        <div className="text-center">
          <span className="inline-block px-6 py-3 bg-purple-500 text-white rounded-full text-xl font-semibold">
            📱 {/* TODO: Display breakpoint */}Unknown
          </span>
          <p className="text-sm text-gray-500 mt-2">Responsive Breakpoint</p>
        </div>

        {/* Breakpoint Reference */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h5 className="font-semibold mb-3">Tailwind Breakpoints:</h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>📱 Mobile:</span>
              <span className="font-mono">&lt; 640px</span>
            </div>
            <div className="flex justify-between">
              <span>📱 Small Tablet:</span>
              <span className="font-mono">640px - 767px</span>
            </div>
            <div className="flex justify-between">
              <span>💻 Tablet:</span>
              <span className="font-mono">768px - 1023px</span>
            </div>
            <div className="flex justify-between">
              <span>💻 Laptop:</span>
              <span className="font-mono">1024px - 1279px</span>
            </div>
            <div className="flex justify-between">
              <span>🖥️ Desktop:</span>
              <span className="font-mono">≥ 1280px</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 italic">
          🎯 Try resizing your browser window to see the values update!
        </p>
      </div>
    </div>
  )
}
