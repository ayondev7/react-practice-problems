import React, {useEffect, useState} from 'react'

export default function UseEffectExample3(){
  /**
   * CHALLENGE: Search with Debouncing
   * 
   * LEARNING GOALS:
   * - Debouncing user input to optimize API calls
   * - Multiple useEffect hooks for different concerns
   * - Cleanup with setTimeout
   * - Preventing unnecessary re-renders
   * 
   * TODO:
   * 1. State for: searchTerm, debouncedTerm, results, loading
   * 2. First useEffect: debounce searchTerm (wait 500ms after user stops typing)
   * 3. Second useEffect: fetch when debouncedTerm changes
   * 4. Use https://jsonplaceholder.typicode.com/posts?q=${debouncedTerm}
   * 5. Clear debounce timeout in cleanup
   */

  // TODO: Add your state
  // const [searchTerm, setSearchTerm] = useState('')
  // const [debouncedTerm, setDebouncedTerm] = useState('')
  // const [results, setResults] = useState([])
  // const [loading, setLoading] = useState(false)

  // TODO: First useEffect - Debouncing
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setDebouncedTerm(searchTerm)
  //   }, 500) // Wait 500ms after user stops typing
  //
  //   return () => clearTimeout(timer) // Cleanup
  // }, [searchTerm])

  // TODO: Second useEffect - Fetch when debounced term changes
  // useEffect(() => {
  //   if (!debouncedTerm) {
  //     setResults([])
  //     return
  //   }
  //
  //   const fetchResults = async () => {
  //     setLoading(true)
  //     try {
  //       const response = await fetch(
  //         `https://jsonplaceholder.typicode.com/posts?q=${debouncedTerm}`
  //       )
  //       const data = await response.json()
  //       setResults(data)
  //     } catch (error) {
  //       console.error('Fetch error:', error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   fetchResults()
  // }, [debouncedTerm])

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">useEffect — Search with Debouncing</h4>
      
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search posts... (try 'qui', 'est', 'sed')"
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            // TODO: Add value and onChange
          />
          <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {/* TODO: Show loading indicator when loading is true */}
          <div className="absolute right-4 top-3.5">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          ⚡ Debounced: waits 500ms after you stop typing before searching
        </p>
      </div>

      {/* Results */}
      <div className="space-y-3">
        {/* TODO: Conditional rendering based on results */}
        {/* Show "Start typing to search..." if searchTerm is empty */}
        {/* Show "No results found" if results.length === 0 and debouncedTerm exists */}
        {/* Map over results to display */}
        
        <p className="text-gray-400 italic">Start typing to search...</p>

        {/* Example result card structure:
        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
          <h5 className="font-semibold mb-2">{result.title}</h5>
          <p className="text-sm text-gray-600">{result.body}</p>
        </div>
        */}
      </div>
    </div>
  )
}
