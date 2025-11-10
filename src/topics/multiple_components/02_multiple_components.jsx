import React, {useState} from 'react'

/**
 * CHALLENGE: Compound Components Pattern
 * 
 * LEARNING GOALS:
 * - Build flexible component APIs
 * - Share state between parent and children implicitly
 * - Use React Context for internal communication
 * - Create reusable UI patterns (Tabs, Accordion, etc.)
 * - Provide great developer experience
 * 
 * TODO:
 * 1. Build a Tabs component with compound pattern
 * 2. Parent (Tabs) manages active state
 * 3. Children (TabList, Tab, TabPanels, TabPanel) access shared state
 * 4. Use Context to share state without prop drilling
 * 5. Flexible API: <Tabs><TabList><Tab>...</Tabs>
 */

// Context for sharing state between Tabs components
const TabsContext = React.createContext()

// Parent component - manages state
function Tabs({ children, defaultIndex = 0 }) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex)

  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        {children}
      </div>
    </TabsContext.Provider>
  )
}

// Tab list container
function TabList({ children }) {
  return (
    <div className="flex border-b border-gray-300 bg-gray-50">
      {children}
    </div>
  )
}

// Individual tab button
function Tab({ children, index }) {
  const { activeIndex, setActiveIndex } = React.useContext(TabsContext)
  const isActive = activeIndex === index

  return (
    <button
      onClick={() => setActiveIndex(index)}
      className={`flex-1 px-6 py-3 font-semibold transition ${
        isActive
          ? 'bg-white text-blue-600 border-b-2 border-blue-600'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  )
}

// Panel container
function TabPanels({ children }) {
  return <div className="p-6">{children}</div>
}

// Individual panel
function TabPanel({ children, index }) {
  const { activeIndex } = React.useContext(TabsContext)
  
  if (activeIndex !== index) return null

  return <div className="animate-fadeIn">{children}</div>
}

// Export as compound component
Tabs.List = TabList
Tabs.Tab = Tab
Tabs.Panels = TabPanels
Tabs.Panel = TabPanel

export default function MultipleComponents2(){
  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">Component Patterns — Compound Components</h4>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <p className="text-sm mb-2">
          <strong>✨ Pattern Benefits:</strong>
        </p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Clean, declarative API</li>
          <li>State managed internally (no prop drilling)</li>
          <li>Flexible component composition</li>
          <li>Similar to HTML native elements (select/option)</li>
          <li>Used by libraries: Radix UI, Headless UI, React Aria</li>
        </ul>
      </div>

      {/* Example Usage */}
      <Tabs defaultIndex={0}>
        <Tabs.List>
          <Tabs.Tab index={0}>🏠 Home</Tabs.Tab>
          <Tabs.Tab index={1}>👤 Profile</Tabs.Tab>
          <Tabs.Tab index={2}>⚙️ Settings</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panels>
          <Tabs.Panel index={0}>
            <h5 className="text-lg font-bold mb-3">Welcome Home!</h5>
            <p className="text-gray-600 mb-4">
              This is the home tab content. The compound component pattern allows
              flexible composition without prop drilling.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded p-3">
              <p className="text-sm">
                Notice how <code className="bg-white px-1 rounded">Tab</code> components
                don't receive props directly. They access shared state via Context!
              </p>
            </div>
          </Tabs.Panel>

          <Tabs.Panel index={1}>
            <h5 className="text-lg font-bold mb-3">User Profile</h5>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                A
              </div>
              <div>
                <p className="font-bold text-lg">Alice Johnson</p>
                <p className="text-gray-600">alice@example.com</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
              Edit Profile
            </button>
          </Tabs.Panel>

          <Tabs.Panel index={2}>
            <h5 className="text-lg font-bold mb-4">Settings</h5>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5" defaultChecked />
                <span>Email notifications</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5" />
                <span>Dark mode</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5" defaultChecked />
                <span>Show online status</span>
              </label>
            </div>
          </Tabs.Panel>
        </Tabs.Panels>
      </Tabs>

      <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <p className="text-sm mb-2">
          <strong>🔧 Implementation:</strong>
        </p>
        <pre className="text-xs bg-white p-3 rounded overflow-auto">
{`<Tabs>
  <Tabs.List>
    <Tabs.Tab index={0}>Tab 1</Tabs.Tab>
    <Tabs.Tab index={1}>Tab 2</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panels>
    <Tabs.Panel index={0}>Content 1</Tabs.Panel>
    <Tabs.Panel index={1}>Content 2</Tabs.Panel>
  </Tabs.Panels>
</Tabs>`}
        </pre>
      </div>
    </div>
  )
}
