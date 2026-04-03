import { getPool } from './utils/db.js'

export const handler = async (event) => {
  try {
    const pool = getPool()
    
    // Extract slug from path or query string
    const slug = event.queryStringParameters?.slug || 
                 event.path.split('/').filter(Boolean).pop()

    console.log('Looking for slug:', slug)

    if (!slug) return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Slug required' })
    }

    const result = await pool.query(
      `SELECT title, slug, theme, content FROM pages
       WHERE slug=$1 AND status='published'`,
      [slug]
    )

    console.log('Found rows:', result.rows.length)

    if (!result.rows[0]) return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Page not found' })
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: result.rows[0] })
    }
  } catch (err) {
    console.log('Error:', err.message)
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}