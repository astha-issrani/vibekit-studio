import bcrypt from 'bcryptjs'
import { getPool } from './utils/db.js'
import { signToken } from './utils/auth.js'

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }

  try {
    const { email, password } = JSON.parse(event.body)

    if (!email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email and password required' })
      }
    }

    const pool = getPool()

    // Check if user exists
    const existing = await pool.query(
      'SELECT id FROM users WHERE email = $1', [email]
    )
    if (existing.rows.length > 0) {
      return {
        statusCode: 409,
        body: JSON.stringify({ error: 'Email already in use' })
      }
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10)

    // Create user
    const result = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
      [email, password_hash]
    )

    const user = result.rows[0]
    const token = signToken({ userId: user.id, email: user.email })

    return {
      statusCode: 201,
      headers: {
        'Set-Cookie': `token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: { id: user.id, email: user.email } })
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    }
  }
}