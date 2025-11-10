import React, {useState, useTransition} from 'react'

export default function AsyncPatternExample2(){
  /**
   * CHALLENGE: useTransition for Async Actions (React 19)
   * 
   * LEARNING GOALS:
   * - Use useTransition for non-blocking updates
   * - Show pending UI during async operations
   * - Keep UI responsive during data fetching
   * - Implement optimistic UI updates
   * - Cancel stale requests
   * 
   * TODO:
   * 1. Use useTransition hook for async state updates
   * 2. Show loading spinner only for slow requests
   * 3. Keep old content visible while loading
   * 4. Handle race conditions
   * 5. Add debouncing for search input
   */

  const [isPending, startTransition] = useTransition()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [slowMode, setSlowMode] = useState(false)

  // Simulated API search
  const searchUsers = async (searchQuery) => {
    // Simulate network delay
    await new Promise(resolve => 
      setTimeout(resolve, slowMode ? 3000 : 500)
    )

    const allUsers = [
      'Alice Johnson', 'Bob Smith', 'Charlie Brown', 
      'David Lee', 'Emma Wilson', 'Frank Miller',
      'Grace Davis', 'Henry Taylor', 'Ivy Anderson'
    ]

    return allUsers.filter(user => 
      user.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  const handleSearch = (e) => {
    const value = e.target.value
    setQuery(value)

    // TODO: Wrap the async update in startTransition
    startTransition(async () => {
      if (value.trim() === '') {
        setResults([])
        return
      }
      const data = await searchUsers(value)
      setResults(data)
    })
  }

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">Async Patterns — useTransition for Smooth UX</h4>
      
      {/* Controls */}
      <div className="flex items-center gap-4 mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={slowMode}
            onChange={(e) => setSlowMode(e.target.checked)}
            className="w-5 h-5"
          />
          <span className="font-semibold">🐌 Slow Mode (3s delay)</span>
        </label>
      </div>

      {/* Search Input */}
      <div className="relative mb-6">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search users..."
          className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
        />
        {isPending && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Results */}
      {query && (
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-3">
            <h5 className="font-bold text-lg">
              {results.length} result{results.length !== 1 ? 's' : ''} found
            </h5>
            {isPending && (
              <span className="text-sm text-blue-600 font-semibold animate-pulse">
                Searching...
              </span>
            )}
          </div>
          
          {results.length === 0 && !isPending && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-4xl mb-2">🔍</p>
              <p>No results found for "{query}"</p>
            </div>
          )}

          <div className={`space-y-2 transition-opacity ${isPending ? 'opacity-50' : 'opacity-100'}`}>
            {results.map((user, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  {user.charAt(0)}
                </div>
                <p className="font-semibold">{user}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {!query && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-5xl mb-3">👤</p>
          <p className="text-lg">Start typing to search...</p>
        </div>
      )}

      <div className="mt-6 bg-purple-50 rounded-lg p-4 border border-purple-200">
        <p className="text-sm mb-2">
          <strong>🎯 useTransition Benefits:</strong>
        </p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>UI stays responsive during async updates</li>
          <li>Old content remains visible (no blank screen)</li>
          <li>Shows subtle loading indicator (isPending)</li>
          <li>React 18+ feature for better UX</li>
          <li>Great for search, filtering, pagination</li>
        </ul>
      </div>
    </div>
  )
}
