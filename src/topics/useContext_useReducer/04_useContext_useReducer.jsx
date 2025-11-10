import React, {useReducer} from 'react'

// TODO: Define initial state
const initialState = {
  todos: [],
  filter: 'all' // 'all', 'active', 'completed'
}

// TODO: Define reducer
// function todoReducer(state, action) {
//   switch (action.type) {
//     case 'ADD_TODO':
//       return {
//         ...state,
//         todos: [...state.todos, {
//           id: Date.now(),
//           text: action.payload,
//           completed: false
//         }]
//       }
//     case 'TOGGLE_TODO':
//       return {
//         ...state,
//         todos: state.todos.map(todo =>
//           todo.id === action.payload
//             ? { ...todo, completed: !todo.completed }
//             : todo
//         )
//       }
//     case 'DELETE_TODO':
//       return {
//         ...state,
//         todos: state.todos.filter(todo => todo.id !== action.payload)
//       }
//     case 'SET_FILTER':
//       return { ...state, filter: action.payload }
//     case 'CLEAR_COMPLETED':
//       return {
//         ...state,
//         todos: state.todos.filter(todo => !todo.completed)
//       }
//     default:
//       return state
//   }
// }

export default function UseContextReducerExample4(){
  /**
   * CHALLENGE: Todo App with useReducer
   * 
   * LEARNING GOALS:
   * - useReducer for todo CRUD operations
   * - Multiple action types
   * - Filtering derived state
   * - Action creators pattern
   * - Complex state updates
   * 
   * TODO:
   * 1. Complete todoReducer with all actions
   * 2. Use useReducer hook
   * 3. Implement action dispatchers
   * 4. Filter todos based on state.filter
   * 5. Show stats (total, active, completed)
   */

  // TODO: Use useReducer
  // const [state, dispatch] = useReducer(todoReducer, initialState)
  const state = initialState // Temporary

  const [input, setInput] = React.useState('')

  // TODO: Filter todos based on state.filter
  const filteredTodos = state.todos // Apply filter logic

  const stats = {
    total: state.todos.length,
    active: state.todos.filter(t => !t.completed).length,
    completed: state.todos.filter(t => t.completed).length
  }

  const handleAdd = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    // TODO: dispatch({ type: 'ADD_TODO', payload: input })
    setInput('')
  }

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">useReducer — Todo App</h4>
      
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
          <p className="text-xs text-gray-600">Total</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-yellow-600">{stats.active}</p>
          <p className="text-xs text-gray-600">Active</p>
        </div>
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
          <p className="text-xs text-gray-600">Done</p>
        </div>
      </div>

      {/* Add Todo Form */}
      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold"
        >
          Add
        </button>
      </form>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {['all', 'active', 'completed'].map(filter => (
          <button
            key={filter}
            // TODO: onClick={() => dispatch({ type: 'SET_FILTER', payload: filter })}
            className={`px-4 py-2 rounded-lg transition ${
              state.filter === filter
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
        <button
          // TODO: onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
          className="ml-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
        >
          Clear Completed
        </button>
      </div>

      {/* Todo List */}
      <div className="space-y-2">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p className="text-4xl mb-2">📝</p>
            <p>No todos {state.filter !== 'all' ? `in "${state.filter}"` : ''}</p>
          </div>
        ) : (
          filteredTodos.map(todo => (
            <div
              key={todo.id}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                // TODO: onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
                className="w-5 h-5"
              />
              <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                {todo.text}
              </span>
              <button
                // TODO: onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
                className="text-red-500 hover:text-red-700 text-xl font-bold"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 bg-green-50 rounded-lg p-4 border border-green-200">
        <p className="text-sm">
          🎯 <strong>Pattern:</strong> useReducer is perfect for todo apps! 
          All state logic in reducer, components just dispatch actions.
        </p>
      </div>
    </div>
  )
}
