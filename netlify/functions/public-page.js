import { getPool } from './utils/db.js'

export const handler = async (event) => {
  try {
    const slug = event.queryStringParameters?.slug
    const pool = getPool()

    const result = await pool.query(
      `SELECT title, slug, theme, content FROM pages
       WHERE slug=$1 AND status='published'`,
      [slug]
    )

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
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}