'use client'

import dynamic from 'next/dynamic'
import Sidebar from '@/components/Sidebar'

const NeuralBackground = dynamic(() => import('@/components/NeuralBackground'), { ssr: false })
const GhostAssistant = dynamic(() => import('@/components/GhostAssistant'), { ssr: false })

export default function DashboardShell({ children }: { children: React.ReactNode }) {
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
