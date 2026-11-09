import { useEffect, useState, type RefObject } from "react"

// True once the element has been on screen (35% visible), and stays true.
export function useSeen(ref: RefObject<HTMLElement | null>) {
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node || seen) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSeen(true)
      },
      { threshold: 0.35 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [ref, seen])
  return seen
}
