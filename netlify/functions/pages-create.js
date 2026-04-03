import { getPool } from './utils/db.js'
import { requireAuth } from './utils/auth.js'
import slugify from 'slugify'

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405 }

  try {
    const user = requireAuth(event)
    const { title, theme = 'minimal' } = JSON.parse(event.body)

    if (!title) return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Title required' })
    }

    const pool = getPool()

    // Generate unique slug
    let slug = slugify(title, { lower: true, strict: true })
    const existing = await pool.query('SELECT id FROM pages WHERE slug = $1', [slug])
    if (existing.rows.length > 0) slug = `${slug}-${Date.now()}`

    // Default content structure
    const content = {
      hero: {
        title: title,
        subtitle: 'Welcome to my page',
        buttonText: 'Get Started',
        buttonUrl: '#'
      },
      features: [
        { title: 'Feature One', description: 'Describe your first feature here.' },
        { title: 'Feature Two', description: 'Describe your second feature here.' },
        { title: 'Feature Three', description: 'Describe your third feature here.' }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
        'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800'
      ],
      contact: {
        heading: 'Get in Touch',
        subheading: 'We would love to hear from you'
      }
    }

    const result = await pool.query(
      `INSERT INTO pages (user_id, title, slug, theme, content)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, title, slug, status, theme, created_at`,
      [user.userId, title, slug, theme, JSON.stringify(content)]
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