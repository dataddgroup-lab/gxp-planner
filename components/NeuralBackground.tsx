'use client'

import { useEffect, useRef } from 'react'

interface Node {
  x: number; y: number
  vx: number; vy: number
  radius: number; pulse: number; pulseSpeed: number
}

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let scanY = 0
    const nodes: Node[] = []
    const NODE_COUNT = 60
    const MAX_DIST = 160

    function resize() {
      canvas!.width  = window.innerWidth
      canvas!.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Init nodes
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
      })
    }

    function draw() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Move nodes
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        n.pulse += n.pulseSpeed
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.25
            const grad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y)
            grad.addColorStop(0, `rgba(139,92,246,${alpha})`)
            grad.addColorStop(0.5, `rgba(59,130,246,${alpha * 0.8})`)
            grad.addColorStop(1, `rgba(6,182,212,${alpha})`)
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = grad
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const glow = Math.sin(n.pulse) * 0.4 + 0.6
        const r = n.radius * (0.8 + Math.sin(n.pulse) * 0.3)

        // Outer glow
        const outerGlow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 6)
        outerGlow.addColorStop(0, `rgba(139,92,246,${glow * 0.15})`)
        outerGlow.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(n.x, n.y, r * 6, 0, Math.PI * 2)
        ctx.fillStyle = outerGlow
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(139,92,246,${glow * 0.9})`
        ctx.fill()
      }

      // Scanning line
      scanY = (scanY + 0.6) % canvas.height
      const scanGrad = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40)
      scanGrad.addColorStop(0, 'transparent')
      scanGrad.addColorStop(0.4, 'rgba(139,92,246,0.03)')
      scanGrad.addColorStop(0.5, 'rgba(139,92,246,0.08)')
      scanGrad.addColorStop(0.6, 'rgba(59,130,246,0.03)')
      scanGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = scanGrad
      ctx.fillRect(0, scanY - 40, canvas.width, 80)

      // Scan line itself
      ctx.beginPath()
      ctx.moveTo(0, scanY)
      ctx.lineTo(canvas.width, scanY)
      ctx.strokeStyle = 'rgba(139,92,246,0.15)'
      ctx.lineWidth = 1
      ctx.stroke()

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.85 }}
    />
  )
}
