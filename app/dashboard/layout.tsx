import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Sidebar from '@/components/Sidebar'
import NeuralBackground from '@/components/NeuralBackground'
import GhostAssistant from '@/components/GhostAssistant'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  // Only redirect on definitive "no session" — not on transient network errors
  if (!user && !error) redirect('/auth/login')
  if (!user && error) redirect('/auth/login')

  return (
    <div className="flex h-screen overflow-hidden relative" style={{ background: '#07070f' }}>
      <NeuralBackground />
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative z-10">
        {children}
      </main>
      <GhostAssistant />
    </div>
  )
}
