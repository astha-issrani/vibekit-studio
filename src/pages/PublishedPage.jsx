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
      try {
        const data = await getPublicPage(slug)
        if (data.error || !data.page) {
          setNotFound(true)
          setLoading(false)
          return
        }
        setPage(data.page)
        setLoading(false)
        fetch(`/api/public/pages/${slug}/view`, { method: 'POST' })
      } catch (err) {
        setNotFound(true)
        setLoading(false)
      }
    }
    load()
  }, [slug])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-gray-500">Loading...</div>
    </div>
  )
  
  if (notFound) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-4xl mb-4">404</p>
        <p className="text-gray-500">Page not found or not published yet</p>
      </div>
    </div>
  )

  return <PagePreview page={page} />
}