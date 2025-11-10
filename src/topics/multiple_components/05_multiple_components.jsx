import React, {useState, useEffect} from 'react'

/**
 * CHALLENGE: Custom Hooks for Component Logic Reuse
 * 
 * LEARNING GOALS:
 * - Extract reusable logic into custom hooks
 * - Share stateful logic between components
 * - Cleaner alternative to HOCs and render props
 * - Compose multiple hooks easily
 * - Follow hooks naming convention (use*)
 * 
 * TODO:
 * 1. Create custom hooks for common patterns
 * 2. Use hooks in multiple components
 * 3. Compose hooks together
 * 4. Compare with HOC/render props approaches
 * 5. Build a mini hook library
 */

// Custom Hook 1: useLocalStorage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

// Custom Hook 2: useToggle
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)
  
  const toggle = () => setValue(v => !v)
  const setTrue = () => setValue(true)
  const setFalse = () => setValue(false)
  
  return [value, { toggle, setTrue, setFalse }]
}

// Custom Hook 3: useFetch
function useFetch(url, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockData = {
        '/api/user': { name: 'Alice', id: 1 },
        '/api/posts': [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }]
      }
      
      setData(mockData[url] || { message: 'Data loaded' })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (options.immediate !== false) {
      fetchData()
    }
  }, [url])

  return { data, loading, error, refetch: fetchData }
}

// Custom Hook 4: useDebounce
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

// Component 1: Using useLocalStorage + useToggle
function SettingsPanel() {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false)
  const [notifications, { toggle }] = useToggle(true)

  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white">
      <h5 className="font-bold mb-3">Settings Panel</h5>
      <div className="space-y-3">
        <label className="flex items-center justify-between cursor-pointer">
          <span>Dark Mode (persisted)</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
            className="w-5 h-5"
          />
        </label>
        <label className="flex items-center justify-between cursor-pointer">
          <span>Notifications</span>
          <input
            type="checkbox"
            checked={notifications}
            onChange={toggle}
            className="w-5 h-5"
          />
        </label>
      </div>
      <p className="text-xs text-gray-500 mt-3">
        🔄 Dark mode persists across page reloads!
      </p>
    </div>
  )
}

// Component 2: Using useFetch
function DataDisplay() {
  const { data, loading, error, refetch } = useFetch('/api/user')

  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between mb-3">
        <h5 className="font-bold">User Data</h5>
        <button
          onClick={refetch}
          disabled={loading}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 text-sm"
        >
          Refresh
        </button>
      </div>
      
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {data && (
        <div className="bg-green-50 border border-green-200 rounded p-3">
          <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

// Component 3: Using useDebounce
function SearchBox() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 800)
  const [searchCount, setSearchCount] = useState(0)

  useEffect(() => {
    if (debouncedQuery) {
      setSearchCount(prev => prev + 1)
    }
  }, [debouncedQuery])

  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white">
      <h5 className="font-bold mb-3">Search with Debounce</h5>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type to search..."
        className="w-full px-3 py-2 border border-gray-300 rounded mb-3"
      />
      <div className="text-sm space-y-1">
        <p><strong>Current:</strong> {query || '(empty)'}</p>
        <p><strong>Debounced:</strong> {debouncedQuery || '(empty)'}</p>
        <p><strong>API Calls:</strong> {searchCount}</p>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        ⏱️ Search triggers 800ms after you stop typing
      </p>
    </div>
  )
}

export default function MultipleComponents5(){
  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">Component Patterns — Custom Hooks (Best Practice)</h4>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <p className="text-sm mb-2">
          <strong>✨ Custom Hooks Benefits:</strong>
        </p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Extract and reuse stateful logic easily</li>
          <li>Cleaner than HOCs and render props</li>
          <li>Compose multiple hooks naturally</li>
          <li>Name starts with "use" (convention)</li>
          <li>Modern React best practice for code reuse</li>
        </ul>
      </div>

      {/* Examples */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <SettingsPanel />
        <DataDisplay />
      </div>
      
      <div className="mb-6">
        <SearchBox />
      </div>

      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-4">
        <p className="text-sm mb-2">
          <strong>🔧 Custom Hooks in This Example:</strong>
        </p>
        <div className="text-sm space-y-2">
          <div>
            <code className="bg-white px-2 py-1 rounded">useLocalStorage</code>
            <span className="text-gray-600"> — Syncs state with localStorage</span>
          </div>
          <div>
            <code className="bg-white px-2 py-1 rounded">useToggle</code>
            <span className="text-gray-600"> — Boolean state with toggle/set helpers</span>
          </div>
          <div>
            <code className="bg-white px-2 py-1 rounded">useFetch</code>
            <span className="text-gray-600"> — Data fetching with loading/error states</span>
          </div>
          <div>
            <code className="bg-white px-2 py-1 rounded">useDebounce</code>
            <span className="text-gray-600"> — Delays value updates (great for search)</span>
          </div>
        </div>
      </div>

      <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
        <p className="text-sm mb-2">
          <strong>📊 Pattern Comparison Summary:</strong>
        </p>
        <div className="overflow-x-auto">
          <table className="text-xs w-full">
            <thead>
              <tr className="border-b border-purple-200">
                <th className="text-left p-2">Pattern</th>
                <th className="text-left p-2">Use Case</th>
                <th className="text-left p-2">Pros</th>
                <th className="text-left p-2">Cons</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-purple-100">
                <td className="p-2 font-semibold">Custom Hooks</td>
                <td className="p-2">Logic reuse</td>
                <td className="p-2">Clean, composable, modern</td>
                <td className="p-2">Must follow hooks rules</td>
              </tr>
              <tr className="border-b border-purple-100">
                <td className="p-2 font-semibold">HOCs</td>
                <td className="p-2">Enhance existing components</td>
                <td className="p-2">Works with class components</td>
                <td className="p-2">Wrapper hell, prop collisions</td>
              </tr>
              <tr className="border-b border-purple-100">
                <td className="p-2 font-semibold">Render Props</td>
                <td className="p-2">Dynamic rendering control</td>
                <td className="p-2">Flexible rendering</td>
                <td className="p-2">Nesting hell, verbose</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Compound Components</td>
                <td className="p-2">Flexible UI components</td>
                <td className="p-2">Great DX, clear API</td>
                <td className="p-2">More complex setup</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-600 mt-2">
          💡 <strong>Recommendation:</strong> Use custom hooks for most logic reuse. Use compound components for flexible UI patterns.
        </p>
      </div>
    </div>
  )
}
