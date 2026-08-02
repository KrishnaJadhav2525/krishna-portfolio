'use client'

import { useEffect, useState } from 'react'

const SCRAMBLE_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

interface ScrambleTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
}

export function ScrambleText({
  text,
  className = '',
  delay = 0,
  duration = 1200
}: ScrambleTextProps) {
  const [displayedText, setDisplayedText] = useState(text)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    let intervalId: NodeJS.Timeout

    timeoutId = setTimeout(() => {
      const startTime = Date.now()
      const length = text.length

      intervalId = setInterval(() => {
        const elapsedTime = Date.now() - startTime
        const progress = Math.min(elapsedTime / duration, 1)

        // Number of resolved characters from the left
        const resolvedLength = Math.floor(progress * length)

        let current = ''
        for (let i = 0; i < length; i++) {
          if (text[i] === ' ') {
            current += ' '
          } else if (i < resolvedLength) {
            current += text[i]
          } else {
            const randomIndex = Math.floor(Math.random() * SCRAMBLE_CHARS.length)
            current += SCRAMBLE_CHARS[randomIndex]
          }
        }

        setDisplayedText(current)

        if (progress >= 1) {
          clearInterval(intervalId)
          setDisplayedText(text)
        }
      }, 35)
    }, delay * 1000)

    return () => {
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [text, delay, duration])

  return <span className={className}>{displayedText}</span>
}
