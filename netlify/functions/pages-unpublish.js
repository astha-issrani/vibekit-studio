import { getPool } from './utils/db.js'
import { requireAuth } from './utils/auth.js'

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405 }

  try {
    const user = requireAuth(event)
    const { id } = JSON.parse(event.body)
    const pool = getPool()

    await pool.query(
      `UPDATE pages SET status='draft', updated_at=now()
       WHERE id=$1 AND user_id=$2`,
      [id, user.userId]
    )

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Unpublished' })
    }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}