import React, {useMemo, useCallback, useState} from 'react'

export default function UseMemoCallbackExample2(){
  /**
   * CHALLENGE: Search & Filter with useMemo
   * 
   * LEARNING GOALS:
   * - Memoizing filtered/sorted arrays
   * - Multiple useMemo for different computations
   * - Deriving data from state efficiently
   * - Performance with large datasets
   * 
   * TODO:
   * 1. State for: searchTerm, sortBy, filterCategory
   * 2. Create filteredProducts using useMemo
   * 3. Create sortedProducts using useMemo (depends on filteredProducts)
   * 4. Add statistics computation with useMemo
   * 5. Handle different sort/filter combinations
   */

  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [filterCategory, setFilterCategory] = useState('all')

  // Large product dataset
  const products = Array.from({length: 1000}, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    category: ['Electronics', 'Clothing', 'Food', 'Books'][i % 4],
    price: Math.floor(Math.random() * 500) + 10,
    rating: (Math.random() * 5).toFixed(1)
  }))

  // TODO: Memoize filtered products
  // const filteredProducts = useMemo(() => {
  //   console.log('🔍 Filtering products...')
  //   return products.filter(product => {
  //     const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
  //     const matchesCategory = filterCategory === 'all' || product.category === filterCategory
  //     return matchesSearch && matchesCategory
  //   })
  // }, [products, searchTerm, filterCategory])

  const filteredProducts = products // Replace with memoized version

  // TODO: Memoize sorted products
  // const sortedProducts = useMemo(() => {
  //   console.log('📊 Sorting products...')
  //   return [...filteredProducts].sort((a, b) => {
  //     if (sortBy === 'name') return a.name.localeCompare(b.name)
  //     if (sortBy === 'price') return a.price - b.price
  //     if (sortBy === 'rating') return b.rating - a.rating
  //     return 0
  //   })
  // }, [filteredProducts, sortBy])

  const sortedProducts = filteredProducts // Replace with memoized version

  // TODO: Memoize statistics
  // const stats = useMemo(() => {
  //   console.log('📈 Calculating stats...')
  //   return {
  //     total: filteredProducts.length,
  //     avgPrice: (filteredProducts.reduce((sum, p) => sum + p.price, 0) / filteredProducts.length).toFixed(2),
  //     avgRating: (filteredProducts.reduce((sum, p) => sum + parseFloat(p.rating), 0) / filteredProducts.length).toFixed(2)
  //   }
  // }, [filteredProducts])

  const stats = { total: 0, avgPrice: 0, avgRating: 0 } // Replace

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">useMemo — Search & Filter Performance</h4>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Search</label>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Food">Food</option>
            <option value="Books">Books</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 mb-1">Total Products</p>
          <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 mb-1">Avg Price</p>
          <p className="text-2xl font-bold text-green-600">${stats.avgPrice}</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 mb-1">Avg Rating</p>
          <p className="text-2xl font-bold text-purple-600">⭐ {stats.avgRating}</p>
        </div>
      </div>

      {/* Products List */}
      <div className="h-96 overflow-y-auto bg-gray-50 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* TODO: Map over sortedProducts (limit to first 50 for display) */}
          {sortedProducts.slice(0, 50).map(product => (
            <div key={product.id} className="bg-white rounded-lg p-3 border border-gray-200 hover:shadow-md transition">
              <h5 className="font-semibold text-sm mb-1">{product.name}</h5>
              <p className="text-xs text-gray-600 mb-2">{product.category}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-green-600">${product.price}</span>
                <span className="text-sm">⭐ {product.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <p className="text-sm">
          🎯 <strong>Exercise:</strong> Open console and change filters. Without useMemo, 
          filtering/sorting runs on every state change. Add useMemo to optimize!
        </p>
      </div>
    </div>
  )
}
