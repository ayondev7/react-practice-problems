import React, {useState, useEffect} from 'react'

export default function AsyncPatternExample5(){
  /**
   * CHALLENGE: Advanced Async Coordination & Race Conditions
   * 
   * LEARNING GOALS:
   * - Handle race conditions properly
   * - Cancel stale requests with AbortController
   * - Implement request deduplication
   * - Queue mutations to avoid conflicts
   * - Understand common async pitfalls
   * 
   * TODO:
   * 1. Type in search box rapidly to trigger race conditions
   * 2. Use AbortController to cancel outdated requests
   * 3. Ensure search results match latest query (not older one)
   * 4. Add request deduplication for same query
   * 5. Show how race conditions cause bugs when not handled
   */

  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [requestCount, setRequestCount] = useState(0)
  const [completedCount, setCompletedCount] = useState(0)
  const [canceledCount, setCanceledCount] = useState(0)

  // Simulate API search with random delays (creates race conditions!)
  const searchAPI = async (searchQuery, signal) => {
    const delay = Math.random() * 3000 + 500 // 500ms - 3500ms
    
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(resolve, delay)
      signal.addEventListener('abort', () => {
        clearTimeout(timeout)
        reject(new Error('Request canceled'))
      })
    })

    if (signal.aborted) {
      throw new Error('Request canceled')
    }

    const allItems = [
      'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular',
      'Node.js', 'Python', 'Java', 'Rust', 'Go',
      'CSS', 'HTML', 'Tailwind', 'Bootstrap', 'Sass'
    ]

    return allItems.filter(item => 
      item.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setLoading(false)
      return
    }

    const controller = new AbortController()
    setLoading(true)
    setRequestCount(prev => prev + 1)

    searchAPI(query, controller.signal)
      .then(data => {
        setResults(data)
        setCompletedCount(prev => prev + 1)
        setLoading(false)
      })
      .catch(err => {
        if (err.message === 'Request canceled') {
          setCanceledCount(prev => prev + 1)
        }
        // Don't update UI for canceled requests
      })

    // Cleanup: cancel request if query changes
    return () => {
      controller.abort()
    }
  }, [query])

  const handleInputChange = (e) => {
    setQuery(e.target.value)
  }

  const reset = () => {
    setQuery('')
    setResults([])
    setRequestCount(0)
    setCompletedCount(0)
    setCanceledCount(0)
  }

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">Async Patterns — Race Conditions & Cancellation</h4>
      
      {/* Stats Dashboard */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{requestCount}</p>
          <p className="text-xs text-gray-600">Total Requests</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{completedCount}</p>
          <p className="text-xs text-gray-600">Completed</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-orange-600">{canceledCount}</p>
          <p className="text-xs text-gray-600">Canceled</p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative mb-6">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Type quickly to see race condition handling..."
          className="w-full px-4 py-3 pr-24 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {loading && (
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          )}
          {query && (
            <button
              onClick={reset}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="text-sm mb-2">
          <strong>🧪 Experiment:</strong>
        </p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Type "re" then quickly type "act" (race condition!)</li>
          <li>Each keystroke triggers API call with random delay (0.5-3.5s)</li>
          <li>Old requests are <strong>canceled</strong> automatically</li>
          <li>Only latest result is shown (no wrong results!)</li>
          <li>Watch the canceled count increase</li>
        </ul>
      </div>

      {/* Results */}
      {query && (
        <div>
          <h5 className="font-bold mb-3">
            {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
          </h5>
          
          {results.length === 0 && !loading && (
            <div className="text-center py-8 text-gray-400">
              <p className="text-3xl mb-2">🔍</p>
              <p>No results found</p>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {results.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-blue-400 hover:shadow-md transition text-center font-semibold"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Explanation */}
      <div className="mt-6 bg-red-50 rounded-lg p-4 border border-red-200">
        <p className="text-sm mb-2">
          <strong>⚠️ Race Condition Problem:</strong>
        </p>
        <ul className="text-sm space-y-1 list-disc list-inside mb-3">
          <li>User types "react" → 5 requests sent (r, re, rea, reac, react)</li>
          <li>Network delays are unpredictable (some slow, some fast)</li>
          <li>Result for "re" might arrive AFTER "react" result</li>
          <li><strong>Without cancellation:</strong> Wrong results shown! 🐛</li>
        </ul>
        <p className="text-sm">
          <strong>✅ Solution:</strong> AbortController cancels old requests in useEffect cleanup!
        </p>
      </div>
    </div>
  )
}
