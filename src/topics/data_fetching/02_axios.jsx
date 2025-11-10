import React, {useState, useEffect} from 'react'
// TODO: Install axios first: npm install axios
// import axios from 'axios'

export default function DataFetching02_Axios(){
  /**
   * CHALLENGE: Data Fetching with Axios
   * 
   * LEARNING GOALS:
   * - Using Axios HTTP client library
   * - Automatic JSON parsing
   * - Request/response interceptors
   * - Cancel tokens for cleanup
   * - Better error handling than fetch
   * 
   * SETUP:
   * Run: npm install axios
   * 
   * TODO:
   * 1. Install axios (npm install axios)
   * 2. Import axios
   * 3. State for: posts, loading, error, page
   * 4. Implement fetchPosts() with axios.get()
   * 5. Implement pagination
   * 6. Use axios cancel token for cleanup
   * 7. Handle axios errors properly
   */

  // TODO: Add your state
  // const [posts, setPosts] = useState([])
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState(null)
  // const [page, setPage] = useState(1)

  // TODO: Implement fetch with axios
  // useEffect(() => {
  //   const source = axios.CancelToken.source()
  //   
  //   const fetchPosts = async () => {
  //     try {
  //       setLoading(true)
  //       setError(null)
  //       
  //       const response = await axios.get(
  //         `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`,
  //         { cancelToken: source.token }
  //       )
  //       
  //       setPosts(response.data) // Axios auto-parses JSON!
  //     } catch (err) {
  //       if (!axios.isCancel(err)) {
  //         setError(err.response?.data?.message || err.message)
  //       }
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   
  //   fetchPosts()
  //   
  //   return () => source.cancel('Component unmounted')
  // }, [page])

  // TODO: Implement pagination handlers
  const nextPage = () => {
    // setPage(p => p + 1)
  }

  const prevPage = () => {
    // setPage(p => Math.max(1, p - 1))
  }

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">Data Fetching — Axios</h4>
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm text-gray-600">
            Endpoint: <code className="bg-gray-100 px-2 py-1 rounded text-xs">
              /posts?_page={/* page */}1&_limit=10
            </code>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={prevPage}
            // TODO: Disable if page === 1
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50 transition"
          >
            ← Previous
          </button>
          <span className="px-4 py-2 bg-blue-50 rounded-lg font-semibold">
            Page {/* TODO: page */}1
          </span>
          <button
            onClick={nextPage}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Loading */}
      {/* TODO: Conditional rendering for loading */}
      <div className="flex justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading posts...</p>
        </div>
      </div>

      {/* Error */}
      {/* TODO: Conditional rendering for error */}
      <div className="bg-red-50 border border-red-300 rounded-lg p-4 mb-4">
        <p className="font-semibold text-red-700">Error:</p>
        <p className="text-red-600 text-sm">{/* error */}</p>
      </div>

      {/* Posts */}
      {/* TODO: Map over posts */}
      <div className="space-y-4">
        <p className="text-gray-400 italic text-center py-8">
          Install axios and implement fetching!
        </p>

        {/* Example post card:
        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              {post.id}
            </div>
            <div className="flex-1">
              <h5 className="font-semibold mb-2">{post.title}</h5>
              <p className="text-sm text-gray-600">{post.body}</p>
            </div>
          </div>
        </div>
        */}
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-green-50 rounded-lg p-4 border border-green-200">
        <p className="text-sm mb-2">
          <strong>🎯 Axios Advantages:</strong>
        </p>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>✅ Automatic JSON parsing (no .json() needed)</li>
          <li>✅ Better error handling (response.data)</li>
          <li>✅ Request/response interceptors</li>
          <li>✅ Cancel tokens built-in</li>
          <li>✅ Simpler syntax than fetch</li>
        </ul>
      </div>
    </div>
  )
}
