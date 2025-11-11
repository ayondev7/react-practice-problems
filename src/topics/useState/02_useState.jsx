import React, {useState} from 'react'

export default function UseStateExample2(){

  // TODO: Add your state here
  const [todoInput, setTodoInput]=useState('');
  const [todos, setTodos]=useState([]);

 
  const addTodo = () => {
   if(!todoInput.trim()){
    return;
   }

   const newTodo = {
    id:Date.now(),
    text:todoInput,
    completed:false
   }

   setTodos(prevTodos=>[newTodo,...prevTodos]);

   setTodoInput('');
  }

  // TODO: Implement toggleTodo function
  const toggleTodo = (id) => {
   setTodos(prevTodos=>prevTodos.map(todo=>todo.id===id ? {...todo,completed:!todo.completed} : todo))
  }

  // TODO: Implement deleteTodo function
  const deleteTodo = (id) => {
    setTodos(prevTodos=>prevTodos.filter(todo=>todo.id!=id))
  }

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">useState — Todo List (Array State)</h4>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter a todo..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={todoInput}
          onChange={(e)=>setTodoInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') addTodo(); }}
        />
        <button 
          onClick={addTodo}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
       {todos.length===0 ? (<p className="text-gray-400 italic">Your todos will appear here...</p>)
        : (
          todos.map(todo=>(
            <div className='flex justify-between'>
              <div>
                <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
                <span className={todo.completed? 'line-through' : ''}>{todo.text}</span>
              </div>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
