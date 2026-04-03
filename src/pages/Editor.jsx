import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPage, updatePage, publishPage, unpublishPage } from '../lib/api'
import { themes } from '../lib/themes'
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
    try {
      const data = await getPage(id)
      setPage(data.page)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    if (!page) return

    setSaving(true)
    await updatePage(page)
    setSaving(false)

    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  async function handlePublish() {
    if (!page) return

    if (page.status === 'published') {
      await unpublishPage(page.id)
      setPage(p => ({ ...p, status: 'draft' }))
    } else {
      await publishPage(page.id)
      setPage(p => ({ ...p, status: 'published' }))
    }
  }

  function updateContent(section, value) {
    setPage(p => ({
      ...p,
      content: {
        ...p.content,
        [section]: value
      }
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white animate-pulse">Loading editor...</div>
      </div>
    )
  }

  if (!page) return null

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">

      {/* TOP BAR */}
      <div className="border-b border-gray-800 px-4 py-3 flex justify-between bg-gray-950">

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/app')}
            className="text-gray-400 hover:text-white text-sm"
          >
            ← Dashboard
          </button>

          <span className="text-gray-600">|</span>

          <input
            value={page.title || ''}
            onChange={e =>
              setPage(p => ({ ...p, title: e.target.value }))
            }
            className="bg-transparent text-white font-semibold border-b border-transparent focus:border-purple-500 focus:outline-none"
          />
        </div>

        {/* VIEWPORT */}
        <div className="hidden md:flex gap-1 bg-gray-800 rounded-lg p-1">
          {Object.keys(VIEWPORTS).map(v => (
            <button
              key={v}
              onClick={() => setViewport(v)}
              className={`px-3 py-1 rounded-md text-sm capitalize ${
                viewport === v
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400'
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2">
          <span className={`${saved ? 'text-green-400' : 'text-transparent'} text-xs`}>
            ✓ Saved
          </span>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>

          <button
            onClick={handlePublish}
            className={`px-4 py-2 text-sm rounded-lg font-semibold ${
              page.status === 'published'
                ? 'bg-red-600'
                : 'bg-green-600'
            } text-white`}
          >
            {page.status === 'published'
              ? 'Unpublish'
              : 'Publish'}
          </button>

          {/* ✅ FIXED LINK ERROR */}
          {page.status === 'published' && (
            <a
              href={`/p/${page.slug}`}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg"
            >
              ↗ View
            </a>
          )}
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT PANEL */}
        <div className="w-80 border-r border-gray-800 overflow-y-auto bg-gray-900">

          {/* THEME PICKER */}
          <div className="p-4 border-b border-gray-800">
            <p className="text-xs text-gray-500 mb-3 uppercase">
              Vibe / Theme
            </p>

            <div className="grid grid-cols-2 gap-2">
              {Object.entries(themes).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() =>
                    setPage(p => ({ ...p, theme: key }))
                  }
                  className={`p-2 rounded-lg border ${
                    page.theme === key
                      ? 'border-purple-500 bg-purple-900/30'
                      : 'border-gray-700'
                  }`}
                >
                  <div
                    className="h-6 rounded mb-1"
                    style={{
                      backgroundColor: theme.preview.bg,
                      border: `2px solid ${theme.preview.accent}`
                    }}
                  />
                  <span className="text-xs text-gray-300">
                    {theme.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* SECTION TABS */}
          <div className="flex border-b border-gray-800">
            {['hero','features','gallery','contact'].map(s => (
              <button
                key={s}
                onClick={() => setActiveSection(s)}
                className={`flex-1 py-2 text-xs capitalize ${
                  activeSection === s
                    ? 'border-b-2 border-purple-500 text-purple-400'
                    : 'text-gray-500'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* SECTION EDITORS */}
          <div className="p-4">
            {activeSection === 'hero' &&
              <HeroEditor
                content={page.content?.hero || {}}
                onChange={v => updateContent('hero', v)}
              />}

            {activeSection === 'features' &&
              <FeaturesEditor
                content={page.content?.features || []}
                onChange={v => updateContent('features', v)}
              />}

            {activeSection === 'gallery' &&
              <GalleryEditor
                content={page.content?.gallery || []}
                onChange={v => updateContent('gallery', v)}
              />}

            {activeSection === 'contact' &&
              <ContactEditor
                content={page.content?.contact || {}}
                onChange={v => updateContent('contact', v)}
              />}
          </div>
        </div>

        {/* RIGHT PREVIEW */}
        <div className="flex-1 bg-gray-800 flex justify-center p-4 overflow-auto">
          <div className={`${VIEWPORTS[viewport]} bg-white min-h-full`}>
            <PagePreview page={page} />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ================= EDITORS ================= */

function HeroEditor({ content, onChange }) {
  return (
    <div className="space-y-3">
      <Field label="Title" value={content.title || ''} onChange={v => onChange({ ...content, title:v })}/>
      <Field label="Subtitle" value={content.subtitle || ''} textarea onChange={v => onChange({ ...content, subtitle:v })}/>
      <Field label="Button Text" value={content.buttonText || ''} onChange={v => onChange({ ...content, buttonText:v })}/>
      <Field label="Button URL" value={content.buttonUrl || ''} onChange={v => onChange({ ...content, buttonUrl:v })}/>
    </div>
  )
}

function FeaturesEditor({ content, onChange }) {
  function updateFeature(i, field, val) {
    const updated = [...content]
    updated[i] = { ...updated[i], [field]: val }
    onChange(updated)
  }

  return content.map((f,i)=>(
    <div key={i} className="bg-gray-800 p-3 rounded-lg space-y-2">
      <Field label="Title" value={f.title||''} onChange={v=>updateFeature(i,'title',v)}/>
      <Field label="Description" value={f.description||''} textarea onChange={v=>updateFeature(i,'description',v)}/>
    </div>
  ))
}

function GalleryEditor({ content, onChange }) {
  function updateUrl(i,val){
    const updated=[...content]
    updated[i]=val
    onChange(updated)
  }

  return content.map((url,i)=>(
    <Field key={i} label={`Image ${i+1}`} value={url||''} onChange={v=>updateUrl(i,v)}/>
  ))
}

function ContactEditor({ content, onChange }) {
  return (
    <>
      <Field label="Heading" value={content.heading||''} onChange={v=>onChange({...content,heading:v})}/>
      <Field label="Subheading" value={content.subheading||''} onChange={v=>onChange({...content,subheading:v})}/>
    </>
  )
}

function Field({ label, value, onChange, textarea }) {
  return (
    <div>
      <label className="text-xs text-gray-400">{label}</label>

      {textarea ? (
        <textarea
          value={value}
          onChange={e=>onChange(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700"
        />
      ) : (
        <input
          value={value}
          onChange={e=>onChange(e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700"
        />
      )}
    </div>
  )
}