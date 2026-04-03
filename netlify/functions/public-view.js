import { getPool } from './utils/db.js'

export const handler = async (event) => {
  try {
    const slug = event.queryStringParameters?.slug
    const pool = getPool()

    await pool.query(
      'UPDATE pages SET view_count = view_count + 1 WHERE slug=$1',
      [slug]
    )

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'View tracked' })
    }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}