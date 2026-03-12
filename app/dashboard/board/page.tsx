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

  // Try app_metadata first (fastest), fall back to RPC function (bypasses RLS)
  let tenantId = (user.app_metadata?.tenant_id as string) ?? null
  if (!tenantId) {
    const { data: rpcTenantId } = await supabase.rpc('get_tenant_id_for_user', { p_user_id: user.id })
    tenantId = (rpcTenantId as string) ?? null
  }

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
