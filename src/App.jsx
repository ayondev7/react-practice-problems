import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import TopicViewer from './pages/TopicViewer'

export default function App(){
  return (
    <BrowserRouter>
      <nav style={{marginBottom:20}}>
        <Link to="/">Home</Link>
      </nav>
      <Routes>
  <Route path="/" element={<Home/>} />
  <Route path="/topic/:group/:file" element={<TopicViewer/>} />
      </Routes>
    </BrowserRouter>
  )
}
