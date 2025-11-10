# Complete Challenges Reference 📚

## All 40 React Challenges

### ✅ useState (5/5 Complete)
1. ✅ Basic Counter
2. ✅ Todo List - Array state
3. ✅ Multi-Step Form - Object state
4. ✅ Shopping Cart - Functional updates
5. ✅ Tic-Tac-Toe - Complex game state

### ✅ useEffect (5/5 Complete)
1. ✅ Real-time Clock - Intervals & cleanup
2. ✅ Fetch User Data - API calls
3. ✅ Search Debouncing - Multiple effects
4. ✅ Window Resize - Event listeners
5. ✅ Chat LocalStorage - Persistence

### ✅ useRef (5/5 Complete)
1. ✅ Focus Management - DOM refs
2. ✅ Previous Value Tracker - Mutable values
3. ✅ Video Player - Media controls
4. ✅ Stopwatch - Interval IDs
5. ✅ Infinite Scroll - Intersection Observer

### 🔄 useMemo/useCallback (In Progress)
1. ✅ Expensive Computation - useMemo basics
2. ✅ Search & Filter - Memoized derivations
3. 📝 useCallback with memo() - Prevent child re-renders
4. 📝 Complex Dashboard - Multiple memoizations
5. 📝 Performance Profiler - Visual comparison

### 📝 useContext/useReducer (5 to create)
1. Theme Context - Dark/light mode
2. Auth Context - Login/logout state
3. Shopping Cart Reducer - Complex actions
4. Todo with Reducer - Action patterns
5. Global State - Context + Reducer combined

### 📝 Async Patterns (5 to create)
1. Suspense Boundaries - Error handling
2. Loading States - Skeletons
3. Parallel Requests - Promise.all
4. Optimistic Updates - UX patterns
5. React 19 use() hook - New patterns

### 📝 Multiple Components (5 to create)
1. Prop Drilling - Problem demonstration
2. Compound Components - Advanced pattern
3. Render Props - Flexible composition
4. Higher-Order Components - HOC pattern
5. Custom Hooks - Reusable logic

### 📝 Zustand (5 to create)
1. Basic Store - Setup & usage
2. Todo with Zustand - Actions & selectors
3. Middleware - DevTools & persist
4. Multiple Stores - Composition
5. Async Actions - Thunks

### 🆕 Data Fetching Patterns (3 NEW!)
1. Fetch API - Native browser fetch
2. Axios - Popular HTTP library
3. React Query - Server state management

---

## Implementation Priority

### Week 1 (Days 1-3): Core Hooks
- ✅ Complete useState (5)
- ✅ Complete useEffect (5)
- ✅ Complete useRef (5)

### Week 1 (Days 4-7): Performance
- 🔄 useMemo/useCallback (5)
- Start Data Fetching patterns

### Week 2: State Management
- useContext/useReducer (5)
- Zustand (5)

### Week 3: Advanced Patterns  
- Async Patterns (5)
- Multiple Components (5)
- Complete Data Fetching (3)

---

## Quick Implementation Guides

### useMemo Pattern:
```jsx
const expensiveValue = useMemo(() => {
  // Expensive calculation
  return computeExpensiveValue(dep1, dep2)
}, [dep1, dep2])
```

### useCallback Pattern:
```jsx
const memoizedCallback = useCallback((param) => {
  doSomething(param, dep1)
}, [dep1])
```

### useContext Pattern:
```jsx
const ThemeContext = createContext()

function Provider({ children }) {
  const [theme, setTheme] = useState('light')
  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

function Consumer() {
  const {theme} = useContext(ThemeContext)
}
```

### useReducer Pattern:
```jsx
const initialState = { count: 0 }

function reducer(state, action) {
  switch(action.type) {
    case 'increment':
      return {count: state.count + 1}
    case 'decrement':
      return {count: state.count - 1}
    default:
      return state
  }
}

const [state, dispatch] = useReducer(reducer, initialState)
dispatch({type: 'increment'})
```

### Zustand Pattern:
```jsx
import create from 'zustand'

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 }))
}))

function Component() {
  const { count, increment } = useStore()
}
```

### Fetch Pattern:
```jsx
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed')
      const data = await response.json()
      setData(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }
  fetchData()
}, [url])
```

### Axios Pattern:
```jsx
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(url)
      setData(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }
  fetchData()
}, [url])
```

### React Query Pattern:
```jsx
import { useQuery } from '@tanstack/react-query'

function Component() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(res => res.json())
  })
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  return <div>{data}</div>
}
```

---

## Current Status

**Completed:** 15/40 challenges (37.5%)  
**In Progress:** 2/40 (useMemo 01-02)
**Remaining:** 23/40 (57.5%)

Keep going! 🚀
