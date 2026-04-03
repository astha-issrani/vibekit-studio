import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPage, updatePage, publishPage, unpublishPage } from '../lib/api'
import { themes, applyTheme } from '../lib/themes'
import PagePreview from '../components/editor/PagePreview'

const VIEWPORTS = {
  desktop: 'w-full',
  tablet: 'w-[768px]',
  mobile: 'w-[375px]'
}

export default function Editor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [viewport, setViewport] = useState('desktop')
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    loadPage()
  }, [id])

  async function loadPage() {
    const data = await getPage(id)
    setPage(data.page)
    setLoading(false)
  }

  async function handleSave() {
    setSaving(true)
    await updatePage(page)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  async function handlePublish() {
    if (page.status === 'published') {
      await unpublishPage(page.id)
      setPage(p => ({ ...p, status: 'draft' }))
    } else {
      const data = await publishPage(page.id)
      setPage(p => ({ ...p, status: 'published' }))
    }
  }

  function updateContent(section, value) {
    setPage(p => ({ ...p, content: { ...p.content, [section]: value } }))
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-white animate-pulse">Loading editor...</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Top Bar */}
      <div className="border-b border-gray-800 px-4 py-3 flex items-center justify-between bg-gray-950 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/app')} className="text-gray-400 hover:text-white transition text-sm">
            ← Dashboard
          </button>
          <span className="text-gray-600">|</span>
          <input
            value={page.title}
            onChange={e => setPage(p => ({ ...p, title: e.target.value }))}
            className="bg-transparent text-white font-semibold focus:outline-none border-b border-transparent focus:border-purple-500"
          />
        </div>

        {/* Viewport Toggle */}
        <div className="hidden md:flex gap-1 bg-gray-800 rounded-lg p-1">
          {Object.keys(VIEWPORTS).map(v => (
            <button
              key={v}
              onClick={() => setViewport(v)}
              className={`px-3 py-1 rounded-md text-sm capitalize transition ${
                viewport === v ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-xs transition ${saved ? 'text-green-400' : 'text-transparent'}`}>
            ✓ Saved
          </span>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={handlePublish}
            className={`px-4 py-2 text-sm rounded-lg font-semibold transition ${
              page.status === 'published'
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {page.status === 'published' ? 'Unpublish' : 'Publish'}
          </button>
          {page.status === 'published' && (
            
              href={`/p/${page.slug}`}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition"
            >
              ↗ View
            </a>
          )}
        </div>
      </div>

      {/* Main Editor Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Controls */}
        <div className="w-80 border-r border-gray-800 overflow-y-auto bg-gray-900 flex-shrink-0">
          {/* Theme Picker */}
          <div className="p-4 border-b border-gray-800">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Vibe / Theme</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(themes).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => setPage(p => ({ ...p, theme: key }))}
                  className={`p-2 rounded-lg border text-left transition ${
                    page.theme === key
                      ? 'border-purple-500 bg-purple-900/30'
                      : 'border-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div
                    className="h-6 rounded mb-1"
                    style={{ backgroundColor: theme.preview.bg, border: `2px solid ${theme.preview.accent}` }}
                  />
                  <span className="text-xs text-gray-300">{theme.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section Tabs */}
          <div className="flex border-b border-gray-800">
            {['hero', 'features', 'gallery', 'contact'].map(s => (
              <button
                key={s}
                onClick={() => setActiveSection(s)}
                className={`flex-1 py-2 text-xs capitalize transition ${
                  activeSection === s
                    ? 'border-b-2 border-purple-500 text-purple-400'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Section Editor */}
          <div className="p-4">
            {activeSection === 'hero' && (
              <HeroEditor content={page.content.hero} onChange={v => updateContent('hero', v)} />
            )}
            {activeSection === 'features' && (
              <FeaturesEditor content={page.content.features} onChange={v => updateContent('features', v)} />
            )}
            {activeSection === 'gallery' && (
              <GalleryEditor content={page.content.gallery} onChange={v => updateContent('gallery', v)} />
            )}
            {activeSection === 'contact' && (
              <ContactEditor content={page.content.contact} onChange={v => updateContent('contact', v)} />
            )}
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="flex-1 overflow-auto bg-gray-800 flex justify-center p-4">
          <div className={`${VIEWPORTS[viewport]} transition-all duration-300 bg-white min-h-full`}>
            <PagePreview page={page} />
          </div>
        </div>
      </div>
    </div>
  )
}

// Section Editors
function HeroEditor({ content, onChange }) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500 uppercase tracking-wider">Hero Section</p>
      <Field label="Title" value={content.title} onChange={v => onChange({ ...content, title: v })} />
      <Field label="Subtitle" value={content.subtitle} onChange={v => onChange({ ...content, subtitle: v })} textarea />
      <Field label="Button Text" value={content.buttonText} onChange={v => onChange({ ...content, buttonText: v })} />
      <Field label="Button URL" value={content.buttonUrl} onChange={v => onChange({ ...content, buttonUrl: v })} />
    </div>
  )
}

function FeaturesEditor({ content, onChange }) {
  function updateFeature(i, field, val) {
    const updated = [...content]
    updated[i] = { ...updated[i], [field]: val }
    onChange(updated)
  }

  return (
    <div className="space-y-4">
      <p className="text-xs text-gray-500 uppercase tracking-wider">Features</p>
      {content.map((f, i) => (
        <div key={i} className="bg-gray-800 rounded-lg p-3 space-y-2">
          <p className="text-xs text-gray-400">Feature {i + 1}</p>
          <Field label="Title" value={f.title} onChange={v => updateFeature(i, 'title', v)} />
          <Field label="Description" value={f.description} onChange={v => updateFeature(i, 'description', v)} textarea />
        </div>
      ))}
    </div>
  )
}

function GalleryEditor({ content, onChange }) {
  function updateUrl(i, val) {
    const updated = [...content]
    updated[i] = val
    onChange(updated)
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500 uppercase tracking-wider">Gallery Images (URLs)</p>
      {content.map((url, i) => (
        <Field key={i} label={`Image ${i + 1}`} value={url} onChange={v => updateUrl(i, v)} />
      ))}
    </div>
  )
}

function ContactEditor({ content, onChange }) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500 uppercase tracking-wider">Contact Section</p>
      <Field label="Heading" value={content.heading} onChange={v => onChange({ ...content, heading: v })} />
      <Field label="Subheading" value={content.subheading} onChange={v => onChange({ ...content, subheading: v })} />
    </div>
  )
}

function Field({ label, value, onChange, textarea }) {
  return (
    <div>
      <label className="text-xs text-gray-400 block mb-1">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 bg-gray-800 text-white text-sm rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 resize-none"
        />
      ) : (
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 text-white text-sm rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500"
        />
      )}
    </div>
  )
}