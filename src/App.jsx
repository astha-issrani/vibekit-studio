import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
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
        <Route path="/app" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/app/pages/:id" element={
          <ProtectedRoute><Editor /></ProtectedRoute>
        } />
        <Route path="/p/:slug" element={<PublishedPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App