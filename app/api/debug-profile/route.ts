import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ step: 'no_user', error: userError?.message })

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: policies } = await supabase
    .rpc('get_profile_policies')
    .maybeSingle()

  return NextResponse.json({
    user_id: user.id,
    app_metadata: user.app_metadata,
    profile,
    profile_error: profileError?.message ?? null,
  })
}
