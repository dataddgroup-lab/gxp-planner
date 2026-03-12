import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = await cookies()
  const all = cookieStore.getAll()

  return NextResponse.json({
    cookieCount: all.length,
    cookieNames: all.map(c => c.name),
    hasAuthToken: all.some(c => c.name.includes('auth-token') || c.name.includes('supabase')),
  })
}
