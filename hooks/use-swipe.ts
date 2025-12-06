"use client"

import { useState, useEffect, useRef } from "react"

export const useSwipeUp = () => {
  const [isVisible, setIsVisible] = useState(false)
  const touchStartY = useRef<number | null>(null)
  const touchEndY = useRef<number | null>(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndY.current = e.changedTouches[0].clientY
      
      if (touchStartY.current !== null && touchEndY.current !== null) {
        const deltaY = touchStartY.current - touchEndY.current
        
        // Swipe up detected (deltaY > 0 means upward movement)
        if (deltaY > 50) {
          setIsVisible(true)
        }
      }
      
      touchStartY.current = null
      touchEndY.current = null
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Show header when scrolling down past threshold
      if (currentScrollY > 150) {
        setIsVisible(true)
      }
      
      // Show header when scrolling up (but not at top)
      if (currentScrollY < lastScrollY.current && currentScrollY > 100) {
        setIsVisible(true)
      }
      
      // Hide header when at top
      if (currentScrollY < 50) {
        setIsVisible(false)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchend", handleTouchEnd, { passive: true })
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleTouchEnd)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return isVisible
}

