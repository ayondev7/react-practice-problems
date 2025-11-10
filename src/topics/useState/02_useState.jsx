import React, {useState} from 'react'

export default function UseStateExample2(){
  /**
   * CHALLENGE: Todo List with Array State Management
   * 
   * LEARNING GOALS:
   * - Managing arrays in state
   * - Adding items to state arrays (immutably)
   * - Removing items from arrays
   * - Handling form inputs with controlled components
   * 
   * TODO:
   * 1. Create state for: todoInput (string) and todos (array of objects)
   * 2. Each todo should have: { id, text, completed }
   * 3. Implement addTodo() - add new todo, clear input, use Date.now() for id
   * 4. Implement toggleTodo(id) - toggle completed status
   * 5. Implement deleteTodo(id) - remove todo from array
   * 6. Make input controlled (value & onChange)
   */

  // TODO: Add your state here
  // const [todoInput, setTodoInput] = useState(...)
  // const [todos, setTodos] = useState(...)

  // TODO: Implement addTodo function
  const addTodo = () => {
    // Add todo to array (remember: immutability!)
    // Clear input after adding
  }

  // TODO: Implement toggleTodo function
  const toggleTodo = (id) => {
    // Toggle the completed status of todo with matching id
  }

  // TODO: Implement deleteTodo function
  const deleteTodo = (id) => {
    // Remove todo with matching id from array
  }

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">useState — Todo List (Array State)</h4>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter a todo..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          // TODO: Add value and onChange props
        />
        <button 
          onClick={addTodo}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {/* TODO: Map over todos array and render each todo */}
        {/* Each todo should have:
            - Checkbox to toggle completed
            - Text with line-through if completed
            - Delete button
        */}
        <p className="text-gray-400 italic">Your todos will appear here...</p>
      </div>
    </div>
  )
}
