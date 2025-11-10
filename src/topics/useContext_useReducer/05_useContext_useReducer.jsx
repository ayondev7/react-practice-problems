import React, {useContext, useReducer, createContext} from 'react'

// TODO: Create AppContext
// const AppContext = createContext()

// TODO: Define initial state
// const initialState = {
//   user: null,
//   theme: 'light',
//   cart: [],
//   notifications: []
// }

// TODO: Create app reducer
// function appReducer(state, action) {
//   switch (action.type) {
//     case 'LOGIN':
//       return { ...state, user: action.payload }
//     case 'LOGOUT':
//       return { ...state, user: null, cart: [] }
//     case 'TOGGLE_THEME':
//       return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' }
//     case 'ADD_TO_CART':
//       return { ...state, cart: [...state.cart, action.payload] }
//     case 'ADD_NOTIFICATION':
//       return { ...state, notifications: [...state.notifications, action.payload] }
//     default:
//       return state
//   }
// }

// TODO: Create Provider
// export function AppProvider({ children }) {
//   const [state, dispatch] = useReducer(appReducer, initialState)
//   return (
//     <AppContext.Provider value={{ state, dispatch }}>
//       {children}
//     </AppContext.Provider>
//   )
// }

// TODO: Custom hook
// export function useApp() {
//   const context = useContext(AppContext)
//   if (!context) throw new Error('useApp must be used within AppProvider')
//   return context
// }

export default function UseContextReducerExample5(){
  /**
   * CHALLENGE: Combined Context + Reducer Pattern
   * 
   * LEARNING GOALS:
   * - Combining Context API with useReducer
   * - Global state management pattern
   * - Multiple pieces of state in one context
   * - Production-ready state management
   * - Alternative to Redux for smaller apps
   * 
   * TODO:
   * 1. Create AppContext with createContext()
   * 2. Define appReducer with multiple action types
   * 3. Create AppProvider using useReducer
   * 4. Create useApp custom hook
   * 5. Wrap component with Provider
   * 6. Dispatch actions from UI
   */

  // TODO: Use custom hook
  // const { state, dispatch } = useApp()

  const [username, setUsername] = React.useState('')
  const state = {
    user: null,
    theme: 'light',
    cart: [],
    notifications: []
  } // Temporary

  const handleLogin = () => {
    if (!username.trim()) return
    // TODO: dispatch({ type: 'LOGIN', payload: { username, id: Date.now() } })
    setUsername('')
  }

  const addToCart = () => {
    // TODO: dispatch({ type: 'ADD_TO_CART', payload: { id: Date.now(), name: 'Product' } })
    // TODO: dispatch({ type: 'ADD_NOTIFICATION', payload: { id: Date.now(), text: 'Item added to cart!' } })
  }

  return (
    <div className={`card ${state.theme === 'dark' ? 'bg-gray-800 text-white' : ''}`}>
      <h4 className="text-xl font-bold mb-4">Context + Reducer — Global App State</h4>
      
      {/* Header - Shows all global state */}
      <div className={`rounded-lg p-4 mb-6 ${state.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <div className="flex justify-between items-center mb-4">
          <div>
            {state.user ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {state.user.username?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold">{state.user.username}</p>
                  <button
                    // TODO: onClick={() => dispatch({ type: 'LOGOUT' })}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Not logged in</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              // TODO: onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
            >
              {state.theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <div className="relative">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                🛒 Cart ({state.cart.length})
              </button>
            </div>
            <div className="relative">
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg">
                🔔 ({state.notifications.length})
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Login Section */}
        {!state.user && (
          <div className={`rounded-lg p-4 ${state.theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'}`}>
            <h5 className="font-semibold mb-3">Login</h5>
            <div className="flex gap-2">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="flex-1 px-3 py-2 border rounded-lg"
              />
              <button
                onClick={handleLogin}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Login
              </button>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className={`rounded-lg p-4 ${state.theme === 'dark' ? 'bg-gray-700' : 'bg-green-50'}`}>
          <h5 className="font-semibold mb-3">Actions</h5>
          <button
            onClick={addToCart}
            disabled={!state.user}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 transition"
          >
            Add Item to Cart
          </button>
          <p className="text-xs mt-2 text-gray-500">
            {!state.user && 'Login to add items'}
          </p>
        </div>
      </div>

      {/* Cart Items */}
      {state.cart.length > 0 && (
        <div className={`mt-6 rounded-lg p-4 ${state.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h5 className="font-semibold mb-3">Cart Items</h5>
          <div className="space-y-2">
            {state.cart.map(item => (
              <div key={item.id} className={`p-2 rounded ${state.theme === 'dark' ? 'bg-gray-600' : 'bg-white'}`}>
                {item.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notifications */}
      {state.notifications.length > 0 && (
        <div className={`mt-6 rounded-lg p-4 ${state.theme === 'dark' ? 'bg-gray-700' : 'bg-yellow-50'}`}>
          <h5 className="font-semibold mb-3">Notifications</h5>
          <div className="space-y-2">
            {state.notifications.slice(-3).map(notif => (
              <div key={notif.id} className={`p-2 rounded text-sm ${state.theme === 'dark' ? 'bg-gray-600' : 'bg-white'}`}>
                ℹ️ {notif.text}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 bg-purple-50 dark:bg-purple-900 rounded-lg p-4 border border-purple-200">
        <p className="text-sm">
          🎯 <strong>Production Pattern:</strong> Context + useReducer is perfect for
          app-wide state! Alternative to Redux for smaller/medium apps.
        </p>
      </div>
    </div>
  )
}

// TODO: Wrap in parent component or App.jsx:
// <AppProvider>
//   <UseContextReducerExample5 />
// </AppProvider>
