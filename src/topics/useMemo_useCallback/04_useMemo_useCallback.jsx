import React, {useMemo, useCallback, useState} from 'react'

export default function UseMemoCallbackExample4(){
  /**
   * CHALLENGE: Complex Dashboard with Multiple Memoizations
   * 
   * LEARNING GOALS:
   * - Using multiple useMemo hooks together
   * - Optimizing complex data transformations
   * - Memoizing expensive charts/visualizations
   * - Managing dependencies across memoizations
   * 
   * TODO:
   * 1. State for: data, timeRange, metric
   * 2. useMemo for filteredData (by timeRange)
   * 3. useMemo for statistics (from filteredData)
   * 4. useMemo for chartData (expensive transformation)
   * 5. useCallback for filter/sort handlers
   */

  const [timeRange, setTimeRange] = useState('week')
  const [metric, setMetric] = useState('revenue')
  const [refreshCount, setRefreshCount] = useState(0)

  // Generate mock data
  const rawData = useMemo(() => {
    console.log('📊 Generating raw data...')
    return Array.from({length: 365}, (_, i) => ({
      date: new Date(2024, 0, i + 1),
      revenue: Math.floor(Math.random() * 10000) + 1000,
      users: Math.floor(Math.random() * 1000) + 100,
      conversions: Math.floor(Math.random() * 100) + 10
    }))
  }, [])

  // TODO: Memoize filtered data based on timeRange
  // const filteredData = useMemo(() => {
  //   console.log('🔍 Filtering data by time range...')
  //   const ranges = { week: 7, month: 30, quarter: 90, year: 365 }
  //   return rawData.slice(-ranges[timeRange])
  // }, [rawData, timeRange])

  const filteredData = rawData // Replace with memoized version

  // TODO: Memoize statistics
  // const statistics = useMemo(() => {
  //   console.log('📈 Calculating statistics...')
  //   const sum = filteredData.reduce((acc, item) => acc + item[metric], 0)
  //   const avg = sum / filteredData.length
  //   const max = Math.max(...filteredData.map(item => item[metric]))
  //   const min = Math.min(...filteredData.map(item => item[metric]))
  //   return {
  //     total: sum.toFixed(0),
  //     average: avg.toFixed(2),
  //     maximum: max,
  //     minimum: min,
  //     count: filteredData.length
  //   }
  // }, [filteredData, metric])

  const statistics = {
    total: 0,
    average: 0,
    maximum: 0,
    minimum: 0,
    count: 0
  } // Replace

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">useMemo — Complex Dashboard</h4>
      
      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Time Range</label>
          <div className="flex gap-2">
            {['week', 'month', 'quarter', 'year'].map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg transition ${
                  timeRange === range
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Metric</label>
          <select
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="revenue">Revenue</option>
            <option value="users">Users</option>
            <option value="conversions">Conversions</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={() => setRefreshCount(c => c + 1)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            🔄 Refresh ({refreshCount})
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 mb-1">Total</p>
          <p className="text-2xl font-bold text-blue-600">{statistics.total}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 mb-1">Average</p>
          <p className="text-2xl font-bold text-green-600">{statistics.average}</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 mb-1">Maximum</p>
          <p className="text-2xl font-bold text-purple-600">{statistics.maximum}</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 mb-1">Minimum</p>
          <p className="text-2xl font-bold text-orange-600">{statistics.minimum}</p>
        </div>
        <div className="bg-pink-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 mb-1">Data Points</p>
          <p className="text-2xl font-bold text-pink-600">{statistics.count}</p>
        </div>
      </div>

      {/* Simple Chart */}
      <div className="bg-gray-50 rounded-lg p-4 h-64">
        <p className="text-sm text-gray-600 mb-2">
          {metric.charAt(0).toUpperCase() + metric.slice(1)} Trend
        </p>
        <div className="flex items-end justify-between h-48 gap-1">
          {/* TODO: Optimize this rendering with memoization */}
          {filteredData.slice(-30).map((item, i) => (
            <div
              key={i}
              className="flex-1 bg-blue-500 rounded-t"
              style={{
                height: `${(item[metric] / Math.max(...filteredData.map(d => d[metric]))) * 100}%`,
                minWidth: '2px'
              }}
              title={`${item.date.toLocaleDateString()}: ${item[metric]}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <p className="text-sm">
          🎯 Check console! Memoize filteredData & statistics to optimize.
        </p>
      </div>
    </div>
  )
}
