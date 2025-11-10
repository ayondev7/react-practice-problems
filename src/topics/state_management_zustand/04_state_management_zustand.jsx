import React from 'react'
import { create } from 'zustand'

/**
 * CHALLENGE: Multiple Zustand Stores (Store Composition)
 * 
 * LEARNING GOALS:
 * - Create multiple independent stores
 * - Separate concerns by domain
 * - Store composition patterns
 * - When to split vs combine stores
 * - Cross-store communication
 * 
 * TODO:
 * 1. Create separate stores for different domains
 * 2. Use multiple stores in same component
 * 3. Understand store independence
 * 4. Implement cross-store updates
 * 5. Compare with monolithic store approach
 */

// Store 1: User Store
const useUserStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: (username) => set({
    user: { username, loginTime: new Date().toLocaleTimeString() },
    isAuthenticated: true,
  }),
  
  logout: () => set({
    user: null,
    isAuthenticated: false,
  }),
}))

// Store 2: Cart Store
const useCartStore = create((set, get) => ({
  items: [],
  
  addItem: (product) => set((state) => {
    const existing = state.items.find(item => item.id === product.id)
    if (existing) {
      return {
        items: state.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
    }
    return {
      items: [...state.items, { ...product, quantity: 1 }]
    }
  }),
  
  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),
  
  clearCart: () => set({ items: [] }),
  
  getTotal: () => {
    return get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  },
  
  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0)
  },
}))

// Store 3: Notification Store
const useNotificationStore = create((set) => ({
  notifications: [],
  
  addNotification: (message, type = 'info') => set((state) => ({
    notifications: [
      ...state.notifications,
      { id: Date.now(), message, type, timestamp: Date.now() }
    ]
  })),
  
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),
  
  clearAll: () => set({ notifications: [] }),
}))

// Mock Products
const products = [
  { id: 1, name: 'Laptop', price: 999 },
  { id: 2, name: 'Mouse', price: 29 },
  { id: 3, name: 'Keyboard', price: 79 },
]

// Component 1: User Panel
function UserPanel() {
  const { user, isAuthenticated, login, logout } = useUserStore()
  const addNotification = useNotificationStore(state => state.addNotification)
  const [username, setUsername] = React.useState('')
  
  const handleLogin = () => {
    if (username.trim()) {
      login(username)
      addNotification(`Welcome, ${username}!`, 'success')
      setUsername('')
    }
  }
  
  const handleLogout = () => {
    addNotification(`Goodbye, ${user?.username}!`, 'info')
    logout()
  }
  
  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white">
      <h5 className="font-bold mb-3">👤 User</h5>
      
      {!isAuthenticated ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="flex-1 px-3 py-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Login
          </button>
        </div>
      ) : (
        <div>
          <div className="bg-green-50 border border-green-200 rounded p-3 mb-3">
            <p className="font-semibold">{user.username}</p>
            <p className="text-xs text-gray-600">Logged in at {user.loginTime}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

// Component 2: Product List
function ProductList() {
  const addItem = useCartStore(state => state.addItem)
  const addNotification = useNotificationStore(state => state.addNotification)
  
  const handleAddToCart = (product) => {
    addItem(product)
    addNotification(`Added ${product.name} to cart`, 'success')
  }
  
  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white">
      <h5 className="font-bold mb-3">🛍️ Products</h5>
      <div className="space-y-2">
        {products.map(product => (
          <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <p className="font-semibold">{product.name}</p>
              <p className="text-sm text-gray-600">${product.price}</p>
            </div>
            <button
              onClick={() => handleAddToCart(product)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// Component 3: Shopping Cart
function ShoppingCart() {
  const { items, removeItem, clearCart, getTotal, getItemCount } = useCartStore()
  const addNotification = useNotificationStore(state => state.addNotification)
  
  const handleClearCart = () => {
    clearCart()
    addNotification('Cart cleared', 'info')
  }
  
  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between mb-3">
        <h5 className="font-bold">🛒 Cart ({getItemCount()})</h5>
        {items.length > 0 && (
          <button
            onClick={handleClearCart}
            className="text-sm text-red-500 hover:text-red-600"
          >
            Clear
          </button>
        )}
      </div>
      
      {items.length === 0 ? (
        <p className="text-gray-400 text-center py-4">Cart is empty</p>
      ) : (
        <>
          <div className="space-y-2 mb-3">
            {items.map(item => (
              <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex-1">
                  <p className="font-semibold text-sm">{item.name}</p>
                  <p className="text-xs text-gray-600">${item.price} × {item.quantity}</p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-600 text-xl"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="border-t pt-3">
            <p className="font-bold text-lg">Total: ${getTotal()}</p>
          </div>
        </>
      )}
    </div>
  )
}

// Component 4: Notifications
function NotificationList() {
  const { notifications, removeNotification, clearAll } = useNotificationStore()
  
  React.useEffect(() => {
    // Auto-remove notifications after 3 seconds
    const timers = notifications.map(notif => {
      return setTimeout(() => {
        removeNotification(notif.id)
      }, 3000)
    })
    
    return () => timers.forEach(clearTimeout)
  }, [notifications])
  
  if (notifications.length === 0) return null
  
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map(notif => (
        <div
          key={notif.id}
          className={`p-4 rounded-lg shadow-lg border-2 flex items-start gap-3 animate-slideIn ${
            notif.type === 'success' ? 'bg-green-50 border-green-300' :
            notif.type === 'error' ? 'bg-red-50 border-red-300' :
            'bg-blue-50 border-blue-300'
          }`}
        >
          <span className="text-2xl">
            {notif.type === 'success' ? '✅' : notif.type === 'error' ? '❌' : 'ℹ️'}
          </span>
          <p className="flex-1 text-sm font-semibold">{notif.message}</p>
          <button
            onClick={() => removeNotification(notif.id)}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

export default function ZustandExample4(){
  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">Zustand — Multiple Stores</h4>
      
      <NotificationList />
      
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
        <p className="text-sm mb-2">
          <strong>🏗️ Architecture:</strong>
        </p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li><strong>3 independent stores:</strong> User, Cart, Notifications</li>
          <li>Each store manages its own domain</li>
          <li>Stores can communicate via actions</li>
          <li>Easier to test and maintain</li>
          <li>Better code organization than single monolithic store</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UserPanel />
        <ProductList />
        <ShoppingCart />
      </div>

      <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <p className="text-sm mb-2">
          <strong>🤔 One Store vs Multiple Stores?</strong>
        </p>
        <div className="text-sm space-y-2">
          <div>
            <strong>Multiple Stores (this example):</strong>
            <ul className="list-disc list-inside ml-2 text-xs">
              <li>✅ Better separation of concerns</li>
              <li>✅ Easier to test individual domains</li>
              <li>✅ Can be lazy-loaded separately</li>
              <li>❌ More boilerplate for cross-store communication</li>
            </ul>
          </div>
          <div>
            <strong>Single Store:</strong>
            <ul className="list-disc list-inside ml-2 text-xs">
              <li>✅ Simpler cross-domain updates</li>
              <li>✅ Single source of truth</li>
              <li>❌ Can become large and hard to maintain</li>
              <li>❌ Harder to test specific features</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
