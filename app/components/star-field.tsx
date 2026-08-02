'use client'

import React, { useEffect, useRef } from 'react'

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    // Generate central particle dust cluster + background ambient stars
    const particleCount = 120
    const particles: {
      x: number
      y: number
      size: number
      alpha: number
      speed: number
      baseAlpha: number
    }[] = []

    const centerX = width * 0.5
    const centerY = height * 0.45

    for (let i = 0; i < particleCount; i++) {
      // 60% of particles clustered around center star glint
      const isCentral = i < 75
      const angle = Math.random() * Math.PI * 2
      const radius = isCentral
        ? Math.random() * 260
        : Math.random() * Math.max(width, height) * 0.5

      const x = (isCentral ? centerX : width * 0.5) + Math.cos(angle) * radius
      const y = (isCentral ? centerY : height * 0.5) + Math.sin(angle) * radius

      const baseAlpha = isCentral
        ? Math.random() * 0.6 + 0.2
        : Math.random() * 0.3 + 0.05

      particles.push({
        x,
        y,
        size: Math.random() * 1.5 + 0.5,
        alpha: baseAlpha,
        baseAlpha,
        speed: Math.random() * 0.02 + 0.005,
      })
    }

    let time = 0

    const render = () => {
      time += 0.015
      ctx.clearRect(0, 0, width, height)

      // Draw faint central radial glow
      const grad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.45,
        0,
        width * 0.5,
        height * 0.45,
        280
      )
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.06)')
      grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.015)')
      grad.addColorStop(1, 'transparent')

      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(width * 0.5, height * 0.45, 280, 0, Math.PI * 2)
      ctx.fill()

      // Render individual particle stars
      particles.forEach((p, idx) => {
        const pulse = Math.sin(time * p.speed * 10 + idx) * 0.25
        const currentAlpha = Math.max(0.02, Math.min(1, p.baseAlpha + pulse))

        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw central bright star glint (matching ✦ glint in reference image)
      const starX = width * 0.5
      const starY = height * 0.45
      const starGlow = Math.sin(time * 2) * 0.15 + 0.85

      // Core bright center dot
      ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * starGlow})`
      ctx.beginPath()
      ctx.arc(starX, starY, 2.5, 0, Math.PI * 2)
      ctx.fill()

      // Horizontal lens flare glint
      const flareGradH = ctx.createLinearGradient(starX - 35, starY, starX + 35, starY)
      flareGradH.addColorStop(0, 'rgba(255, 255, 255, 0)')
      flareGradH.addColorStop(0.5, `rgba(255, 255, 255, ${0.75 * starGlow})`)
      flareGradH.addColorStop(1, 'rgba(255, 255, 255, 0)')
      ctx.fillStyle = flareGradH
      ctx.fillRect(starX - 35, starY - 0.75, 70, 1.5)

      // Vertical lens flare glint
      const flareGradV = ctx.createLinearGradient(starX, starY - 35, starX, starY + 35)
      flareGradV.addColorStop(0, 'rgba(255, 255, 255, 0)')
      flareGradV.addColorStop(0.5, `rgba(255, 255, 255, ${0.75 * starGlow})`)
      flareGradV.addColorStop(1, 'rgba(255, 255, 255, 0)')
      ctx.fillStyle = flareGradV
      ctx.fillRect(starX - 0.75, starY - 35, 1.5, 70)

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 opacity-80"
    />
  )
}
