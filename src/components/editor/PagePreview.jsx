import { themes } from '../../lib/themes'

export default function PagePreview({ page }) {
  const theme = themes[page.theme] || themes.minimal
  const { content } = page

  const style = {}
  Object.entries(theme.vars).forEach(([k, v]) => {
    style[k] = v
  })

  return (
    <div
      style={{
        ...style,
        backgroundColor: 'var(--bg)',
        color: 'var(--text)',
        fontFamily: 'var(--font-body)'
      }}
    >
      {/* Hero */}
      <section
        style={{
          backgroundColor: 'var(--bg)',
          padding: '5rem 2rem',
          textAlign: 'center'
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            marginBottom: '1rem'
          }}
        >
          {content.hero.title}
        </h1>

        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: '1.125rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}
        >
          {content.hero.subtitle}
        </p>

        {/* ✅ FIXED BUTTON LINK */}
        <a
          href={content.hero.buttonUrl}
          style={{
            display: 'inline-block',
            backgroundColor: 'var(--accent)',
            color: 'var(--accent-fg)',
            padding: '0.75rem 2rem',
            borderRadius: 'var(--radius)',
            fontWeight: 600,
            textDecoration: 'none',
            boxShadow: 'var(--shadow)'
          }}
        >
          {content.hero.buttonText}
        </a>
      </section>

      {/* Features */}
      <section
        style={{
          backgroundColor: 'var(--surface)',
          padding: '4rem 2rem'
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            textAlign: 'center',
            fontSize: '2rem',
            fontWeight: 700,
            marginBottom: '3rem'
          }}
        >
          Features
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}
        >
          {content.features.map((f, i) => (
            <div
              key={i}
              style={{
                backgroundColor: 'var(--bg)',
                padding: '1.5rem',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow)'
              }}
            >
              <h3
                style={{
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                  color: 'var(--accent)'
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.9rem'
                }}
              >
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section
        style={{
          backgroundColor: 'var(--bg)',
          padding: '4rem 2rem'
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            textAlign: 'center',
            fontSize: '2rem',
            fontWeight: 700,
            marginBottom: '3rem'
          }}
        >
          Gallery
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}
        >
          {content.gallery.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`Gallery ${i + 1}`}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: 'var(--radius)'
              }}
            />
          ))}
        </div>
      </section>

      {/* Contact */}
      <section
        style={{
          backgroundColor: 'var(--surface)',
          padding: '4rem 2rem'
        }}
      >
        <div
          style={{
            maxWidth: '500px',
            margin: '0 auto',
            textAlign: 'center'
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2rem',
              fontWeight: 700,
              marginBottom: '0.5rem'
            }}
          >
            {content.contact.heading}
          </h2>

          <p
            style={{
              color: 'var(--text-muted)',
              marginBottom: '2rem'
            }}
          >
            {content.contact.subheading}
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            {['Name', 'Email'].map((f) => (
              <input
                key={f}
                placeholder={f}
                disabled
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg)',
                  color: 'var(--text)'
                }}
              />
            ))}

            <textarea
              placeholder="Message"
              disabled
              rows={4}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg)',
                color: 'var(--text)',
                resize: 'none'
              }}
            />

            <button
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--accent-fg)',
                padding: '0.75rem',
                borderRadius: 'var(--radius)',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Send Message
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}