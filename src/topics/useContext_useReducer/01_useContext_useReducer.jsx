import React, {useContext, createContext, useState} from 'react'

// TODO: Create ThemeContext
// const ThemeContext = createContext()

// TODO: Create ThemeProvider component
// export function ThemeProvider({ children }) {
//   const [theme, setTheme] = useState('light')
//   const [accentColor, setAccentColor] = useState('blue')
//   
//   const toggleTheme = () => {
//     setTheme(prev => prev === 'light' ? 'dark' : 'light')
//   }
//   
//   const value = { theme, accentColor, toggleTheme, setAccentColor }
//   
//   return (
//     <ThemeContext.Provider value={value}>
//       {children}
//     </ThemeContext.Provider>
//   )
// }

// TODO: Create custom hook for consuming context
// export function useTheme() {
//   const context = useContext(ThemeContext)
//   if (!context) {
//     throw new Error('useTheme must be used within ThemeProvider')
//   }
//   return context
// }

export default function UseContextReducerExample1(){
  /**
   * CHALLENGE: Theme Context - Global Theme Management
   * 
   * LEARNING GOALS:
   * - Creating and using Context API
   * - Provider pattern for global state
   * - Custom hooks for consuming context
   * - Avoiding prop drilling
   * - Multiple context values
   * 
   * TODO:
   * 1. Create ThemeContext with createContext()
   * 2. Implement ThemeProvider component with state
   * 3. Create useTheme custom hook
   * 4. Wrap this component with ThemeProvider (or wrap in parent)
   * 5. Consume theme in child components
   * 6. Add theme toggle and accent color selector
   */

  // TODO: Use the custom hook
  // const { theme, accentColor, toggleTheme, setAccentColor } = useTheme()

  const theme = 'light' // Temporary
  const accentColor = 'blue' // Temporary

  const colors = [
    { name: 'blue', value: '#3B82F6' },
    { name: 'purple', value: '#8B5CF6' },
    { name: 'green', value: '#10B981' },
    { name: 'red', value: '#EF4444' },
    { name: 'orange', value: '#F97316' },
  ]

  return (
    <div className={`card ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <h4 className="text-xl font-bold mb-4">useContext — Theme Management</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Theme Controls */}
        <div className="space-y-4">
          <div className={`rounded-lg p-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h5 className="font-semibold mb-3">Theme Settings</h5>
            
            <button
              // TODO: Add onClick={toggleTheme}
              className={`w-full px-4 py-3 rounded-lg font-semibold transition ${
                theme === 'dark'
                  ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
                  : 'bg-gray-800 text-white hover:bg-gray-900'
              }`}
            >
              {theme === 'dark' ? '☀️ Switch to Light' : '🌙 Switch to Dark'}
            </button>
          </div>

          <div className={`rounded-lg p-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h5 className="font-semibold mb-3">Accent Color</h5>
            <div className="flex gap-2">
              {colors.map(color => (
                <button
                  key={color.name}
                  // TODO: Add onClick={() => setAccentColor(color.name)}
                  className={`w-12 h-12 rounded-full border-4 transition ${
                    accentColor === color.name
                      ? 'border-white scale-110'
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Preview Cards */}
        <div className="space-y-3">
          <h5 className="font-semibold mb-3">Preview Components</h5>
          
          {/* Card 1 */}
          <div className={`rounded-lg p-4 border-2 ${
            theme === 'dark' 
              ? 'bg-gray-700 border-gray-600' 
              : 'bg-white border-gray-200'
          }`}>
            <h6 className={`font-semibold mb-2 text-${accentColor}-500`}>
              Sample Card 1
            </h6>
            <p className="text-sm">
              This card uses the global theme from context!
            </p>
          </div>

          {/* Card 2 */}
          <div className={`rounded-lg p-4 border-2 ${
            theme === 'dark' 
              ? 'bg-gray-700 border-gray-600' 
              : 'bg-white border-gray-200'
          }`}>
            <h6 className={`font-semibold mb-2 text-${accentColor}-500`}>
              Sample Card 2
            </h6>
            <p className="text-sm">
              No prop drilling needed - context handles it!
            </p>
          </div>

          {/* Button Example */}
          <button className={`w-full px-4 py-3 bg-${accentColor}-500 text-white rounded-lg hover:bg-${accentColor}-600 transition font-semibold`}>
            Accent Color Button
          </button>
        </div>
      </div>

      <div className="mt-6 bg-yellow-50 dark:bg-yellow-900 rounded-lg p-4 border border-yellow-200">
        <p className="text-sm">
          🎯 <strong>Exercise:</strong> Create ThemeProvider, wrap this component,
          implement toggleTheme and color selection. All children will have access
          to theme without prop drilling!
        </p>
      </div>
    </div>
  )
}

// TODO: Usage in App.jsx or parent component:
/*
import { ThemeProvider } from './path/to/this/file'

<ThemeProvider>
  <UseContextReducerExample1 />
</ThemeProvider>
*/
