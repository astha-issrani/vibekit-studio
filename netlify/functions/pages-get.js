import { getPool } from './utils/db.js'
import { requireAuth } from './utils/auth.js'

export const handler = async (event) => {
  try {
    const user = requireAuth(event)
    const pool = getPool()
    const id = event.queryStringParameters?.id || 
                event.path.split('/').pop()

    // GET
    if (event.httpMethod === 'GET') {
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
    }

    // PUT
    if (event.httpMethod === 'PUT') {
      const { title, theme, content, slug } = JSON.parse(event.body)
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
    }

    return { statusCode: 405, body: 'Method not allowed' }

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    }
  }
}