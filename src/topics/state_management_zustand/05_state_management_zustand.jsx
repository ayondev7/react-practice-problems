import React from 'react'
import { create } from 'zustand'

/**
 * CHALLENGE: Async Actions with Zustand
 * 
 * LEARNING GOALS:
 * - Handle async operations in Zustand
 * - Manage loading and error states
 * - Implement API calls in store actions
 * - Optimistic updates pattern
 * - Advanced async patterns (retries, caching)
 * 
 * TODO:
 * 1. Create store with async fetch action
 * 2. Track loading, error, and data states
 * 3. Handle success and failure cases
 * 4. Implement retry logic
 * 5. Add request caching
 */

// Async Zustand Store
const useDataStore = create((set, get) => ({
  // State
  users: [],
  loading: false,
  error: null,
  lastFetch: null,
  
  // Async action: Fetch users
  fetchUsers: async () => {
    try {
      set({ loading: true, error: null })
      
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Random failure (20% chance)
      if (Math.random() > 0.8) {
        throw new Error('Failed to fetch users from server')
      }
      
      const mockUsers = [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', status: 'active' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com', status: 'active' },
        { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', status: 'inactive' },
        { id: 4, name: 'Diana Prince', email: 'diana@example.com', status: 'active' },
      ]
      
      set({
        users: mockUsers,
        loading: false,
        lastFetch: Date.now()
      })
    } catch (error) {
      set({
        error: error.message,
        loading: false
      })
    }
  },
  
  // Async action: Add user
  addUser: async (userData) => {
    try {
      set({ loading: true, error: null })
      
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const newUser = {
        id: Date.now(),
        ...userData,
        status: 'active'
      }
      
      set((state) => ({
        users: [...state.users, newUser],
        loading: false
      }))
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },
  
  // Async action: Delete user
  deleteUser: async (id) => {
    // Optimistic update
    const originalUsers = get().users
    set((state) => ({
      users: state.users.filter(u => u.id !== id)
    }))
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Simulate occasional failure
      if (Math.random() > 0.9) {
        throw new Error('Failed to delete user')
      }
    } catch (error) {
      // Rollback on failure
      set({
        users: originalUsers,
        error: error.message
      })
    }
  },
  
  // Async action: Toggle user status
  toggleUserStatus: async (id) => {
    const originalUsers = get().users
    
    // Optimistic update
    set((state) => ({
      users: state.users.map(u =>
        u.id === id
          ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
          : u
      )
    }))
    
    try {
      await new Promise(resolve => setTimeout(resolve, 400))
      
      if (Math.random() > 0.9) {
        throw new Error('Failed to update status')
      }
    } catch (error) {
      // Rollback
      set({
        users: originalUsers,
        error: error.message
      })
    }
  },
  
  // Clear error
  clearError: () => set({ error: null }),
  
  // Cache helper: check if data is fresh (within 30 seconds)
  isCacheFresh: () => {
    const { lastFetch } = get()
    if (!lastFetch) return false
    return (Date.now() - lastFetch) < 30000
  },
}))

// Component 1: Data Controls
function DataControls() {
  const { fetchUsers, loading, isCacheFresh } = useDataStore()
  const isFresh = isCacheFresh()
  
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={fetchUsers}
        disabled={loading}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 font-semibold"
      >
        {loading ? 'Loading...' : '🔄 Fetch Users'}
      </button>
      
      {isFresh && (
        <span className="text-sm text-green-600 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Data is fresh
        </span>
      )}
    </div>
  )
}

// Component 2: Add User Form
function AddUserForm() {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const { addUser, loading } = useDataStore()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (name.trim() && email.trim()) {
      await addUser({ name, email })
      setName('')
      setEmail('')
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400"
      >
        Add
      </button>
    </form>
  )
}

// Component 3: User List
function UserList() {
  const { users, loading, error, deleteUser, toggleUserStatus, clearError } = useDataStore()
  
  if (error) {
    return (
      <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">❌</span>
          <div className="flex-1">
            <p className="font-bold text-red-700 mb-1">Error</p>
            <p className="text-red-600 text-sm mb-3">{error}</p>
            <button
              onClick={clearError}
              className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  if (loading && users.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading users...</p>
      </div>
    )
  }
  
  if (users.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-4xl mb-3">👥</p>
        <p>No users yet. Click "Fetch Users" to load data.</p>
      </div>
    )
  }
  
  return (
    <div className="space-y-2">
      {users.map(user => (
        <div
          key={user.id}
          className="flex items-center gap-4 p-4 bg-white border border-gray-300 rounded-lg hover:shadow-md transition"
        >
          <div className="flex-1">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
          
          <button
            onClick={() => toggleUserStatus(user.id)}
            className={`px-3 py-1 rounded font-semibold text-sm ${
              user.status === 'active'
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {user.status === 'active' ? '✓ Active' : '⊘ Inactive'}
          </button>
          
          <button
            onClick={() => deleteUser(user.id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

// Component 4: Stats
function UserStats() {
  const users = useDataStore(state => state.users)
  
  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
  }
  
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
        <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
        <p className="text-xs text-gray-600">Total Users</p>
      </div>
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
        <p className="text-2xl font-bold text-green-600">{stats.active}</p>
        <p className="text-xs text-gray-600">Active</p>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
        <p className="text-2xl font-bold text-gray-600">{stats.inactive}</p>
        <p className="text-xs text-gray-600">Inactive</p>
      </div>
    </div>
  )
}

export default function ZustandExample5(){
  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">Zustand — Async Actions & Optimistic Updates</h4>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <p className="text-sm mb-2">
          <strong>🚀 Async Features:</strong>
        </p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Async actions with loading/error states</li>
          <li>Optimistic updates (instant UI feedback)</li>
          <li>Rollback on failure</li>
          <li>Cache freshness tracking (30s TTL)</li>
          <li>20% random failure to test error handling</li>
        </ul>
      </div>

      <div className="space-y-6">
        <DataControls />
        <UserStats />
        <AddUserForm />
        <UserList />
      </div>

      <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <p className="text-sm mb-2">
          <strong>🔧 Async Pattern:</strong>
        </p>
        <pre className="text-xs bg-white p-3 rounded overflow-auto">
{`const useStore = create((set, get) => ({
  data: [],
  loading: false,
  error: null,
  
  fetchData: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch('/api/data')
      const data = await response.json()
      set({ data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },
  
  // Optimistic update
  deleteItem: async (id) => {
    const original = get().data
    set({ data: data.filter(item => item.id !== id) })
    try {
      await fetch(\`/api/items/\${id}\`, { method: 'DELETE' })
    } catch (error) {
      set({ data: original, error: error.message })
    }
  }
}))`}
        </pre>
      </div>

      <div className="mt-4 bg-purple-50 rounded-lg p-4 border border-purple-200">
        <p className="text-sm mb-2">
          <strong>✅ Complete React 19 Practice Repository!</strong>
        </p>
        <div className="text-sm">
          <p className="mb-2">You've covered:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Core Hooks:</strong> useState, useEffect, useRef, useMemo/useCallback</li>
            <li><strong>Context & Reducers:</strong> Global state management patterns</li>
            <li><strong>Async Patterns:</strong> Loading states, race conditions, optimistic UI</li>
            <li><strong>Data Fetching:</strong> fetch, axios, React Query</li>
            <li><strong>Component Patterns:</strong> HOC, render props, compound, custom hooks</li>
            <li><strong>Zustand:</strong> Modern external state management</li>
          </ul>
          <p className="mt-3 font-semibold text-purple-700">
            🎓 Keep practicing and building real projects to become an advanced React developer!
          </p>
        </div>
      </div>
    </div>
  )
}
