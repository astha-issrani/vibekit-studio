import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getPages, createPage, duplicatePage } from '../lib/api'
import { themes } from '../lib/themes'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newTheme, setNewTheme] = useState('minimal')

  useEffect(() => {
    loadPages()
  }, [])

  async function loadPages() {
    const data = await getPages()
    setPages(data.pages || [])
    setLoading(false)
  }

  async function handleCreate() {
    if (!newTitle.trim()) return
    setCreating(true)
    const data = await createPage(newTitle, newTheme)
    setCreating(false)
    setShowModal(false)
    if (data.page) navigate(`/app/pages/${data.page.id}`)
  }

  async function handleDuplicate(id) {
    const data = await duplicatePage(id)
    if (data.page) loadPages()
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-bold text-purple-400">VibeKit Studio</span>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">{user?.email}</span>
          <button onClick={logout} className="text-sm text-gray-400 hover:text-white transition">
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Your Pages</h1>
            <p className="text-gray-400 mt-1">Create, edit and publish your mini-sites</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg font-semibold transition"
          >
            + New Page
          </button>
        </div>

        {/* Pages Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1,2,3].map(i => (
              <div key={i} className="h-40 bg-gray-800 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : pages.length === 0 ? (
          <div className="text-center py-24 text-gray-500">
            <p className="text-5xl mb-4">✦</p>
            <p className="text-lg">No pages yet. Create your first one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pages.map(page => (
              <div key={page.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-purple-500 transition group">
                {/* Theme color bar */}
                <div
                  className="h-2 rounded-full mb-4"
                  style={{ backgroundColor: themes[page.theme]?.preview.accent || '#7c3aed' }}
                />
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg">{page.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    page.status === 'published'
                      ? 'bg-green-900 text-green-300'
                      : 'bg-gray-700 text-gray-300'
                  }`}>
                    {page.status}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-1">/{page.slug}</p>
                <p className="text-gray-600 text-xs mb-4">
                  {themes[page.theme]?.name} · {page.view_count} views
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/app/pages/${page.id}`)}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-sm py-2 rounded-lg transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDuplicate(page.id)}
                    className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-lg transition"
                  >
                    Clone
                  </button>
                  {page.status === 'published' && (
                    
                      href={`/p/${page.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-lg transition"
                    >
                      ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Page Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-700">
            <h2 className="text-xl font-bold mb-4">Create New Page</h2>
            <input
              type="text"
              placeholder="Page title"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-purple-500 mb-4"
              autoFocus
            />
            <p className="text-sm text-gray-400 mb-2">Choose a vibe:</p>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {Object.entries(themes).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => setNewTheme(key)}
                  className={`p-3 rounded-lg border text-left transition ${
                    newTheme === key
                      ? 'border-purple-500 bg-purple-900/30'
                      : 'border-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: theme.preview.accent }}
                    />
                    <span className="text-xs font-medium">{theme.name}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 border border-gray-700 rounded-lg text-gray-400 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={creating || !newTitle.trim()}
                className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
              >
                {creating ? 'Creating...' : 'Create Page'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}