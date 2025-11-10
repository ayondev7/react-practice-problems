import React from 'react'

/**
 * CHALLENGE: Higher-Order Components (HOC)
 * 
 * LEARNING GOALS:
 * - Understand HOC pattern for code reuse
 * - Enhance components with additional props/behavior
 * - Component composition via functions
 * - Legacy pattern (before hooks) but still useful
 * - Used by libraries like Redux connect(), React Router withRouter()
 * 
 * TODO:
 * 1. Create withLoading HOC that adds loading state
 * 2. Create withAuth HOC that checks authentication
 * 3. Compose multiple HOCs
 * 4. Pass props through HOCs correctly
 * 5. Understand HOC limitations vs hooks
 */

// HOC 1: Adds loading functionality
function withLoading(Component) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return (
        <div className="border border-gray-300 rounded-lg p-8 bg-gray-50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 font-semibold">Loading...</p>
          </div>
        </div>
      )
    }
    
    return <Component {...props} />
  }
}

// HOC 2: Adds authentication check
function withAuth(Component) {
  return function WithAuthComponent({ isAuthenticated, ...props }) {
    if (!isAuthenticated) {
      return (
        <div className="border-2 border-red-300 rounded-lg p-6 bg-red-50">
          <div className="text-center">
            <p className="text-4xl mb-3">🔒</p>
            <p className="text-red-700 font-bold text-lg mb-2">Access Denied</p>
            <p className="text-red-600 text-sm">Please log in to view this content</p>
          </div>
        </div>
      )
    }
    
    return <Component {...props} />
  }
}

// HOC 3: Adds analytics tracking
function withAnalytics(Component) {
  return function WithAnalyticsComponent(props) {
    React.useEffect(() => {
      console.log(`📊 Component ${Component.name} mounted`)
      return () => {
        console.log(`📊 Component ${Component.name} unmounted`)
      }
    }, [])
    
    return <Component {...props} />
  }
}

// Base component (regular component)
function UserProfile({ user }) {
  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-white">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
          {user.name.charAt(0)}
        </div>
        <div>
          <h3 className="text-xl font-bold">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-500">Role: {user.role}</p>
        </div>
      </div>
      <div className="bg-green-50 border border-green-200 rounded p-3">
        <p className="text-sm text-green-700">
          ✓ This component has been enhanced with HOCs!
        </p>
      </div>
    </div>
  )
}

// Base component 2
function Dashboard({ stats }) {
  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-white">
      <h3 className="text-xl font-bold mb-4">Dashboard</h3>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="bg-blue-50 border border-blue-200 rounded p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{value}</p>
            <p className="text-sm text-gray-600 capitalize">{key}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Enhanced components using HOCs
const EnhancedUserProfile = withAnalytics(withAuth(withLoading(UserProfile)))
const EnhancedDashboard = withLoading(withAuth(Dashboard))

export default function MultipleComponents4(){
  const [isLoading, setIsLoading] = React.useState(true)
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)

  React.useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const user = {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'Admin'
  }

  const stats = {
    users: 1234,
    posts: 567,
    comments: 8901
  }

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">Component Patterns — Higher-Order Components</h4>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm mb-2">
          <strong>🔧 HOC Pattern:</strong>
        </p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Function that takes component, returns enhanced component</li>
          <li><code className="bg-white px-1 rounded">withLoading(Component)</code> adds loading state</li>
          <li><code className="bg-white px-1 rounded">withAuth(Component)</code> adds auth check</li>
          <li>Can compose multiple HOCs together</li>
          <li>Legacy pattern, but used by Redux, React Router, etc.</li>
        </ul>
      </div>

      {/* Controls */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setIsAuthenticated(!isAuthenticated)}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            isAuthenticated
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-red-500 text-white hover:bg-red-600'
          }`}
        >
          {isAuthenticated ? '✓ Authenticated' : '✗ Not Authenticated'}
        </button>
        
        <button
          onClick={() => setIsLoading(!isLoading)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold"
        >
          Toggle Loading
        </button>
      </div>

      {/* Example 1: Multiple HOCs composed */}
      <div className="mb-6">
        <h5 className="font-bold mb-2 text-sm text-gray-600">
          Component with 3 HOCs (withAnalytics → withAuth → withLoading):
        </h5>
        <EnhancedUserProfile
          user={user}
          isLoading={isLoading}
          isAuthenticated={isAuthenticated}
        />
      </div>

      {/* Example 2: Fewer HOCs */}
      <div className="mb-6">
        <h5 className="font-bold mb-2 text-sm text-gray-600">
          Component with 2 HOCs (withAuth → withLoading):
        </h5>
        <EnhancedDashboard
          stats={stats}
          isLoading={isLoading}
          isAuthenticated={isAuthenticated}
        />
      </div>

      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <p className="text-sm mb-2">
          <strong>⚠️ HOCs vs Hooks:</strong>
        </p>
        <div className="text-sm space-y-2">
          <div>
            <strong>HOC (this example):</strong>
            <pre className="bg-white p-2 rounded mt-1 text-xs overflow-auto">
{`const Enhanced = withAuth(withLoading(Component))
<Enhanced isAuth={true} isLoading={false} />`}
            </pre>
          </div>
          <div>
            <strong>Custom Hook (modern):</strong>
            <pre className="bg-white p-2 rounded mt-1 text-xs overflow-auto">
{`function Component() {
  const { isAuth, isLoading } = useAuth()
  if (isLoading) return <Loading />
  if (!isAuth) return <Login />
  return <Content />
}`}
            </pre>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            ℹ️ Hooks avoid "wrapper hell" and are easier to compose. Use HOCs when you need to wrap existing components you don't control (e.g., third-party libs).
          </p>
        </div>
      </div>
    </div>
  )
}
