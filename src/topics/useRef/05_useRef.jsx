import React, {useRef, useState, useEffect, useCallback} from 'react'

export default function UseRefExample5(){
  /**
   * CHALLENGE: Infinite Scroll with Intersection Observer
   * 
   * LEARNING GOALS:
   * - Using Intersection Observer API with useRef
   * - Implementing infinite scroll pattern
   * - Ref callbacks
   * - Pagination logic
   * - Cleanup with observers
   * 
   * TODO:
   * 1. State for: items, page, loading, hasMore
   * 2. Ref for: observer, lastItemRef
   * 3. Create Intersection Observer in useEffect
   * 4. Implement loadMore() to fetch next page
   * 5. Attach observer to last element
   * 6. Cleanup observer
   */

  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  
  // TODO: Create ref for observer
  // const observer = useRef()

  // TODO: Implement lastItemRef callback
  // const lastItemRef = useCallback(node => {
  //   if (loading) return
  //   if (observer.current) observer.current.disconnect()
  //   
  //   observer.current = new IntersectionObserver(entries => {
  //     if (entries[0].isIntersecting && hasMore) {
  //       loadMore()
  //     }
  //   })
  //   
  //   if (node) observer.current.observe(node)
  // }, [loading, hasMore])

  // TODO: Load more items
  const loadMore = async () => {
    // setLoading(true)
    // Simulate API call
    // setTimeout(() => {
    //   const newItems = Array.from({length: 10}, (_, i) => ({
    //     id: items.length + i + 1,
    //     title: `Item ${items.length + i + 1}`,
    //     description: `Description for item ${items.length + i + 1}`
    //   }))
    //   setItems(prev => [...prev, ...newItems])
    //   setPage(p => p + 1)
    //   setHasMore(items.length + newItems.length < 100) // Stop at 100
    //   setLoading(false)
    // }, 1000)
  }

  // TODO: Load initial items on mount
  // useEffect(() => {
  //   loadMore()
  // }, [])

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">useRef — Infinite Scroll</h4>
      
      <div className="bg-gradient-to-b from-blue-50 to-white rounded-lg p-4 mb-4 border border-blue-200">
        <p className="text-sm">
          <strong>Current Page:</strong> {page} | 
          <strong className="ml-2">Total Items:</strong> {items.length} |
          <strong className="ml-2">Status:</strong> {hasMore ? '📊 More to load' : '✅ All loaded'}
        </p>
      </div>

      <div className="h-96 overflow-y-auto bg-gray-50 rounded-lg p-4">
        <div className="space-y-3">
          {items.length === 0 && !loading && (
            <p className="text-gray-400 italic text-center py-8">
              Scroll down to load items...
            </p>
          )}

          {/* TODO: Map over items */}
          {/* Add ref to last item: ref={items.length === index + 1 ? lastItemRef : null} */}
          {items.map((item, index) => (
            <div 
              key={item.id}
              // TODO: Add ref to last item
              className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition"
            >
              <h5 className="font-semibold text-lg mb-1">{item.title}</h5>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-600">Loading more items...</span>
            </div>
          )}

          {!hasMore && items.length > 0 && (
            <div className="text-center py-6 text-gray-500">
              🎉 You've reached the end!
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <p className="text-sm">
          💡 <strong>Tip:</strong> Scroll to the bottom of the container to trigger loading more items!
        </p>
      </div>
    </div>
  )
}
