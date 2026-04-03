const BASE = '/api'

export async function signup(email, password) {
  const res = await fetch(`${BASE}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  })
  return res.json()
}

export async function login(email, password) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  })
  return res.json()
}

export async function logout() {
  const res = await fetch(`${BASE}/auth/logout`, {
    method: 'POST',
    credentials: 'include'
  })
  return res.json()
}
export async function getPages() {
  const res = await fetch('/api/pages', { credentials: 'include' })
  return res.json()
}

export async function createPage(title, theme) {
  const res = await fetch('/api/pages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ title, theme })
  })
  return res.json()
}

export async function getPage(id) {
  const res = await fetch(`/api/pages/${id}`, { credentials: 'include' })
  return res.json()
}

export async function updatePage(data) {
  const res = await fetch(`/api/pages/${data.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data)
  })
  return res.json()
}

export async function publishPage(id) {
  const res = await fetch(`/api/pages/${id}/publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ id })
  })
  return res.json()
}

export async function unpublishPage(id) {
  const res = await fetch(`/api/pages/${id}/unpublish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ id })
  })
  return res.json()
}

export async function duplicatePage(id) {
  const res = await fetch(`/api/pages/${id}/duplicate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ id })
  })
  return res.json()
}


export async function getPublicPage(slug) {
  const res = await fetch(`/api/public/pages/${slug}`)
  console.log('Fetching public page:', slug, res.status)
  return res.json()
}