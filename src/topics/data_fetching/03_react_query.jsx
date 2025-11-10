import React, {useState} from 'react'
// TODO: Install React Query: npm install @tanstack/react-query
// import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function DataFetching03_ReactQuery(){
  /**
   * CHALLENGE: Server State Management with React Query
   * 
   * LEARNING GOALS:
   * - Understanding server state vs client state
   * - Automatic caching and background refetching
   * - Mutations and optimistic updates
   * - Query invalidation patterns
   * - Loading and error states built-in
   * 
   * SETUP:
   * 1. npm install @tanstack/react-query
   * 2. Wrap your app with QueryClientProvider
   * 3. Create a QueryClient instance
   * 
   * TODO:
   * 1. Setup QueryClientProvider in main.jsx or App.jsx
   * 2. Use useQuery to fetch todos
   * 3. Implement useMutation for adding/deleting todos
   * 4. Use queryClient.invalidateQueries for refetch
   * 5. Explore built-in loading/error states
   * 6. Add optimistic updates
   */

  const [newTodo, setNewTodo] = useState('')

  // TODO: Implement useQuery
  // const { data: todos, isLoading, error, refetch } = useQuery({
  //   queryKey: ['todos'],
  //   queryFn: async () => {
  //     const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
  //     if (!response.ok) throw new Error('Failed to fetch')
  //     return response.json()
  //   },
  //   staleTime: 5000, // Consider data fresh for 5 seconds
  //   cacheTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  // })

  // TODO: Implement mutations
  // const queryClient = useQueryClient()
  // 
  // const addTodoMutation = useMutation({
  //   mutationFn: async (title) => {
  //     const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
  //       method: 'POST',
  //       body: JSON.stringify({ title, completed: false, userId: 1 }),
  //       headers: { 'Content-Type': 'application/json' }
  //     })
  //     return response.json()
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['todos'])
  //     setNewTodo('')
  //   }
  // })
  // 
  // const toggleTodoMutation = useMutation({
  //   mutationFn: async (todo) => {
  //     const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
  //       method: 'PATCH',
  //       body: JSON.stringify({ completed: !todo.completed }),
  //       headers: { 'Content-Type': 'application/json' }
  //     })
  //     return response.json()
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['todos'])
  //   }
  // })

  const handleAddTodo = () => {
    // TODO: Use addTodoMutation.mutate(newTodo)
  }

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">Data Fetching — React Query</h4>
      
      {/* Setup Instructions */}
      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200 mb-6">
        <p className="text-sm font-semibold mb-2">⚙️ Setup Required:</p>
        <ol className="text-sm space-y-1 list-decimal list-inside">
          <li>Run: <code className="bg-gray-200 px-2 py-1 rounded">npm install @tanstack/react-query</code></li>
          <li>Wrap App with QueryClientProvider</li>
          <li>Uncomment imports and code below</li>
        </ol>
      </div>

      {/* Query Info */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 mb-1">Status</p>
          <p className="font-semibold">{/* TODO: isLoading ? 'Loading' : 'Ready' */}Not Setup</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 mb-1">Cache Status</p>
          <p className="font-semibold">Fresh</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 mb-1">Total Todos</p>
          <p className="font-semibold">{/* TODO: todos?.length || */}0</p>
        </div>
      </div>

      {/* Add Todo Form */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddTodo}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Add Todo
        </button>
        <button
          // onClick={() => refetch()}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
        >
          🔄
        </button>
      </div>

      {/* Loading State */}
      {/* TODO: Show when isLoading */}
      <div className="flex justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading todos...</p>
        </div>
      </div>

      {/* Error State */}
      {/* TODO: Show when error */}
      <div className="bg-red-50 border border-red-300 rounded-lg p-4 mb-4">
        <p className="font-semibold text-red-700">Error:</p>
        <p className="text-red-600 text-sm">{/* error?.message */}</p>
      </div>

      {/* Todos List */}
      <div className="space-y-2">
        <p className="text-gray-400 italic text-center py-8">
          Setup React Query to see todos here!
        </p>

        {/* TODO: Map over todos
        {todos?.map(todo => (
          <div key={todo.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodoMutation.mutate(todo)}
              className="w-5 h-5"
            />
            <span className={todo.completed ? 'line-through text-gray-500' : ''}>
              {todo.title}
            </span>
          </div>
        ))}
        */}
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-purple-50 rounded-lg p-4 border border-purple-200">
        <p className="text-sm mb-2">
          <strong>🚀 React Query Superpowers:</strong>
        </p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>✅ Automatic caching & background refetching</li>
          <li>✅ Built-in loading/error states</li>
          <li>✅ Mutations with optimistic updates</li>
          <li>✅ Query invalidation & refetch control</li>
          <li>✅ DevTools for debugging</li>
          <li>✅ Automatic retry & stale-while-revalidate</li>
        </ul>
      </div>
    </div>
  )
}

// TODO: Setup in main.jsx or App.jsx:
/*
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
*/
