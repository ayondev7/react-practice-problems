import React, {useState, useEffect} from 'react'

export default function AsyncPatternExample1(){
  /**
   * CHALLENGE: Error Boundaries & Suspense Pattern
   * 
   * LEARNING GOALS:
   * - Error boundary concept
   * - Suspense for async data loading
   * - Fallback UI patterns
   * - Error recovery
   * - Loading states
   * 
   * TODO:
   * 1. Create error boundary (class component or use library)
   * 2. Implement suspense-like loading pattern
   * 3. Handle different error types
   * 4. Add retry functionality
   * 5. Show skeleton loading states
   */

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [shouldError, setShouldError] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      if (shouldError) {
        throw new Error('Simulated API error!')
      }
      
      setData({
        users: [
          { id: 1, name: 'John Doe', email: 'john@example.com' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
          { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
        ]
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [shouldError])

  const retry = () => {
    setShouldError(false)
    fetchData()
  }

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">Async Patterns — Error & Loading States</h4>
      
      {/* Controls */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setShouldError(!shouldError)}
          className={`px-4 py-2 rounded-lg transition ${
            shouldError ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
          }`}
        >
          {shouldError ? '❌ Error Mode ON' : '✅ Normal Mode'}
        </button>
        <button
          onClick={fetchData}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition"
        >
          🔄 Refetch
        </button>
      </div>

      {/* Loading State - Skeleton */}
      {loading && (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <span className="text-4xl">⚠️</span>
            <div className="flex-1">
              <h5 className="text-xl font-bold text-red-700 mb-2">
                Something went wrong!
              </h5>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={retry}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success State */}
      {data && !loading && !error && (
        <div className="space-y-3">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <p className="text-green-700 font-semibold">✓ Data loaded successfully!</p>
          </div>
          
          {data.users.map(user => (
            <div key={user.id} className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {user.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <p className="text-sm mb-2">
          <strong>🎯 Pattern:</strong>
        </p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Skeleton UI improves perceived performance</li>
          <li>Clear error messages with retry option</li>
          <li>Error boundaries catch component errors</li>
          <li>Suspense (React 18+) simplifies async rendering</li>
        </ul>
      </div>
    </div>
  )
}
