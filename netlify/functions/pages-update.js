import { getPool } from './utils/db.js'
import { requireAuth } from './utils/auth.js'

export const handler = async (event) => {
  if (event.httpMethod !== 'PUT') return { statusCode: 405 }

  try {
    const user = requireAuth(event)
    const { id, title, theme, content, slug } = JSON.parse(event.body)
    const pool = getPool()

    const result = await pool.query(
      `UPDATE pages SET title=$1, theme=$2, content=$3, slug=$4, updated_at=now()
       WHERE id=$5 AND user_id=$6
       RETURNING id, title, slug, status, theme, content, updated_at`,
      [title, theme, JSON.stringify(content), slug, id, user.userId]
    )

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: result.rows[0] })
    }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}