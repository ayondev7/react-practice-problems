import React, {useEffect, useState} from 'react'

export default function UseEffectExample2(){
  /**
   * CHALLENGE: Fetch User Data with Loading & Error States
   * 
   * LEARNING GOALS:
   * - Fetching data with useEffect
   * - Handling loading and error states
   * - Dependencies array (re-fetch when userId changes)
   * - Conditional rendering based on state
   * 
   * TODO:
   * 1. State for: userData, loading, error
   * 2. Create useEffect that fetches from: https://jsonplaceholder.typicode.com/users/${userId}
   * 3. Handle loading state before fetch
   * 4. Handle errors with try-catch
   * 5. Re-fetch when userId changes (add userId to dependencies)
   * 6. Conditional rendering: loading spinner, error message, or user data
   */

  // TODO: Add your state
  // const [userId, setUserId] = useState(1)
  // const [userData, setUserData] = useState(null)
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState(null)

  // TODO: Implement useEffect for fetching
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       setLoading(true)
  //       setError(null)
  //       const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
  //       if (!response.ok) throw new Error('Failed to fetch')
  //       const data = await response.json()
  //       setUserData(data)
  //     } catch (err) {
  //       setError(err.message)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   fetchUser()
  // }, [userId]) // Re-run when userId changes

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">useEffect — Fetch Data (Dependencies)</h4>
      
      {/* User Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Select User ID (1-10):</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => (
            <button
              key={id}
              // TODO: Add onClick to change userId
              className={`px-4 py-2 rounded-lg transition
                ${/* TODO: Conditional className - blue if selected, gray otherwise */ 'bg-gray-200'}`}
            >
              {id}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {/* TODO: Conditional rendering - show if loading is true */}
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600">Loading user data...</p>
      </div>

      {/* Error State */}
      {/* TODO: Conditional rendering - show if error exists */}
      <div className="bg-red-50 border border-red-300 rounded-lg p-4 text-red-700">
        <p className="font-semibold">Error:</p>
        <p>{/* TODO: Display error message */}</p>
      </div>

      {/* User Data */}
      {/* TODO: Conditional rendering - show if userData exists and not loading */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {/* TODO: Display first letter of user's name */}
            U
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">
              {/* TODO: Display user name */}
              User Name
            </h3>
            <div className="space-y-1 text-gray-700">
              <p>📧 {/* TODO: Display email */}email@example.com</p>
              <p>📱 {/* TODO: Display phone */}123-456-7890</p>
              <p>🌐 {/* TODO: Display website */}website.com</p>
              <p>🏢 {/* TODO: Display company name */}Company</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
