import Sidebar from '@/components/Sidebar'
import NeuralBackground from '@/components/NeuralBackground'
import GhostAssistant from '@/components/GhostAssistant'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
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
