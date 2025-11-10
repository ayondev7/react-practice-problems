# React 19 Practice Problems - Learning Path 🚀

## Overview
This practice repo contains **progressively challenging exercises** for mastering React hooks and patterns. Each challenge builds UI with Tailwind CSS, but leaves strategic blanks for you to implement React logic.

## 📚 Learning Structure

### 1. **useState** (5 challenges)
Progressive difficulty from basic counter to complex game state.

- ✅ **01**: Basic Counter - Simple increment/decrement
- 🎯 **02**: Todo List - Array state management, CRUD operations
- 🎯 **03**: Multi-Step Form - Object state, form validation, conditional rendering
- 🎯 **04**: Shopping Cart - Functional updates, derived state, quantity management
- 🎯 **05**: Tic-Tac-Toe - Complex 2D arrays, game logic, history/time-travel

**Key Concepts**: Immutability, functional updates, derived state, complex state shapes

---

### 2. **useEffect** (5 challenges)
Master side effects, data fetching, and cleanup patterns.

- 🎯 **01**: Real-time Clock - Intervals, cleanup, prevent memory leaks
- 🎯 **02**: Fetch User Data - API calls, loading/error states, dependencies
- 🎯 **03**: Search with Debouncing - Multiple useEffects, performance optimization
- 🎯 **04**: Window Resize Listener - Event listeners, throttling, cleanup
- 🎯 **05**: Chat with LocalStorage - Persistence, auto-scroll, sync state

**Key Concepts**: Cleanup functions, dependencies array, data fetching, performance optimization

---

### 3. **useRef** (5 challenges)
DOM manipulation and mutable values without re-renders.

- 🎯 **01**: Focus Management - DOM refs, programmatic focus
- 🎯 **02**: Previous Value Tracker - Store previous state without re-render
- 🎯 **03**: Video Player Controls - Media element control
- 🎯 **04**: Stopwatch with useRef - Accurate timing without re-render issues
- 🎯 **05**: Infinite Scroll - Intersection Observer API

**Key Concepts**: DOM access, mutable values, previous state, performance

---

### 4. **useMemo & useCallback** (5 challenges)
Performance optimization through memoization.

- 🎯 **01**: Expensive Computation - useMemo basics, prevent re-calculation
- 🎯 **02**: Search & Filter - useMemo for derived data
- 🎯 **03**: Memoized Child Components - useCallback with memo()
- 🎯 **04**: Complex Dashboard - Multiple memoizations
- 🎯 **05**: Performance Comparison - Visual demo of optimization

**Key Concepts**: Memoization, referential equality, React.memo, performance profiling

---

### 5. **useContext & useReducer** (5 challenges)
State management patterns for complex apps.

- 🎯 **01**: Theme Context - Basic context provider/consumer
- 🎯 **02**: Auth Context - User authentication state
- 🎯 **03**: Shopping Cart Reducer - Complex state logic with reducer
- 🎯 **04**: Todo App with Reducer - Action patterns, dispatch
- 🎯 **05**: Global App State - Combine context + reducer

**Key Concepts**: Context API, reducers, actions, global state management

---

### 6. **Async Patterns** (5 challenges)
Modern async patterns including React 19 features.

- 🎯 **01**: Suspense Boundaries - Error boundaries, fallbacks
- 🎯 **02**: Data Fetching Patterns - Loading states, skeleton screens
- 🎯 **03**: Parallel Requests - Promise.all, concurrent fetching
- 🎯 **04**: Optimistic Updates - UX patterns for mutations
- 🎯 **05**: React 19 `use()` Hook - New async patterns

**Key Concepts**: Suspense, error boundaries, async/await, optimistic UI

---

### 7. **Multiple Components** (5 challenges)
Component composition and prop patterns.

- 🎯 **01**: Prop Drilling Problem - Demonstrate the issue
- 🎯 **02**: Component Composition - Compound components pattern
- 🎯 **03**: Render Props - Advanced pattern
- 🎯 **04**: HOC Pattern - Higher-order components
- 🎯 **05**: Custom Hooks - Extract reusable logic

**Key Concepts**: Composition, patterns, reusability, abstraction

---

### 8. **State Management (Zustand)** (5 challenges)
Modern external state management library.

- 🎯 **01**: Basic Zustand Store - Setup and usage
- 🎯 **02**: Todo App with Zustand - Actions and selectors
- 🎯 **03**: Middleware & Persistence - DevTools, persist
- 🎯 **04**: Multiple Stores - Store composition
- 🎯 **05**: Async Actions - Thunks with Zustand

**Key Concepts**: External state, Zustand patterns, middleware, persistence

---

## 🎯 How to Use This Repo

1. **Start with 01 in each topic** - They're the easiest
2. **Read the challenge comments** - They explain what to implement
3. **Don't touch the UI/JSX** - It's already built with Tailwind
4. **Focus on the TODOs** - Implement hooks, functions, logic
5. **Test incrementally** - Run `npm run dev` and check your work
6. **Check answers** if stuck - Located in `src/answers/` folder

## 💡 Tips for Success

- **Don't skip challenges** - Each builds on previous concepts
- **Read React docs** when confused about a hook
- **Use console.log()** to debug your state/effects
- **Experiment freely** - Break things and fix them
- **Time yourself** - Track how long each challenge takes

## 📖 Resources

- [React Docs](https://react.dev/)
- [React 19 Beta Docs](https://react.dev/blog/2024/04/25/react-19)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Zustand Docs](https://docs.pmnd.rs/zustand/getting-started/introduction)

## 🏆 Progression Path

1. **Beginner** → Complete useState & useEffect (understand basics)
2. **Intermediate** → Complete useRef, useMemo/useCallback (performance)
3. **Advanced** → Complete Context/Reducer, Async patterns (architecture)
4. **Expert** → Multiple Components, Zustand (production patterns)

Good luck! 🚀 You'll be a React pro in no time!
