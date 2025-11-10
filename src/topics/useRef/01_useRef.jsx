import React, {useRef, useState} from 'react'

export default function UseRefExample1(){
  /**
   * CHALLENGE: Focus Management & Input Control
   * 
   * LEARNING GOALS:
   * - Basic useRef to reference DOM elements
   * - Programmatically focusing inputs
   * - Accessing DOM properties without re-render
   * - Difference between ref and state
   * 
   * TODO:
   * 1. Create refs for: nameInput, emailInput, passwordInput
   * 2. Implement focusInput(refName) to focus specific input
   * 3. Implement clearAll() to clear all inputs and focus first
   * 4. Show character count using ref (without causing re-render)
   */

  // TODO: Create refs
  // const nameRef = useRef(null)
  // const emailRef = useRef(null)
  // const passwordRef = useRef(null)

  // TODO: Implement focus function
  const focusInput = (inputRef) => {
    // Use inputRef.current.focus()
  }

  // TODO: Implement clear all
  const clearAll = () => {
    // Clear all input values using refs
    // Focus the first input
  }

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">useRef — Focus Management</h4>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            // TODO: Add ref prop
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            // TODO: Add ref prop
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            // TODO: Add ref prop
            type="password"
            placeholder="Enter password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        <button
          // TODO: Add onClick to focus name input
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Focus Name
        </button>
        <button
          // TODO: Add onClick to focus email input
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Focus Email
        </button>
        <button
          // TODO: Add onClick to focus password input
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
        >
          Focus Password
        </button>
        <button
          onClick={clearAll}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Clear All
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-600">
          💡 <strong>Key Concept:</strong> useRef doesn't cause re-renders when its value changes, 
          unlike useState. Perfect for accessing DOM elements!
        </p>
      </div>
    </div>
  )
}
