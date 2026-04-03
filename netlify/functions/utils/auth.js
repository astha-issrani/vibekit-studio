import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.JWT_SECRET;



export function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' })
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET)
}

export function getTokenFromHeader(event) {
  const cookies = cookie.parse(event.headers.cookie || '')
  return cookies.token || null
}

export function requireAuth(event) {
  const token = getTokenFromHeader(event)
  if (!token) throw new Error('Unauthorized')
  return verifyToken(token)
}