import { NextResponse, type NextRequest } from 'next/server'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const PROJECT_REF = 'arulyuzeidtcnawgbfwm'
const COOKIE_NAME = `sb-${PROJECT_REF}-auth-token`

const COOKIE_OPTS = {
  path: '/',
  sameSite: 'lax' as const,
  httpOnly: true,
  secure: true,
  maxAge: 60 * 60 * 24 * 400,
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Direct REST call — no @supabase/ssr storage layer involved
    const authRes = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ email, password }),
    })

    const authData = await authRes.json()

    if (!authRes.ok || authData.error) {
      return NextResponse.json(
        { error: authData.error_description || 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Build session object in the exact shape @supabase/ssr expects
    const session = {
      access_token: authData.access_token,
      refresh_token: authData.refresh_token,
      expires_in: authData.expires_in,
      expires_at: authData.expires_at ?? Math.floor(Date.now() / 1000) + authData.expires_in,
      token_type: authData.token_type ?? 'bearer',
      user: authData.user,
    }

    // Encode as base64- prefix + base64url JSON (the @supabase/ssr wire format)
    const encoded = 'base64-' + Buffer.from(JSON.stringify(session)).toString('base64url')

    const response = NextResponse.json({ success: true })

    // Chunk if needed (>3500 chars) — same logic as @supabase/ssr createChunks
    if (encoded.length > 3500) {
      const chunks: string[] = []
      for (let i = 0; i < encoded.length; i += 3500) {
        chunks.push(encoded.slice(i, i + 3500))
      }
      chunks.forEach((chunk, i) => {
        response.cookies.set(`${COOKIE_NAME}.${i}`, chunk, COOKIE_OPTS)
      })
      response.cookies.set(COOKIE_NAME, '', { ...COOKIE_OPTS, maxAge: 0 })
    } else {
      response.cookies.set(COOKIE_NAME, encoded, COOKIE_OPTS)
    }

    return response
  } catch (err) {
    console.error('Login error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
