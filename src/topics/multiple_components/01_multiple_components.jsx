import React, {useState} from 'react'

/**
 * CHALLENGE: Prop Drilling Problem & Solutions
 * 
 * LEARNING GOALS:
 * - Understand prop drilling anti-pattern
 * - Pass data through multiple component levels
 * - Recognize when it becomes a problem
 * - See alternative solutions (Context, composition)
 * - Component hierarchy design
 * 
 * TODO:
 * 1. Pass user data from top to deeply nested Profile component
 * 2. Thread through Header → Navbar → UserMenu → Profile (4 levels!)
 * 3. Notice how intermediate components don't use the props
 * 4. Implement prop forwarding through each level
 * 5. Feel the pain (then learn Context in useContext exercises!)
 */

// Level 4: Profile (deepest - actually uses the data!)
function Profile({ user, onLogout }) {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-lg">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
          {user.name.charAt(0)}
        </div>
        <div>
          <p className="font-bold">{user.name}</p>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      </div>
      <p className="text-xs text-gray-500 mb-3">Role: {user.role}</p>
      <button
        onClick={onLogout}
        className="w-full px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
      >
        Logout
      </button>
    </div>
  )
}

// Level 3: UserMenu (just passes props down - doesn't use them!)
function UserMenu({ user, onLogout, isOpen }) {
  if (!isOpen) return null
  
  return (
    <div className="absolute right-0 top-full mt-2 z-10">
      {/* Just forwarding props */}
      <Profile user={user} onLogout={onLogout} />
    </div>
  )
}

// Level 2: Navbar (also just passes props down!)
function Navbar({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false)
  
  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
      <h2 className="font-bold text-lg">MyApp</h2>
      
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition"
        >
          👤 {user.name}
        </button>
        
        {/* Still just forwarding! */}
        <UserMenu user={user} onLogout={onLogout} isOpen={menuOpen} />
      </div>
    </nav>
  )
}

// Level 1: Header (receives props from parent, passes down)
function Header({ user, onLogout }) {
  return (
    <header className="mb-6">
      {/* Forwarding again... */}
      <Navbar user={user} onLogout={onLogout} />
    </header>
  )
}

// Level 0: Main Component (top level)
export default function MultipleComponents1(){
  const [user] = useState({
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'Admin'
  })

  const handleLogout = () => {
    alert('Logged out!')
  }

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">Component Patterns — Prop Drilling Problem</h4>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="text-sm mb-2">
          <strong>😫 The Problem:</strong>
        </p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>User data starts here (App level)</li>
          <li>Passed through Header → Navbar → UserMenu → Profile</li>
          <li>3 intermediate components don't use the data!</li>
          <li>They only forward it (prop drilling)</li>
          <li>Hard to maintain and refactor</li>
        </ul>
      </div>

      {/* This is where props start their journey */}
      <Header user={user} onLogout={handleLogout} />

      <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
        <h5 className="font-bold mb-4">🔍 Component Tree:</h5>
        <div className="font-mono text-sm space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-blue-600">▸ App</span>
            <span className="text-gray-400">(has user data)</span>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <span className="text-blue-600">▸ Header</span>
            <span className="text-red-500">(doesn't use, just forwards)</span>
          </div>
          <div className="flex items-center gap-2 ml-8">
            <span className="text-blue-600">▸ Navbar</span>
            <span className="text-red-500">(doesn't use, just forwards)</span>
          </div>
          <div className="flex items-center gap-2 ml-12">
            <span className="text-blue-600">▸ UserMenu</span>
            <span className="text-red-500">(doesn't use, just forwards)</span>
          </div>
          <div className="flex items-center gap-2 ml-16">
            <span className="text-blue-600">▸ Profile</span>
            <span className="text-green-600">✓ (finally uses it!)</span>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <p className="text-sm mb-2">
          <strong>✅ Solutions:</strong>
        </p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li><strong>Context API:</strong> Share data without drilling (see useContext topic)</li>
          <li><strong>Composition:</strong> Pass components as children</li>
          <li><strong>State Management:</strong> Zustand, Redux (see state_management topic)</li>
          <li><strong>Component Colocation:</strong> Move components closer to where data is used</li>
        </ul>
      </div>
    </div>
  )
}
