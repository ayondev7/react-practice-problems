import React from 'react'
import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

/**
 * CHALLENGE: Zustand Middleware (Persist & DevTools)
 * 
 * LEARNING GOALS:
 * - Use persist middleware for localStorage sync
 * - Use devtools middleware for Redux DevTools
 * - Combine multiple middleware
 * - Configure middleware options
 * - Debug state changes visually
 * 
 * TODO:
 * 1. Add persist middleware to save state to localStorage
 * 2. Add devtools middleware for Redux DevTools integration
 * 3. Test persistence (refresh page, state remains)
 * 4. Open Redux DevTools to see actions
 * 5. Understand middleware composition
 * 
 * Note: Install Redux DevTools browser extension to see it in action
 */

// Store with multiple middleware
const usePersistedStore = create(
  devtools(
    persist(
      (set) => ({
        // State
        username: '',
        theme: 'light',
        notifications: true,
        language: 'en',
        
        // Actions
        setUsername: (username) => set({ username }, false, 'setUsername'),
        setTheme: (theme) => set({ theme }, false, 'setTheme'),
        toggleNotifications: () => set(
          (state) => ({ notifications: !state.notifications }),
          false,
          'toggleNotifications'
        ),
        setLanguage: (language) => set({ language }, false, 'setLanguage'),
        resetSettings: () => set({
          username: '',
          theme: 'light',
          notifications: true,
          language: 'en'
        }, false, 'resetSettings'),
      }),
      {
        name: 'user-settings', // localStorage key
        partialize: (state) => ({
          // Only persist these fields
          username: state.username,
          theme: state.theme,
          notifications: state.notifications,
          language: state.language,
        }),
      }
    ),
    { name: 'SettingsStore' } // DevTools name
  )
)

// Component 1: User Settings Form
function SettingsForm() {
  const {
    username,
    theme,
    notifications,
    language,
    setUsername,
    setTheme,
    toggleNotifications,
    setLanguage,
  } = usePersistedStore()
  
  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-white">
      <h5 className="font-bold text-lg mb-4">User Settings</h5>
      
      <div className="space-y-4">
        {/* Username */}
        <div>
          <label className="block text-sm font-semibold mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          />
        </div>
        
        {/* Theme */}
        <div>
          <label className="block text-sm font-semibold mb-2">Theme</label>
          <div className="flex gap-2">
            {['light', 'dark', 'auto'].map(t => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold transition ${
                  theme === t
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {t === 'light' && '☀️ Light'}
                {t === 'dark' && '🌙 Dark'}
                {t === 'auto' && '⚙️ Auto'}
              </button>
            ))}
          </div>
        </div>
        
        {/* Notifications */}
        <div>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm font-semibold">Enable Notifications</span>
            <input
              type="checkbox"
              checked={notifications}
              onChange={toggleNotifications}
              className="w-5 h-5"
            />
          </label>
        </div>
        
        {/* Language */}
        <div>
          <label className="block text-sm font-semibold mb-2">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
        </div>
      </div>
    </div>
  )
}

// Component 2: Settings Preview
function SettingsPreview() {
  const settings = usePersistedStore()
  
  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-gray-50">
      <h5 className="font-bold text-lg mb-4">Current Settings</h5>
      <div className="bg-white rounded-lg p-4 font-mono text-sm">
        <pre>{JSON.stringify({
          username: settings.username || '(not set)',
          theme: settings.theme,
          notifications: settings.notifications,
          language: settings.language,
        }, null, 2)}</pre>
      </div>
    </div>
  )
}

// Component 3: Reset Button
function ResetButton() {
  const resetSettings = usePersistedStore(state => state.resetSettings)
  
  return (
    <button
      onClick={resetSettings}
      className="w-full px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold"
    >
      Reset to Defaults
    </button>
  )
}

export default function ZustandExample3(){
  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">Zustand — Middleware (Persist & DevTools)</h4>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <p className="text-sm mb-2">
          <strong>🎯 Middleware Features:</strong>
        </p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li><strong>Persist:</strong> Auto-saves to localStorage (refresh page!)</li>
          <li><strong>DevTools:</strong> Redux DevTools integration for debugging</li>
          <li><strong>Partialize:</strong> Choose which state to persist</li>
          <li><strong>Action Names:</strong> Track actions in DevTools</li>
          <li>Middleware can be composed easily</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <SettingsForm />
        <SettingsPreview />
      </div>

      <ResetButton />

      <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <p className="text-sm mb-2">
          <strong>🔧 Middleware Setup:</strong>
        </p>
        <pre className="text-xs bg-white p-3 rounded overflow-auto">
{`import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

const useStore = create(
  devtools(
    persist(
      (set) => ({ /* state & actions */ }),
      {
        name: 'storage-key', // localStorage key
        partialize: (state) => ({ /* selected fields */ })
      }
    ),
    { name: 'DevToolsName' }
  )
)`}
        </pre>
      </div>

      <div className="mt-4 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <p className="text-sm">
          <strong>🧪 Test Persistence:</strong>
        </p>
        <ol className="text-sm list-decimal list-inside space-y-1 mt-2">
          <li>Change settings above</li>
          <li>Refresh the page (F5)</li>
          <li>Settings remain! (saved to localStorage)</li>
          <li>Open Redux DevTools to see actions</li>
        </ol>
      </div>
    </div>
  )
}
