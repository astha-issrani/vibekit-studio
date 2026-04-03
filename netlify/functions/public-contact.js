import { getPool } from './utils/db.js'

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405 }

  try {
    const { slug, name, email, message } = JSON.parse(event.body)
    const pool = getPool()

    const page = await pool.query(
      'SELECT id FROM pages WHERE slug=$1 AND status=$2',
      [slug, 'published']
    )

    if (!page.rows[0]) return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Page not found' })
    }

    await pool.query(
      'INSERT INTO contact_submissions (page_id, name, email, message) VALUES ($1,$2,$3,$4)',
      [page.rows[0].id, name, email, message]
    )

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Submitted successfully' })
    }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}