import { Link } from 'react-router-dom'

const themes = [
  {
    name: 'Neo-Brutal',
    bg: '#f7f0e6',
    accent: '#ff6b35',
    text: '#000000',
    desc: 'Bold borders, raw energy'
  },
  {
    name: 'Dark / Neon',
    bg: '#0a0a0f',
    accent: '#7c3aed',
    text: '#e0e0ff',
    desc: 'Glowing accents, night vibes'
  },
  {
    name: 'Luxury / Serif',
    bg: '#0f0e0c',
    accent: '#c9a84c',
    text: '#e8d5b0',
    desc: 'Gold on black, timeless'
  }
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <span className="text-xl font-bold text-purple-400">VibeKit Studio</span>
        <div className="flex gap-3">
          <Link to="/login" className="text-gray-400 hover:text-white text-sm transition px-4 py-2">
            Log in
          </Link>
          <Link to="/signup" className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-lg transition">
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center px-6 py-24 max-w-4xl mx-auto">
        <div className="inline-block bg-purple-900/30 text-purple-300 text-xs px-3 py-1 rounded-full mb-6 border border-purple-700">
          Generate a theme · Build a mini-site · Publish it
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Your vibe,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            your site.
          </span>
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto">
          Pick a design theme, build your mini-site in minutes, and publish it to a beautiful public URL.
        </p>
        <Link
          to="/signup"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold px-8 py-4 rounded-xl transition hover:scale-105 active:scale-95"
        >
          Create your first page →
        </Link>
      </section>

      {/* Theme Showcase */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-center text-3xl font-bold mb-3">Pick your vibe</h2>
        <p className="text-center text-gray-400 mb-12">6 stunning themes to match your aesthetic</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {themes.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl overflow-hidden border border-gray-800 hover:border-purple-500 transition group cursor-pointer"
            >
              {/* Theme Preview */}
              <div
                className="h-48 p-6 flex flex-col justify-between"
                style={{ backgroundColor: t.bg }}
              >
                <div
                  className="text-lg font-bold"
                  style={{ color: t.text, fontFamily: 'serif' }}
                >
                  Hello, World
                </div>
                <div>
                  <div
                    className="h-2 w-16 rounded mb-2"
                    style={{ backgroundColor: t.accent }}
                  />
                  <div
                    className="h-2 w-24 rounded opacity-50"
                    style={{ backgroundColor: t.text }}
                  />
                  <div className="mt-3 inline-block text-xs px-3 py-1 rounded"
                    style={{ backgroundColor: t.accent, color: t.bg }}
                  >
                    Button
                  </div>
                </div>
              </div>
              {/* Label */}
              <div className="bg-gray-900 px-4 py-3">
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-gray-500 text-xs">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-16 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Choose a vibe', desc: 'Pick from 6 stunning design presets' },
              { step: '02', title: 'Build your page', desc: 'Fill in your content with live preview' },
              { step: '03', title: 'Publish & share', desc: 'Get a public URL instantly' }
            ].map(item => (
              <div key={item.step} className="text-center">
                <div className="text-4xl font-bold text-purple-500/30 mb-3">{item.step}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to build?</h2>
        <p className="text-gray-400 mb-8">No design skills needed. Just your ideas.</p>
        <Link
          to="/signup"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition"
        >
          Create your first page — it's free
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-6 text-center text-gray-600 text-sm">
        VibeKit Studio · Built with 💜
      </footer>
    </div>
  )
}