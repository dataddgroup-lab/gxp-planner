import { createClient } from '@/lib/supabase/server'
import BoardClient from './BoardClient'

// Layout already handles auth — this page just fetches data
export default async function BoardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    // Layout will redirect; render empty shell to avoid error
    return <BoardClient initialItems={[]} tenantId={null} userId="" />
  }

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
