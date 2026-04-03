import { getPool } from './utils/db.js'
import { requireAuth } from './utils/auth.js'

export const handler = async (event) => {
  if (event.httpMethod !== 'GET') return { statusCode: 405 }

  try {
    const user = requireAuth(event)
    const pool = getPool()

    const result = await pool.query(
      `SELECT id, title, slug, status, theme, view_count, created_at, updated_at
       FROM pages WHERE user_id = $1
       ORDER BY updated_at DESC`,
      [user.userId]
    )

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pages: result.rows })
    }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}