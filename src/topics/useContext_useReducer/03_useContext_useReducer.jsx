import React, {useReducer} from 'react'

// TODO: Define initial state
// const initialState = {
//   items: [],
//   total: 0
// }

// TODO: Define reducer function
// function cartReducer(state, action) {
//   switch (action.type) {
//     case 'ADD_ITEM':
//       const existingIndex = state.items.findIndex(item => item.id === action.payload.id)
//       if (existingIndex > -1) {
//         const newItems = [...state.items]
//         newItems[existingIndex].quantity += 1
//         return {
//           items: newItems,
//           total: state.total + action.payload.price
//         }
//       }
//       return {
//         items: [...state.items, { ...action.payload, quantity: 1 }],
//         total: state.total + action.payload.price
//       }
//     
//     case 'REMOVE_ITEM':
//       return {
//         items: state.items.filter(item => item.id !== action.payload),
//         total: state.total - state.items.find(item => item.id === action.payload).price * state.items.find(item => item.id === action.payload).quantity
//       }
//     
//     case 'UPDATE_QUANTITY':
//       // Handle increase/decrease
//       return state
//     
//     case 'CLEAR_CART':
//       return initialState
//     
//     default:
//       return state
//   }
// }

export default function UseContextReducerExample3(){
  /**
   * CHALLENGE: Shopping Cart with useReducer
   * 
   * LEARNING GOALS:
   * - Managing complex state with useReducer
   * - Action types and action creators
   * - Reducer pattern for predictable updates
   * - When to use reducer vs useState
   * - Immutable updates in reducers
   * 
   * TODO:
   * 1. Define initialState shape
   * 2. Create cartReducer with switch statement
   * 3. Handle ADD_ITEM, REMOVE_ITEM, UPDATE_QUANTITY, CLEAR_CART
   * 4. Use useReducer hook
   * 5. Dispatch actions from UI
   */

  // TODO: Use useReducer
  // const [state, dispatch] = useReducer(cartReducer, initialState)

  const state = { items: [], total: 0 } // Temporary

  const products = [
    { id: 1, name: 'Laptop', price: 999, image: '💻' },
    { id: 2, name: 'Mouse', price: 29, image: '🖱️' },
    { id: 3, name: 'Keyboard', price: 79, image: '⌨️' },
    { id: 4, name: 'Monitor', price: 299, image: '🖥️' },
    { id: 5, name: 'Headphones', price: 149, image: '🎧' },
  ]

  // TODO: Implement action dispatchers
  const addToCart = (product) => {
    // dispatch({ type: 'ADD_ITEM', payload: product })
  }

  const removeFromCart = (id) => {
    // dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  const clearCart = () => {
    // dispatch({ type: 'CLEAR_CART' })
  }

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">useReducer — Shopping Cart</h4>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Products */}
        <div>
          <h5 className="font-semibold mb-4">Products</h5>
          <div className="space-y-3">
            {products.map(product => (
              <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{product.image}</span>
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-green-600 font-bold">${product.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cart */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h5 className="font-semibold">Shopping Cart ({state.items.length})</h5>
            <button
              onClick={clearCart}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
            >
              Clear Cart
            </button>
          </div>

          {state.items.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-4xl mb-2">🛒</p>
              <p className="text-gray-500">Cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-3 mb-4">
                {/* TODO: Map over state.items */}
                {state.items.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.image}</span>
                      <div>
                        <p className="font-semibold text-sm">{item.name}</p>
                        <p className="text-xs text-gray-600">
                          ${item.price} × {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-green-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 text-xl"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t-2 border-gray-300 pt-4">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-green-600">${state.total.toFixed(2)}</span>
                </div>
                <button className="w-full mt-4 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-semibold">
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-6 bg-purple-50 rounded-lg p-4 border border-purple-200">
        <p className="text-sm">
          🎯 <strong>Why useReducer?</strong> Complex state logic with multiple
          actions is cleaner with reducer pattern. All updates in one place!
        </p>
      </div>
    </div>
  )
}
