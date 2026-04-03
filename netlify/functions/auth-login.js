import bcrypt from 'bcryptjs'
import { getPool } from './utils/db.js'
import { signToken } from './utils/auth.js'

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }

  try {
    const { email, password } = JSON.parse(event.body)

    const pool = getPool()
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1', [email]
    )

    const user = result.rows[0]
    if (!user) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid email or password' })
      }
    }

    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid email or password' })
      }
    }

    const token = signToken({ userId: user.id, email: user.email })

    return {
      statusCode: 200,
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