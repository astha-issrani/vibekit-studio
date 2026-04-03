import { getPool } from './utils/db.js'
import { requireAuth } from './utils/auth.js'

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405 }

  try {
    const user = requireAuth(event)
    const { id } = JSON.parse(event.body)
    const pool = getPool()

    const original = await pool.query(
      'SELECT * FROM pages WHERE id=$1 AND user_id=$2',
      [id, user.userId]
    )

    if (!original.rows[0]) return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Page not found' })
    }

    const p = original.rows[0]
    const newSlug = `${p.slug}-copy-${Date.now()}`

    const result = await pool.query(
      `INSERT INTO pages (user_id, title, slug, theme, content)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, title, slug, status`,
      [user.userId, `${p.title} (Copy)`, newSlug, p.theme, p.content]
    )

    return {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: result.rows[0] })
    }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}