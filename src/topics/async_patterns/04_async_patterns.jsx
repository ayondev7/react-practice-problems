import React, {useState, useOptimistic} from 'react'

export default function AsyncPatternExample4(){
  /**
   * CHALLENGE: Optimistic UI Updates
   * 
   * LEARNING GOALS:
   * - Use useOptimistic hook (React 19 experimental)
   * - Implement instant UI feedback
   * - Rollback on failure
   * - Handle async mutations gracefully
   * - Improve perceived performance
   * 
   * TODO:
   * 1. Implement optimistic updates for likes/comments
   * 2. Show immediate UI changes before API confirms
   * 3. Rollback changes if API fails
   * 4. Use useOptimistic or manual state management
   * 5. Add visual indicators for pending updates
   */

  const [posts, setPosts] = useState([
    { id: 1, text: 'Just shipped a new feature! 🚀', likes: 42, liked: false },
    { id: 2, text: 'Learning React 19 patterns', likes: 28, liked: false },
    { id: 3, text: 'Async patterns are amazing!', likes: 55, liked: true },
  ])

  const [pendingActions, setPendingActions] = useState(new Set())

  // Simulate API call with random delays and occasional failures
  const apiLikePost = async (postId, newLikedState) => {
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
    
    // 20% chance of failure
    if (Math.random() > 0.8) {
      throw new Error('Network error')
    }
    
    return { success: true, postId, liked: newLikedState }
  }

  // Optimistic like handler
  const handleLike = async (postId) => {
    // Find current post state
    const post = posts.find(p => p.id === postId)
    if (!post) return

    const newLikedState = !post.liked
    const likeDelta = newLikedState ? 1 : -1

    // Optimistic update (instant UI change)
    setPosts(prev => prev.map(p => 
      p.id === postId 
        ? { ...p, liked: newLikedState, likes: p.likes + likeDelta }
        : p
    ))

    setPendingActions(prev => new Set(prev).add(postId))

    try {
      // Actual API call
      await apiLikePost(postId, newLikedState)
      // Success - optimistic update was correct!
    } catch (error) {
      // Rollback on failure
      setPosts(prev => prev.map(p => 
        p.id === postId 
          ? { ...p, liked: !newLikedState, likes: p.likes - likeDelta }
          : p
      ))
      alert(`❌ Failed to ${newLikedState ? 'like' : 'unlike'} post. Changes reverted.`)
    } finally {
      setPendingActions(prev => {
        const newSet = new Set(prev)
        newSet.delete(postId)
        return newSet
      })
    }
  }

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">Async Patterns — Optimistic UI Updates</h4>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="text-sm mb-2">
          <strong>💡 Try it:</strong>
        </p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Click the heart to like/unlike (instant feedback!)</li>
          <li>UI updates immediately before API responds</li>
          <li>20% chance of failure → watch rollback animation</li>
          <li>Pending state shows during API call</li>
        </ul>
      </div>

      <div className="space-y-4">
        {posts.map(post => {
          const isPending = pendingActions.has(post.id)
          
          return (
            <div
              key={post.id}
              className={`border-2 rounded-lg p-5 transition-all ${
                isPending 
                  ? 'border-blue-300 bg-blue-50' 
                  : 'border-gray-200 bg-white'
              }`}
            >
              <p className="text-lg mb-4">{post.text}</p>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLike(post.id)}
                  disabled={isPending}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 disabled:scale-100 ${
                    post.liked
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <span className="text-xl">
                    {post.liked ? '❤️' : '🤍'}
                  </span>
                  <span>{post.likes}</span>
                </button>

                {isPending && (
                  <span className="flex items-center gap-2 text-sm text-blue-600 font-semibold">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    Syncing...
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 bg-green-50 rounded-lg p-4 border border-green-200">
        <p className="text-sm mb-2">
          <strong>🎯 Optimistic UI Pattern:</strong>
        </p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li><strong>Step 1:</strong> Update UI immediately (optimistic)</li>
          <li><strong>Step 2:</strong> Send API request in background</li>
          <li><strong>Step 3:</strong> If success → keep changes ✅</li>
          <li><strong>Step 4:</strong> If fail → rollback changes ❌</li>
          <li>Users see instant feedback (feels faster!)</li>
          <li>Great for: likes, favorites, simple toggles</li>
        </ul>
      </div>
    </div>
  )
}
