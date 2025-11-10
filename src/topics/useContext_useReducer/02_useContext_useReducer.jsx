import React, {useContext, createContext, useState} from 'react'

// TODO: Create AuthContext
// const AuthContext = createContext()

// TODO: Create AuthProvider
// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(false)
//   
//   const login = async (username, password) => {
//     setLoading(true)
//     // Simulate API call
//     setTimeout(() => {
//       setUser({ username, email: `${username}@example.com`, role: 'user' })
//       setLoading(false)
//     }, 1000)
//   }
//   
//   const logout = () => {
//     setUser(null)
//   }
//   
//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// TODO: Custom hook
// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (!context) throw new Error('useAuth must be used within AuthProvider')
//   return context
// }

export default function UseContextReducerExample2(){
  /**
   * CHALLENGE: Authentication Context
   * 
   * LEARNING GOALS:
   * - Auth state management with Context
   * - Protected routes concept
   * - Login/logout functionality
   * - Loading states in context
   * - Conditional rendering based on auth state
   * 
   * TODO:
   * 1. Create AuthContext and AuthProvider
   * 2. Implement login() with simulated async
   * 3. Implement logout()
   * 4. Create useAuth custom hook
   * 5. Show different UI based on auth state
   * 6. Add form validation
   */

  // TODO: Use custom hook
  // const { user, loading, login, logout } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = null // Temporary
  const loading = false // Temporary

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Call login(username, password)
  }

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">useContext — Authentication</h4>
      
      {!user ? (
        /* Login Form */
        <div className="max-w-md mx-auto">
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <div className="text-center mb-4">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-4xl">🔐</span>
              </div>
              <h5 className="text-xl font-semibold">Login to Continue</h5>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition font-semibold"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-4">
            💡 Enter any username/password to login
          </p>
        </div>
      ) : (
        /* Dashboard - User Logged In */
        <div>
          <div className="bg-green-50 rounded-lg p-6 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {user.username?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h5 className="text-xl font-semibold">Welcome, {user.username}!</h5>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    {user.role}
                  </span>
                </div>
              </div>
              <button
                // TODO: onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Protected Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">12</p>
              <p className="text-sm text-gray-600">Projects</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-purple-600">45</p>
              <p className="text-sm text-gray-600">Tasks</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-green-600">89%</p>
              <p className="text-sm text-gray-600">Complete</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h6 className="font-semibold mb-3">Recent Activity</h6>
            <div className="space-y-2">
              {['Completed project setup', 'Updated user profile', 'Created new task'].map((activity, i) => (
                <div key={i} className="flex items-center gap-3 p-2 bg-white rounded">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm">{activity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <p className="text-sm">
          🎯 <strong>Exercise:</strong> Create AuthProvider with login/logout.
          This pattern is used in real apps for protected routes and user state!
        </p>
      </div>
    </div>
  )
}
