import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getPublicPage } from '../lib/api'
import PagePreview from '../components/editor/PagePreview'

export default function PublishedPage() {
  const { slug } = useParams()
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function load() {
      const data = await getPublicPage(slug)
      if (data.error) return setNotFound(true)
      setPage(data.page)
      setLoading(false)
      // Track view
      fetch(`/api/public/pages/${slug}/view`, { method: 'POST' })
    }
    load()
  }, [slug])

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>
  if (notFound) return <div className="min-h-screen flex items-center justify-center text-gray-500">Page not found</div>

  return <PagePreview page={page} />
}