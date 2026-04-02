import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Editor from './pages/Editor'
import PublishedPage from './pages/PublishedPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/app" element={<Dashboard />} />
        <Route path="/app/pages/:id" element={<Editor />} />
        <Route path="/p/:slug" element={<PublishedPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App