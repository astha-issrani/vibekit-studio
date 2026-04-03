import { getPool } from './utils/db.js'
import { requireAuth } from './utils/auth.js'

export const handler = async (event) => {
  if (event.httpMethod !== 'GET') return { statusCode: 405 }

  try {
    const user = requireAuth(event)
    const { id } = event.queryStringParameters || {}
    const pool = getPool()

    const result = await pool.query(
      'SELECT * FROM pages WHERE id = $1 AND user_id = $2',
      [id, user.userId]
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