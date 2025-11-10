import React from 'react'
import { create } from 'zustand'

/**
 * CHALLENGE: Todo App with Zustand
 * 
 * LEARNING GOALS:
 * - Manage complex state (arrays, filters)
 * - Multiple actions in one store
 * - Derived state with selectors
 * - Computed values
 * - State updates with Immer-style syntax
 * 
 * TODO:
 * 1. Create todo store with add/toggle/delete actions
 * 2. Add filter state (all/active/completed)
 * 3. Compute filtered todos
 * 4. Build UI with separate components
 * 5. See how Zustand handles array updates
 */

// Todo Zustand Store
const useTodoStore = create((set, get) => ({
  // State
  todos: [
    { id: 1, text: 'Learn Zustand', completed: false },
    { id: 2, text: 'Build something cool', completed: false },
  ],
  filter: 'all', // 'all' | 'active' | 'completed'
  
  // Actions
  addTodo: (text) => set((state) => ({
    todos: [
      ...state.todos,
      { id: Date.now(), text, completed: false }
    ]
  })),
  
  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  })),
  
  deleteTodo: (id) => set((state) => ({
    todos: state.todos.filter(todo => todo.id !== id)
  })),
  
  setFilter: (filter) => set({ filter }),
  
  clearCompleted: () => set((state) => ({
    todos: state.todos.filter(todo => !todo.completed)
  })),
  
  // Computed/derived state (using get())
  getFilteredTodos: () => {
    const { todos, filter } = get()
    if (filter === 'active') return todos.filter(t => !t.completed)
    if (filter === 'completed') return todos.filter(t => t.completed)
    return todos
  },
  
  getStats: () => {
    const todos = get().todos
    return {
      total: todos.length,
      active: todos.filter(t => !t.completed).length,
      completed: todos.filter(t => t.completed).length,
    }
  }
}))

// Component 1: Add Todo Form
function AddTodoForm() {
  const [input, setInput] = React.useState('')
  const addTodo = useTodoStore(state => state.addTodo)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      addTodo(input.trim())
      setInput('')
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold"
      >
        Add
      </button>
    </form>
  )
}

// Component 2: Filter Buttons
function FilterButtons() {
  const { filter, setFilter } = useTodoStore(state => ({
    filter: state.filter,
    setFilter: state.setFilter
  }))
  
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
  ]
  
  return (
    <div className="flex gap-2">
      {filters.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setFilter(key)}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            filter === key
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

// Component 3: Stats Display
function TodoStats() {
  const getStats = useTodoStore(state => state.getStats)
  const stats = getStats()
  
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
        <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
        <p className="text-xs text-gray-600">Total</p>
      </div>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
        <p className="text-2xl font-bold text-yellow-600">{stats.active}</p>
        <p className="text-xs text-gray-600">Active</p>
      </div>
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
        <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
        <p className="text-xs text-gray-600">Completed</p>
      </div>
    </div>
  )
}

// Component 4: Todo List
function TodoList() {
  const { getFilteredTodos, toggleTodo, deleteTodo, clearCompleted } = useTodoStore(
    state => ({
      getFilteredTodos: state.getFilteredTodos,
      toggleTodo: state.toggleTodo,
      deleteTodo: state.deleteTodo,
      clearCompleted: state.clearCompleted,
    })
  )
  
  const todos = getFilteredTodos()
  
  return (
    <div>
      <div className="space-y-2 mb-4">
        {todos.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p className="text-4xl mb-2">📝</p>
            <p>No todos to show</p>
          </div>
        ) : (
          todos.map(todo => (
            <div
              key={todo.id}
              className="flex items-center gap-3 p-3 bg-white border border-gray-300 rounded-lg hover:shadow-md transition"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-5 h-5 cursor-pointer"
              />
              <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
      
      {getFilteredTodos().some(t => t.completed) && (
        <button
          onClick={clearCompleted}
          className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Clear Completed
        </button>
      )}
    </div>
  )
}

export default function ZustandExample2(){
  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">Zustand — Todo App</h4>
      
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
        <p className="text-sm mb-2">
          <strong>🎯 Features:</strong>
        </p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Add, toggle, delete todos</li>
          <li>Filter: all / active / completed</li>
          <li>Computed stats with <code className="bg-white px-1 rounded">get()</code></li>
          <li>Clear completed todos</li>
          <li>State shared across 4 components (no prop drilling!)</li>
        </ul>
      </div>

      <div className="space-y-6">
        <AddTodoForm />
        <div className="flex items-center justify-between">
          <FilterButtons />
        </div>
        <TodoStats />
        <TodoList />
      </div>

      <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <p className="text-sm mb-2">
          <strong>🔧 Advanced Pattern:</strong>
        </p>
        <pre className="text-xs bg-white p-3 rounded overflow-auto">
{`const useStore = create((set, get) => ({
  todos: [],
  
  // Access state with get()
  getFilteredTodos: () => {
    const { todos, filter } = get()
    return todos.filter(...)
  },
  
  // Update state with set()
  addTodo: (text) => set((state) => ({
    todos: [...state.todos, newTodo]
  }))
}))`}
        </pre>
      </div>
    </div>
  )
}
