import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import BoardClient from './BoardClient'

export default async function BoardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('tenant_id')
    .eq('id', user.id)
    .single()

  const tenantId = profile?.tenant_id ?? null

  const { data: items } = tenantId
    ? await supabase
        .from('board_items')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('position', { ascending: true })
    : { data: [] }

  return (
    <BoardClient
      initialItems={items ?? []}
      tenantId={tenantId}
      userId={user.id}
    />
  )
}
