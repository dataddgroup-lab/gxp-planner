import { NextResponse } from 'next/server'

export async function GET() {
  const response = NextResponse.json({ message: 'cookie set, now check /api/debug-profile' })
  response.cookies.set('test-cookie', 'it-works', {
    path: '/',
    sameSite: 'lax',
    httpOnly: false, // readable by JS too
    maxAge: 3600,
  })
  return response
}
