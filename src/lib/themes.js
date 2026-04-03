export const themes = {
  minimal: {
    name: 'Minimal / Editorial',
    vars: {
      '--bg': '#ffffff',
      '--surface': '#f5f5f5',
      '--text': '#111111',
      '--text-muted': '#666666',
      '--accent': '#000000',
      '--accent-fg': '#ffffff',
      '--radius': '4px',
      '--font-heading': "'Inter', sans-serif",
      '--font-body': "'Inter', sans-serif",
      '--spacing': '1.5rem',
      '--border': '#e0e0e0',
      '--shadow': 'none',
    },
    button: 'border-2 border-black text-black hover:bg-black hover:text-white transition px-6 py-2',
    preview: { bg: '#ffffff', accent: '#000000', text: '#111111' }
  },

  neobrutalist: {
    name: 'Neo-Brutal',
    vars: {
      '--bg': '#f7f0e6',
      '--surface': '#ffffff',
      '--text': '#000000',
      '--text-muted': '#333333',
      '--accent': '#ff6b35',
      '--accent-fg': '#000000',
      '--radius': '0px',
      '--font-heading': "'Space Grotesk', sans-serif",
      '--font-body': "'Space Grotesk', sans-serif",
      '--spacing': '2rem',
      '--border': '#000000',
      '--shadow': '4px 4px 0px #000000',
    },
    button: 'bg-[#ff6b35] text-black border-2 border-black font-bold px-6 py-2 shadow-[4px_4px_0px_#000]',
    preview: { bg: '#f7f0e6', accent: '#ff6b35', text: '#000000' }
  },

  darkneon: {
    name: 'Dark / Neon',
    vars: {
      '--bg': '#0a0a0f',
      '--surface': '#13131a',
      '--text': '#e0e0ff',
      '--text-muted': '#8888aa',
      '--accent': '#7c3aed',
      '--accent-fg': '#ffffff',
      '--radius': '8px',
      '--font-heading': "'Rajdhani', sans-serif",
      '--font-body': "'Inter', sans-serif",
      '--spacing': '1.5rem',
      '--border': '#2a2a3a',
      '--shadow': '0 0 20px rgba(124,58,237,0.4)',
    },
    button: 'bg-purple-600 text-white px-6 py-2 rounded-lg shadow-[0_0_20px_rgba(124,58,237,0.6)] hover:shadow-[0_0_30px_rgba(124,58,237,0.9)] transition',
    preview: { bg: '#0a0a0f', accent: '#7c3aed', text: '#e0e0ff' }
  },

  pastel: {
    name: 'Pastel / Soft',
    vars: {
      '--bg': '#fdf6ff',
      '--surface': '#f3e8ff',
      '--text': '#3b1f4a',
      '--text-muted': '#7c5a8a',
      '--accent': '#c084fc',
      '--accent-fg': '#ffffff',
      '--radius': '16px',
      '--font-heading': "'Playfair Display', serif",
      '--font-body': "'Lato', sans-serif",
      '--spacing': '1.75rem',
      '--border': '#e9d5ff',
      '--shadow': '0 4px 20px rgba(192,132,252,0.15)',
    },
    button: 'bg-purple-300 text-purple-900 px-6 py-2 rounded-full hover:bg-purple-400 transition',
    preview: { bg: '#fdf6ff', accent: '#c084fc', text: '#3b1f4a' }
  },

  luxury: {
    name: 'Luxury / Serif',
    vars: {
      '--bg': '#0f0e0c',
      '--surface': '#1a1814',
      '--text': '#e8d5b0',
      '--text-muted': '#a89070',
      '--accent': '#c9a84c',
      '--accent-fg': '#0f0e0c',
      '--radius': '2px',
      '--font-heading': "'Cormorant Garamond', serif",
      '--font-body': "'EB Garamond', serif",
      '--spacing': '2rem',
      '--border': '#3a3020',
      '--shadow': '0 2px 8px rgba(201,168,76,0.2)',
    },
    button: 'border border-[#c9a84c] text-[#c9a84c] px-8 py-2 hover:bg-[#c9a84c] hover:text-black transition tracking-widest uppercase text-sm',
    preview: { bg: '#0f0e0c', accent: '#c9a84c', text: '#e8d5b0' }
  },

  retro: {
    name: 'Retro / Pixel',
    vars: {
      '--bg': '#1a1a2e',
      '--surface': '#16213e',
      '--text': '#00ff41',
      '--text-muted': '#00aa2b',
      '--accent': '#ff00ff',
      '--accent-fg': '#000000',
      '--radius': '0px',
      '--font-heading': "'Press Start 2P', monospace",
      '--font-body': "'VT323', monospace",
      '--spacing': '1.5rem',
      '--border': '#00ff41',
      '--shadow': '0 0 10px #00ff41',
    },
    button: 'bg-[#ff00ff] text-black px-6 py-2 font-bold hover:bg-[#00ff41] transition border-2 border-[#00ff41]',
    preview: { bg: '#1a1a2e', accent: '#ff00ff', text: '#00ff41' }
  }
}

export const themeKeys = Object.keys(themes)

export function applyTheme(themeKey, element = document.documentElement) {
  const theme = themes[themeKey]
  if (!theme) return
  Object.entries(theme.vars).forEach(([key, value]) => {
    element.style.setProperty(key, value)
  })
}