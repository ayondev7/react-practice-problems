import React, {useState, useEffect} from 'react'

export default function DataFetching01_Fetch(){
  /**
   * CHALLENGE: Data Fetching with Native Fetch API
   * 
   * LEARNING GOALS:
   * - Using browser's native fetch() API
   * - Handling loading, data, and error states
   * - Async/await patterns in useEffect
   * - Cleaning up with AbortController
   * - Response parsing and error handling
   * 
   * TODO:
   * 1. State for: users, loading, error
   * 2. Implement fetchUsers() using fetch()
   * 3. Handle loading state before fetch
   * 4. Parse JSON response
   * 5. Handle HTTP errors (response.ok check)
   * 6. Implement AbortController for cleanup
   * 7. Add refetch functionality
   */

  // TODO: Add your state
  // const [users, setUsers] = useState([])
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState(null)

  // TODO: Implement fetch with AbortController
  // useEffect(() => {
  //   const abortController = new AbortController()
  //   
  //   const fetchUsers = async () => {
  //     try {
  //       setLoading(true)
  //       setError(null)
  //       
  //       const response = await fetch(
  //         'https://jsonplaceholder.typicode.com/users',
  //         { signal: abortController.signal }
  //       )
  //       
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`)
  //       }
  //       
  //       const data = await response.json()
  //       setUsers(data)
  //     } catch (err) {
  //       if (err.name !== 'AbortError') {
  //         setError(err.message)
  //       }
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   
  //   fetchUsers()
  //   
  //   return () => abortController.abort()
  // }, [])

  // TODO: Implement refetch function
  const refetch = () => {
    // Trigger fetch again
  }

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">Data Fetching — Native Fetch API</h4>
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm text-gray-600">
            Endpoint: <code className="bg-gray-100 px-2 py-1 rounded text-xs">
              /users
            </code>
          </p>
        </div>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          🔄 Refetch
        </button>
      </div>

      {/* Loading State */}
      {/* TODO: Show loading spinner when loading is true */}
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Fetching users...</p>
        </div>
      </div>

      {/* Error State */}
      {/* TODO: Show error message when error exists */}
      <div className="bg-red-50 border border-red-300 rounded-lg p-4 mb-4">
        <div className="flex items-start">
          <span className="text-red-500 text-xl mr-3">⚠️</span>
          <div>
            <p className="font-semibold text-red-700">Error occurred:</p>
            <p className="text-red-600 text-sm mt-1">{/* TODO: Display error */}Error message</p>
          </div>
        </div>
      </div>

      {/* Users List */}
      {/* TODO: Show users when data is loaded and not loading */}
      <div className="space-y-3">
        {/* TODO: Map over users array */}
        <p className="text-gray-400 italic text-center py-8">
          No users loaded yet...
        </p>

        {/* Example user card structure:
        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h5 className="font-semibold text-lg">{user.name}</h5>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500">{user.company.name}</p>
            </div>
          </div>
        </div>
        */}
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <p className="text-sm mb-2">
          <strong>🎯 Key Concepts:</strong>
        </p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Native fetch() API - no dependencies needed</li>
          <li>AbortController for proper cleanup</li>
          <li>Check response.ok for HTTP errors</li>
          <li>Handle loading, data, and error states</li>
          <li>Parse JSON with response.json()</li>
        </ul>
      </div>
    </div>
  )
}
