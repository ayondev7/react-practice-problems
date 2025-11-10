import React, {useState} from 'react'

export default function AsyncPatternExample3(){
  /**
   * CHALLENGE: Parallel Requests & Request Coordination
   * 
   * LEARNING GOALS:
   * - Fetch multiple resources in parallel with Promise.all
   * - Handle individual request failures
   * - Show progress for multiple requests
   * - Coordinate dependent requests
   * - Implement retry logic per request
   * 
   * TODO:
   * 1. Fetch user, posts, and todos simultaneously
   * 2. Use Promise.all() for parallel requests
   * 3. Use Promise.allSettled() to handle individual failures
   * 4. Show progress indicators for each resource
   * 5. Allow retrying failed requests individually
   */

  const [loading, setLoading] = useState({
    user: false,
    posts: false,
    todos: false
  })
  
  const [data, setData] = useState({
    user: null,
    posts: null,
    todos: null
  })

  const [errors, setErrors] = useState({
    user: null,
    posts: null,
    todos: null
  })

  // Simulate API calls with random failures
  const fetchUser = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    if (Math.random() > 0.7) throw new Error('User fetch failed')
    return { id: 1, name: 'John Doe', email: 'john@example.com' }
  }

  const fetchPosts = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500))
    if (Math.random() > 0.7) throw new Error('Posts fetch failed')
    return [
      { id: 1, title: 'First Post', body: 'This is my first post!' },
      { id: 2, title: 'Second Post', body: 'Another great post' },
    ]
  }

  const fetchTodos = async () => {
    await new Promise(resolve => setTimeout(resolve, 800))
    if (Math.random() > 0.7) throw new Error('Todos fetch failed')
    return [
      { id: 1, title: 'Buy groceries', completed: false },
      { id: 2, title: 'Finish project', completed: true },
    ]
  }

  // Fetch all in parallel using Promise.allSettled
  const fetchAllData = async () => {
    setLoading({ user: true, posts: true, todos: true })
    setErrors({ user: null, posts: null, todos: null })

    const results = await Promise.allSettled([
      fetchUser(),
      fetchPosts(),
      fetchTodos()
    ])

    // Handle results
    const [userResult, postsResult, todosResult] = results

    setData({
      user: userResult.status === 'fulfilled' ? userResult.value : null,
      posts: postsResult.status === 'fulfilled' ? postsResult.value : null,
      todos: todosResult.status === 'fulfilled' ? todosResult.value : null
    })

    setErrors({
      user: userResult.status === 'rejected' ? userResult.reason.message : null,
      posts: postsResult.status === 'rejected' ? postsResult.reason.message : null,
      todos: todosResult.status === 'rejected' ? todosResult.reason.message : null
    })

    setLoading({ user: false, posts: false, todos: false })
  }

  // Retry individual resource
  const retryResource = async (resource) => {
    setLoading(prev => ({ ...prev, [resource]: true }))
    setErrors(prev => ({ ...prev, [resource]: null }))

    try {
      let result
      if (resource === 'user') result = await fetchUser()
      if (resource === 'posts') result = await fetchPosts()
      if (resource === 'todos') result = await fetchTodos()
      
      setData(prev => ({ ...prev, [resource]: result }))
    } catch (err) {
      setErrors(prev => ({ ...prev, [resource]: err.message }))
    } finally {
      setLoading(prev => ({ ...prev, [resource]: false }))
    }
  }

  const ResourceCard = ({ title, resource, icon }) => (
    <div className="border-2 border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h5 className="font-bold text-lg flex items-center gap-2">
          <span>{icon}</span>
          {title}
        </h5>
        {loading[resource] && (
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        )}
      </div>

      {errors[resource] && (
        <div className="bg-red-50 border border-red-200 rounded p-3 mb-3">
          <p className="text-red-600 text-sm mb-2">❌ {errors[resource]}</p>
          <button
            onClick={() => retryResource(resource)}
            disabled={loading[resource]}
            className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
          >
            Retry
          </button>
        </div>
      )}

      {data[resource] && !loading[resource] && (
        <div className="bg-green-50 border border-green-200 rounded p-3">
          <pre className="text-xs overflow-auto">{JSON.stringify(data[resource], null, 2)}</pre>
        </div>
      )}

      {!data[resource] && !loading[resource] && !errors[resource] && (
        <p className="text-gray-400 text-sm">No data loaded yet</p>
      )}
    </div>
  )

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">Async Patterns — Parallel Requests</h4>
      
      <button
        onClick={fetchAllData}
        disabled={Object.values(loading).some(Boolean)}
        className="w-full mb-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition font-semibold text-lg"
      >
        🚀 Fetch All Data (Parallel)
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <ResourceCard title="User" resource="user" icon="👤" />
        <ResourceCard title="Posts" resource="posts" icon="📝" />
        <ResourceCard title="Todos" resource="todos" icon="✅" />
      </div>

      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <p className="text-sm mb-2">
          <strong>🎯 Parallel Patterns:</strong>
        </p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li><code className="bg-white px-1 rounded">Promise.all()</code> - All or nothing (fails if any fails)</li>
          <li><code className="bg-white px-1 rounded">Promise.allSettled()</code> - Get all results (used here)</li>
          <li><code className="bg-white px-1 rounded">Promise.race()</code> - First completed wins</li>
          <li>Individual retry logic for failed requests</li>
          <li>30% chance of random failure to test error handling</li>
        </ul>
      </div>
    </div>
  )
}
