'use client'

import React, { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  size: number
  alpha: number
  baseAlpha: number
  pulseSpeed: number
  phase: number
  parallaxFactor: number
}

interface DustParticle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
}

interface GeometryElement {
  xRatio: number
  yRatio: number
  size: number
  angle: number
  rotSpeed: number
  type: 'square' | 'diamond' | 'cube' | 'circle' | 'guideLine'
  opacity: number
  parallaxFactor: number
}

interface CrossNode {
  xRatio: number
  yRatio: number
  label?: string
  pulsePhase: number
  parallaxFactor: number
}

export function BackgroundEngine() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    let docHeight = Math.max(document.documentElement.scrollHeight, height * 3)
    let currentScrollY = window.scrollY

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      docHeight = Math.max(document.documentElement.scrollHeight, height * 3)
    }

    const handleScroll = () => {
      currentScrollY = window.scrollY
    }

    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Seeded random helper for procedural non-repeating generation
    let seed = 42
    const pseudoRandom = () => {
      const x = Math.sin(seed++) * 10000
      return x - Math.floor(x)
    }

    // 1. Optimized Deep Space Stars (120 max for 60 FPS)
    const numStars = Math.min(120, Math.floor((width * height) / 9000))
    const stars: Star[] = []
    for (let i = 0; i < numStars; i++) {
      const baseAlpha = 0.15 + pseudoRandom() * 0.55
      stars.push({
        x: pseudoRandom() * width,
        y: pseudoRandom() * docHeight,
        size: pseudoRandom() * 1.4 + 0.5,
        alpha: baseAlpha,
        baseAlpha,
        pulseSpeed: 0.005 + pseudoRandom() * 0.015,
        phase: pseudoRandom() * Math.PI * 2,
        parallaxFactor: 0.02 + pseudoRandom() * 0.03,
      })
    }

    // 2. Distant Space Dust Particles (30 count)
    const dustCount = 30
    const dustParticles: DustParticle[] = []
    for (let i = 0; i < dustCount; i++) {
      dustParticles.push({
        x: pseudoRandom() * width,
        y: pseudoRandom() * docHeight,
        vx: (pseudoRandom() - 0.5) * 0.12,
        vy: -0.04 - pseudoRandom() * 0.08,
        size: pseudoRandom() * 1.5 + 0.5,
        alpha: 0.04 + pseudoRandom() * 0.07,
      })
    }

    // 3. Procedural Engineering Geometry Elements (14 count)
    const geometryTypes: Array<GeometryElement['type']> = ['square', 'diamond', 'cube', 'circle', 'guideLine']
    const geometries: GeometryElement[] = []
    const numGeom = 14

    for (let i = 0; i < numGeom; i++) {
      geometries.push({
        xRatio: 0.06 + pseudoRandom() * 0.88,
        yRatio: 0.04 + (i / numGeom) * 0.9 + (pseudoRandom() - 0.5) * 0.05,
        size: 40 + pseudoRandom() * 160,
        angle: pseudoRandom() * Math.PI * 2,
        rotSpeed: (pseudoRandom() - 0.5) * 0.0003,
        type: geometryTypes[Math.floor(pseudoRandom() * geometryTypes.length)],
        opacity: 0.018 + pseudoRandom() * 0.035,
        parallaxFactor: 0.04 + pseudoRandom() * 0.06,
      })
    }

    // 4. Blueprint Cross Nodes ('+') & Technical Annotations
    const crossNodes: CrossNode[] = [
      { xRatio: 0.05, yRatio: 0.08, label: 'SYS_NODE_01 // 19.0760° N', pulsePhase: 0, parallaxFactor: 0.04 },
      { xRatio: 0.94, yRatio: 0.16, label: '72.8777° E // VECTOR_A', pulsePhase: 1.2, parallaxFactor: 0.04 },
      { xRatio: 0.08, yRatio: 0.32, label: 'GRID_AXIS_0.024', pulsePhase: 2.4, parallaxFactor: 0.05 },
      { xRatio: 0.92, yRatio: 0.48, label: 'PROC_GEOM // STACK_V2', pulsePhase: 3.6, parallaxFactor: 0.05 },
      { xRatio: 0.06, yRatio: 0.68, label: 'CONST_NODE_09', pulsePhase: 4.8, parallaxFactor: 0.05 },
      { xRatio: 0.94, yRatio: 0.85, label: 'TERMINAL_EDGE_END', pulsePhase: 6.0, parallaxFactor: 0.04 },
    ]

    let time = 0

    // Render loop optimized for 60 FPS
    const render = () => {
      time += 0.01
      ctx.clearRect(0, 0, width, height)

      const isLight = document.documentElement.classList.contains('light')
      const mainRgb = isLight ? '0, 0, 0' : '255, 255, 255'

      // --- LAYER 0: Space Vignette & Radial Light ---
      const ambientGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.4,
        0,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.85
      )
      if (isLight) {
        ambientGrad.addColorStop(0, 'rgba(0, 0, 0, 0.015)')
        ambientGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.005)')
        ambientGrad.addColorStop(1, 'rgba(250, 250, 250, 0.9)')
      } else {
        ambientGrad.addColorStop(0, 'rgba(255, 255, 255, 0.018)')
        ambientGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.005)')
        ambientGrad.addColorStop(1, 'rgba(0, 0, 0, 0.85)')
      }
      ctx.fillStyle = ambientGrad
      ctx.fillRect(0, 0, width, height)

      // --- LAYER 1: Constellation Connections ---
      ctx.strokeStyle = `rgba(${mainRgb}, ${isLight ? 0.03 : 0.025})`
      ctx.lineWidth = 0.5
      for (let i = 0; i < stars.length; i += 8) {
        const s1 = stars[i]
        const s2 = stars[(i + 4) % stars.length]
        const y1 = s1.y - currentScrollY * s1.parallaxFactor
        const y2 = s2.y - currentScrollY * s2.parallaxFactor

        if (y1 >= -50 && y1 <= height + 50 && y2 >= -50 && y2 <= height + 50) {
          const dx = s1.x - s2.x
          const dy = y1 - y2
          if (dx * dx + dy * dy < 25000) { // Fast squared distance check
            ctx.beginPath()
            ctx.moveTo(s1.x, y1)
            ctx.lineTo(s2.x, y2)
            ctx.stroke()
          }
        }
      }

      // --- LAYER 2: Deep Space Stars ---
      stars.forEach((star) => {
        star.phase += star.pulseSpeed
        const alpha = star.baseAlpha + Math.sin(star.phase) * 0.15
        const drawY = star.y - currentScrollY * star.parallaxFactor

        if (drawY >= -10 && drawY <= height + 10) {
          ctx.fillStyle = `rgba(${mainRgb}, ${Math.max(0.04, alpha * (isLight ? 0.7 : 1))})`
          ctx.beginPath()
          ctx.arc(star.x, drawY, star.size, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // --- LAYER 3: Distant Space Dust ---
      dustParticles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.y < 0) p.y = docHeight
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0

        const drawY = p.y - currentScrollY * 0.03
        if (drawY >= -10 && drawY <= height + 10) {
          ctx.fillStyle = `rgba(${mainRgb}, ${p.alpha * (isLight ? 0.8 : 1)})`
          ctx.beginPath()
          ctx.arc(p.x, drawY, p.size, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // --- LAYER 4: Procedural Engineering Geometry ---
      geometries.forEach((geom) => {
        geom.angle += geom.rotSpeed
        const posX = geom.xRatio * width
        const posY = geom.yRatio * docHeight - currentScrollY * geom.parallaxFactor

        if (posY >= -geom.size * 2 && posY <= height + geom.size * 2) {
          ctx.save()
          ctx.translate(posX, posY)
          ctx.rotate(geom.angle)

          ctx.strokeStyle = `rgba(${mainRgb}, ${geom.opacity * (isLight ? 1.2 : 1)})`
          ctx.lineWidth = 1

          if (geom.type === 'square') {
            ctx.strokeRect(-geom.size * 0.5, -geom.size * 0.5, geom.size, geom.size)
          } else if (geom.type === 'diamond') {
            ctx.beginPath()
            ctx.moveTo(0, -geom.size * 0.6)
            ctx.lineTo(geom.size * 0.6, 0)
            ctx.lineTo(0, geom.size * 0.6)
            ctx.lineTo(-geom.size * 0.6, 0)
            ctx.closePath()
            ctx.stroke()
          } else if (geom.type === 'cube') {
            const s = geom.size * 0.4
            ctx.beginPath()
            ctx.rect(-s, -s, s, s)
            ctx.rect(-s * 0.4, -s * 0.4, s, s)
            ctx.moveTo(-s, -s)
            ctx.lineTo(-s * 0.4, -s * 0.4)
            ctx.moveTo(0, -s)
            ctx.lineTo(s * 0.6, -s * 0.4)
            ctx.moveTo(-s, 0)
            ctx.lineTo(-s * 0.4, s * 0.6)
            ctx.moveTo(0, 0)
            ctx.lineTo(s * 0.6, s * 0.6)
            ctx.stroke()
          } else if (geom.type === 'circle') {
            ctx.beginPath()
            ctx.arc(0, 0, geom.size * 0.45, 0, Math.PI * 2)
            ctx.stroke()
          } else if (geom.type === 'guideLine') {
            ctx.beginPath()
            ctx.moveTo(-geom.size, 0)
            ctx.lineTo(geom.size, 0)
            ctx.stroke()
          }

          ctx.restore()
        }
      })

      // --- LAYER 5: Blueprint '+' Cross Nodes ---
      crossNodes.forEach((node) => {
        const posX = node.xRatio * width
        const posY = node.yRatio * docHeight - currentScrollY * node.parallaxFactor

        if (posY >= -50 && posY <= height + 50) {
          const pulse = Math.sin(time * 2 + node.pulsePhase) * 0.15 + 0.35
          ctx.strokeStyle = `rgba(${mainRgb}, ${pulse * (isLight ? 0.6 : 1)})`
          ctx.lineWidth = 1

          const arm = 5
          ctx.beginPath()
          ctx.moveTo(posX - arm, posY)
          ctx.lineTo(posX + arm, posY)
          ctx.moveTo(posX, posY - arm)
          ctx.lineTo(posX, posY + arm)
          ctx.stroke()

          if (node.label) {
            ctx.fillStyle = `rgba(${mainRgb}, ${pulse * 0.6})`
            ctx.font = '9px "JetBrains Mono", monospace'
            ctx.fillText(node.label, posX + 10, posY + 3)
          }
        }
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-80"
    />
  )
}
