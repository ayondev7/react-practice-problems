import React, {useEffect, useState, useRef} from 'react'

export default function UseEffectExample5(){
  /**
   * CHALLENGE: Chat App with LocalStorage Sync
   * 
   * LEARNING GOALS:
   * - Syncing state with localStorage
   * - Reading from localStorage on mount
   * - Writing to localStorage on state changes
   * - Auto-scroll behavior
   * - Complex useEffect dependencies
   * 
   * TODO:
   * 1. State for: messages (array), inputMessage
   * 2. Load messages from localStorage on mount
   * 3. Save messages to localStorage whenever they change
   * 4. Implement sendMessage() with timestamp
   * 5. Auto-scroll to bottom when new message added
   * 6. BONUS: Add username feature
   */

  // TODO: Add your state
  // const [messages, setMessages] = useState([])
  // const [inputMessage, setInputMessage] = useState('')
  // const [username, setUsername] = useState('User')
  const messagesEndRef = useRef(null)

  // TODO: Load messages from localStorage on mount
  // useEffect(() => {
  //   const saved = localStorage.getItem('chatMessages')
  //   if (saved) {
  //     setMessages(JSON.parse(saved))
  //   }
  // }, [])

  // TODO: Save messages to localStorage when they change
  // useEffect(() => {
  //   localStorage.setItem('chatMessages', JSON.stringify(messages))
  // }, [messages])

  // TODO: Auto-scroll to bottom when messages change
  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  // }, [messages])

  // TODO: Implement sendMessage
  const sendMessage = (e) => {
    // e.preventDefault()
    // if (!inputMessage.trim()) return
    // 
    // const newMessage = {
    //   id: Date.now(),
    //   text: inputMessage,
    //   username: username,
    //   timestamp: new Date().toLocaleTimeString()
    // }
    // 
    // setMessages(prev => [...prev, newMessage])
    // setInputMessage('')
  }

  // TODO: Implement clearChat
  const clearChat = () => {
    // Clear messages state and localStorage
  }

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">useEffect — Chat with LocalStorage</h4>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chat Area */}
        <div className="lg:col-span-2">
          {/* Messages Container */}
          <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto mb-4 border border-gray-200">
            {/* TODO: Map over messages */}
            {/* Show "No messages yet..." if empty */}
            <p className="text-gray-400 italic text-center">No messages yet. Start chatting!</p>

            {/* Example message structure:
            <div className="mb-3 bg-white rounded-lg p-3 shadow-sm">
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-blue-600">{message.username}</span>
                <span className="text-xs text-gray-500">{message.timestamp}</span>
              </div>
              <p className="text-gray-800">{message.text}</p>
            </div>
            */}

            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <form onSubmit={sendMessage} className="flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              // TODO: Add value and onChange
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Send
            </button>
          </form>
        </div>

        {/* Settings Panel */}
        <div className="space-y-4">
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h5 className="font-semibold mb-3">Settings</h5>
            
            <label className="block text-sm font-medium mb-2">Username:</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              // TODO: Add value and onChange for username
            />

            <button
              onClick={clearChat}
              className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Clear All Messages
            </button>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h5 className="font-semibold mb-2">📝 Features</h5>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>✅ Auto-save to localStorage</li>
              <li>✅ Persists on page reload</li>
              <li>✅ Auto-scroll to new messages</li>
              <li>✅ Timestamps</li>
              <li>✅ Custom usernames</li>
            </ul>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <p className="text-sm text-gray-700">
              💡 <strong>Tip:</strong> Try refreshing the page - your messages will still be here thanks to localStorage!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
