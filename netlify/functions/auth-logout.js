export const handler = async () => {
  return {
    statusCode: 200,
    headers: {
      'Set-Cookie': 'token=; HttpOnly; Path=/; Max-Age=0',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: 'Logged out' })
  }
}